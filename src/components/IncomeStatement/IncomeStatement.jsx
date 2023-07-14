import React, { useEffect, useState } from "react";
import IncomeStatementMenu from "./IncomeStatementMenu";
import IncomeStatementFilterMenu from "./IncomeStatementFilterMenu";
import { API } from "../../utils/API";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const IncomeStatement = ({ role, prCooperativeID, unionID }) => {
  const [union, setUnion] = useState([]);
  const [scope, setScope] = useState({
    option: "all",
  });
  const [activeTab, setActiveTab] = useState("revenue");
  const [prCooperative, setPrCooperative] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      role === "bankReportViewer" &&
        (await API.get("/union/getUnions").then((res) => setUnion(res.data)));
      role === "bankReportViewer" &&
        (await API.get("/prCooperatives/getPrCooperatives").then((res) =>
          setPrCooperative(res.data)
        ));
    };
    fetchData();
  }, [role]);

  return (
    <div className="border p-5 rounded shadow">
      <IncomeStatementMenu
        activeTab={activeTab}
        union={union}
        role={role}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        prCooperative={prCooperative}
        setActiveTab={setActiveTab}
        scope={scope}
        setScope={setScope}
      />
      <IncomeStatementFilterMenu
        activeTab={activeTab}
        role={role}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        union={union}
        prCooperative={prCooperative}
        setActiveTab={setActiveTab}
        scope={scope}
        setScope={setScope}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  unionID: selectUnionID,
  prCooperativeID: selectPrCooperativeID,
  role: selectRole,
});

export default connect(mapStateToProps)(IncomeStatement);
