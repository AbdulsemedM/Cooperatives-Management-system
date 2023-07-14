import React, { useEffect, useState } from "react";
import MemberFilterMenu from "./MemberFilterMenu";
import MemberMenu from "./MemberMenu";
import { connect } from "react-redux";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";
import { selectUpdatedState } from "../../redux/state-control/stateSelector";
import { setUpdatedState } from "../../redux/state-control/stateAction";

const Member = ({
  role,
  unionID,
  prCooperativeID,
  status,
  updatedState,
  setUpdatedState,
}) => {
  const [activeTab, setActiveTab] = useState(
    status ? "allcooperative" : "cooperative"
  );

  const [filterData, setFilterData] = useState({
    filterByPc: "",
  });
  const [filteredMemberData, setFilteredMemberData] = useState();

  useEffect(() => {
    status ? setActiveTab("allcooperative") : setActiveTab("cooperative");
  }, [status]);

  return (
    <div className="border p-5 rounded shadow">
      <MemberMenu
        activeTab={activeTab}
        role={role}
        status={status}
        setFilterData={setFilterData}
        filterData={filterData}
        unionID={unionID}
        prCooperativeID={prCooperativeID}
        filteredMemberData={filteredMemberData}
        setActiveTab={setActiveTab}
      />
      <MemberFilterMenu
        filterData={filterData}
        setFilteredMemberData={setFilteredMemberData}
        filteredMemberData={filteredMemberData}
        status={status}
        activeTab={activeTab}
        role={role}
        setUpdatedState={setUpdatedState}
        updatedState={updatedState}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
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

export default connect(mapStateToProps, mapDispatchToProps)(Member);
