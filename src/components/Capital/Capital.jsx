import React, { useEffect, useState } from "react";
import CapitalMenu from "./CapitalMenu";
import CapitalFilterMenu from "./CapitalFilterMenu";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";
import { connect, useDispatch, useSelector } from "react-redux";
import { setUpdatedState } from "../../redux/state-control/stateAction";
import { selectUpdatedState } from "../../redux/state-control/stateSelector";
import { selectAccountData } from "../../redux/cache/cacheSelector";
import { setAccount } from "../../redux/cache/cacheAction";
import {
  getFederationData,
  getPCData,
  getUnionData,
} from "../../redux/actions/union.action";
import { getAccountData } from "../../redux/actions/capital.action";

const Capital = ({
  role,
  prCooperativeID,
  unionID,
  isPrCoop,
  setUpdatedState,
  updatedState,
  accountData,
  setAccountData,
}) => {
  // const [union, setUnion] = useState([]);
  const [scope, setScope] = useState({
    option:
      role === "bankUser" || role === "bankReportViewer"
        ? "all"
        : role === "unionUser" || role === "unionReportViewer"
        ? "union"
        : (role === "primaryCooperativeUser" ||
            role === "primaryCooperativeReportViewer") &&
          "prCooperative",
    searchInput: "",
  });
  const [activeTab, setActiveTab] = useState("accounts");
  // const [prCooperative, setPrCooperative] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      role === "bankUser" && dispatch(getUnionData());
      role === "bankUser" && dispatch(getFederationData());
      role === "bankUser" && dispatch(getAccountData());
      role === "bankUser"
        ? dispatch(getPCData())
        : role === "unionUser" && dispatch(getPCData(unionID));
    };
    fetchData();
  }, [role, unionID, dispatch]);

  const unionData = useSelector((state) => state.unions);
  const { unions, pc, federation } = unionData;
  const capitalData = useSelector((state) => state.capital);
  const { account } = capitalData;

  return (
    <div className="border p-5 rounded shadow">
      <CapitalMenu
        isPrCoop={isPrCoop}
        activeTab={activeTab}
        union={unions}
        federation={federation}
        role={role}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        prCooperative={pc}
        setActiveTab={setActiveTab}
        scope={scope}
        setScope={setScope}
        account={account}
      />
      <CapitalFilterMenu
        isPrCoop={isPrCoop}
        activeTab={activeTab}
        role={role}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        union={unions}
        prCooperative={pc}
        setActiveTab={setActiveTab}
        scope={scope}
        setScope={setScope}
        accoutData={accountData}
        setAccount={setAccountData}
        federation={federation}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  unionID: selectUnionID,
  prCooperativeID: selectPrCooperativeID,
  role: selectRole,
  updatedState: selectUpdatedState,
  accountData: selectAccountData,
});

const mapDispatchToProps = (dispatch) => ({
  setUpdatedState: (item) => dispatch(setUpdatedState(item)),
  setAccountData: (item) => dispatch(setAccount(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Capital);
