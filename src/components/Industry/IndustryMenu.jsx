import React, { useState } from "react";
import CreateSectorModal from "../../containers/CreateSectorModal";
import CreateTypeModal from "../../containers/CreateTypeModal";
import TypeExcelModalCaller from "../../Excel Reports/Imports/Type/TypeExcelModalCaller";
import SectorExcelModalCaller from "../../Excel Reports/Imports/sector/SectorExcelModalCaller";
// import { downloadExcel } from "../../containers/DownloadExcel";
// import { sampleData } from "./sampleData";

const IndustryMenu = ({ activeTab, role, setSearch, search }) => {
  // function handleExport(data1) {
  //   downloadExcel(data1);
  // }
  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };

  return (
    <div className="pr-3">
      <div className="ui secondary  menu flex items-center">
        <div>
          <span className="item text-2xl font-bold text-gray-700">
            Business
          </span>
        </div>
        <div className="right menu flex flex-col md:flex-row items-center">
          <div className="hidden md:flex">
            <div className="item">
              <div className="ui icon input">
                <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search ..."
                />
                <i className="search link icon"></i>
              </div>
            </div>
          </div>
          {(role === "bankUser" || role === "bankAdmin") && (
            <div className="flex item-center">
              {activeTab === "sector" ? (
                <div>
                  <button
                    className="ui teal button whitespace-nowrap"
                    onClick={() => handleAssign()}
                    style={{ backgroundColor: "#06B6D4" }}
                  >
                    <i className="plus icon"></i>
                    <span className="hidden md:inline-block">New Sector</span>
                  </button>
                </div>
              ) : activeTab === "type" ? (
                <div>
                  <button
                    className="ui teal button whitespace-nowrap"
                    onClick={() => handleAssign()}
                    style={{ backgroundColor: "#06B6D4" }}
                  >
                    <i className="plus icon"></i>
                    <span className="hidden md:inline-block">New Type</span>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
          {role.includes("bankUser") && activeTab === "type" && (
            <div>
              <TypeExcelModalCaller />
            </div>
          )}
          {role.includes("bankUser") && activeTab === "sector" && (
            <div>
              <SectorExcelModalCaller />
            </div>
          )}
          {role.includes("Report") && (
            <div>
              <button
                className="ui basic button whitespace-nowrap"
                // onClick={() => handleExport(sampleData)}
              >
                <i className="download icon"></i>
                <span className="hidden md:inline-block">Excel Export</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {activeTab === "sector" ? (
        <CreateSectorModal
          title="Create Sector"
          edit={false}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      ) : (
        <CreateTypeModal
          title="Create Type"
          edit={false}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      )}
    </div>
  );
};

export default IndustryMenu;
