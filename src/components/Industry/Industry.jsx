import React, { useState } from "react";
import IndustryMenu from "./IndustryMenu";
import IndustryFilterMenu from "./IndustyFilterMenu";
import { createStructuredSelector } from "reselect";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { connect } from "react-redux";
import { setUpdatedState } from "../../redux/state-control/stateAction";
import { selectUpdatedState } from "../../redux/state-control/stateSelector";

const Industry = ({
  role,
  unionID,
  prCooperativeID,
  updatedState,
  setUpdatedState,
}) => {
  const [activeTab, setActiveTab] = useState("sector");
  const [search, setSearch] = useState("");

  return (
    <div className="border p-5 rounded shadow">
      <IndustryMenu
        activeTab={activeTab}
        role={role}
        setSearch={setSearch}
        search={search}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        setActiveTab={setActiveTab}
      />
      <IndustryFilterMenu
        activeTab={activeTab}
        role={role}
        search={search}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        setActiveTab={setActiveTab}
        setUpdatedState={setUpdatedState}
        updatedState={updatedState}
      />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  role: selectRole,
  unionID: selectUnionID,
  prCooperativeID: selectPrCooperativeID,
  updatedState: selectUpdatedState,
});

const mapDispatchToProps = (dispatch) => ({
  setUpdatedState: (item) => dispatch(setUpdatedState(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Industry);
