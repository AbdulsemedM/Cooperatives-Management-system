import React, { useEffect, useState } from "react";
import JobMenu from "./JobMenu";
import JobFilterMenu from "./JobFilterMenu";
import { API } from "../../utils/API";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const Job = ({ role, prCooperativeID, unionID }) => {
  const [union, setUnion] = useState([]);
  // const [activeTab, setActiveTab] = useState(
  //   role === 
  //   role === "primaryCooperativeUser" ||
  //     role === "primaryCooperativeReportViewer"
  //     ? "totalCapital"
  //     : "paidUpShare"
  // );
  const [prCooperative, setPrCooperative] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      role === "bankUser" &&
        (await API.get("/union/getUnions").then((res) => setUnion(res.data)));
      role === "bankUser" &&
        (await API.get("/prCooperatives/getPrCooperatives").then((res) =>
          setPrCooperative(res.data)
        ));
    };
    fetchData();
  }, [role]);

  return (
    <div className="border p-5 rounded shadow">
      <JobMenu
        // activeTab={activeTab}
        union={union}
        role={role}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        prCooperative={prCooperative}
        // setActiveTab={setActiveTab}
      />
      <JobFilterMenu
        // activeTab={activeTab}
        role={role}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        union={union}
        prCooperative={prCooperative}
        // setActiveTab={setActiveTab}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  unionID: selectUnionID,
  prCooperativeID: selectPrCooperativeID,
  role: selectRole,
});

export default connect(mapStateToProps)(Job);
