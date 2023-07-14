import React, { useEffect, useState } from "react";
import ReportMenu from "./ReportMenu";
import ReportFilterMenu from "./ReportFilterMenu";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";
import { connect, useDispatch, useSelector } from "react-redux";
import { getPCData, getUnionData } from "../../redux/actions/union.action";
import {
  getPCReportData,
  getUnionReportData,
} from "../../redux/actions/report.action";

const Report = ({ role, prCooperativeID, unionID }) => {
  const [activeTab, setActiveTab] = useState("union");

  const currentDate = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(currentDate);
  const dispatch = useDispatch();
  // const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUnionData());
      dispatch(getPCData());
      dispatch(getUnionReportData());

      dispatch(getPCReportData());
    };
    fetchData();
  }, [role, dispatch]);
  const unionData = useSelector((state) => state.unions);
  const { unions, pc } = unionData;
  // console.log(unions)
  const reportData = useSelector((state) => state.report);
  const { unionReport, pcReport, loading } = reportData;

  return (
    <div className="p-1">
      <ReportMenu
        activeTab={activeTab}
        union={unions}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        role={role}
        extendedPrCData={pcReport}
        extendedUnionData={unionReport}
        prCooperativeID={prCooperativeID}
        prCooperative={pc}
        setActiveTab={setActiveTab}
      />
      <ReportFilterMenu
        activeTab={activeTab}
        role={role}
        fromDate={fromDate}
        toDate={toDate}
        extendedPrCData={pcReport}
        extendedUnionData={unionReport}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        union={unions}
        prCooperative={pc}
        setActiveTab={setActiveTab}
        loading={loading}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  unionID: selectUnionID,
  prCooperativeID: selectPrCooperativeID,
  role: selectRole,
});

export default connect(mapStateToProps)(Report);
