import React, { useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
import AccountFilterMenu from "./AccountFilterMenu";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { getPCData, getUnionData } from "../../redux/actions/union.action";

const Account = ({ isPrCoop, role, prCooperativeID, unionID }) => {
  const [activeTab, setActiveTab] = useState("accounts");
  // const [activeTab2, setActiveTab2] = useState("union");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUnionData());
      dispatch(getPCData());
    };
    fetchData();
  }, [dispatch]);
  const unionData = useSelector((state) => state.unions);
  const { unions, pc } = unionData;

  return (
    <div className="border p-5 rounded shadow">
      <AccountMenu
        activeTab={activeTab}
        isPrCoop={isPrCoop}
        union={unions}
        role={role}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        prCooperative={pc}
        setActiveTab={setActiveTab}
      />
      <AccountFilterMenu
        isPrCoop={isPrCoop}
        activeTab={activeTab}
        union={unions}
        role={role}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        prCooperative={pc}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  unionID: selectUnionID,
  prCooperativeID: selectPrCooperativeID,
  role: selectRole,
});

export default connect(mapStateToProps)(Account);
