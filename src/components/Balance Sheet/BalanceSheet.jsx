import React, { useEffect, useState } from "react";
import BalanceSheetMenu from "./BalanceSheetMenu";
import BalanceSheetFilterMenu from "./BalanceSheetFilterMenu";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { selectUpdatedState } from "../../redux/state-control/stateSelector";
import { setUpdatedState } from "../../redux/state-control/stateAction";
import {
  getFederationData,
  getPCData,
  getUnionData,
} from "../../redux/actions/union.action";

const BalanceSheet = ({
  role,
  unionID,
  prCooperativeID,
  updatedState,
  setUpdatedState,
}) => {
  const [activeTab, setActiveTab] = useState("asset");
  const [filterBy, setFilterBy] = useState({
    option: "all",
    searchInput: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      role === "bankUser" && dispatch(getUnionData());
      role === "bankUser" && dispatch(getFederationData());
      role === "bankUser"
        ? dispatch(getPCData())
        : role === "unionUser" && dispatch(getPCData(unionID));
    };
    fetchData();
  }, [unionID, role, dispatch]);
  const unionData = useSelector((state) => state.unions);
  const { unions, pc, federation } = unionData;
  // console.log(federation);

  return (
    <div className="border p-5 rounded shadow">
      <BalanceSheetMenu
        activeTab={activeTab}
        union={unions}
        role={role}
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        prCooperative={pc}
        federation={federation}
        setActiveTab={setActiveTab}
      />
      <BalanceSheetFilterMenu
        activeTab={activeTab}
        union={unions}
        role={role}
        updatedState={updatedState}
        setUpdatedState={setUpdatedState}
        filterBy={filterBy}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        prCooperative={pc}
        federation={federation}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  unionID: selectUnionID,
  prCooperativeID: selectPrCooperativeID,
  role: selectRole,
  updatedState: selectUpdatedState,
});

const mapDispatchToProps = (dispatch) => ({
  setUpdatedState: (item) => dispatch(setUpdatedState(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BalanceSheet);
