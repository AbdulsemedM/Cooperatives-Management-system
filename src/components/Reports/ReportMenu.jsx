import React from "react";
import ExcelExport from "../../Excel Reports/ExcelExport";
import { Form } from "semantic-ui-react";
import PerformanceExcel from "../../Excel Reports/PerformanceExcel";
// import { downloadExcel } from "../../containers/DownloadExcel";
// import { sampleData } from "./sampleData";

const CapitalMenu = ({
  activeTab,
  extendedUnionData,
  extendedPrCData,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  // role,
}) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const handleFromDateChange = (e, { value }) => {
    setFromDate(value);
  };

  const handleToDateChange = (e, { value }) => {
    setToDate(value);
  };

  return (
    <div className="pr-3">
      <div className="ui secondary  menu flex items-center">
        <div>
          <span className="item text-2xl font-bold text-gray-700">
            TOTAL REPORT
          </span>
        </div>
        <div className="right menu flex flex-col md:flex-row items-center">
          {(activeTab === "union" || activeTab === "prCooperative") && (
            <div className="mx-3">
              <Form.Input
                label="From Date"
                type="date"
                max={toDate}
                value={fromDate}
                onChange={handleFromDateChange}
              />
            </div>
          )}
          <div className="mr-5">
            <Form.Input
              label={` ${
                activeTab === "union" || activeTab === "prCooperative"
                  ? "To"
                  : "At"
              } Date `}
              type="date"
              min={fromDate}
              max={currentDate}
              value={toDate}
              onChange={handleToDateChange}
            />
          </div>
          <div>
            {(activeTab === "union" || activeTab === "prCooperative") && (
              <ExcelExport
                extendedPrCData={extendedPrCData}
                extendedUnionData={extendedUnionData}
                fromDate={fromDate}
                activeTab={activeTab}
                toDate={toDate}
                atDate={currentDate}
              />
            )}
            {activeTab === "performanceatCBO" && (
              <PerformanceExcel toDate={toDate} data={extendedPrCData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapitalMenu;
