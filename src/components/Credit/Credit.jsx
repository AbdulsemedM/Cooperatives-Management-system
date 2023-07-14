import React, { useState } from "react";
import CreditMenu from "./CreditMenu";
import CreditFilterMenu from "./CreditFilterMenu";
import { createStructuredSelector } from "reselect";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { connect } from "react-redux";

const Credit = ({ role, unionID, prCooperativeID }) => {
  const [activeTab, setActiveTab] = useState("credit");

  return (
    <div className="border p-5 rounded shadow">
      <CreditMenu
        activeTab={activeTab}
        role={role}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        setActiveTab={setActiveTab}
      />
      <CreditFilterMenu
        activeTab={activeTab}
        role={role}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  role: selectRole,
  unionID: selectUnionID,
  prCooperativeID: selectPrCooperativeID,
});

export default connect(mapStateToProps)(Credit);
