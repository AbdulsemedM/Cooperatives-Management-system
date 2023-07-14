import React, { useState } from "react";
import CreateAssetModal from "../../containers/CeateAssetModal";
import CreateCommodityModal from "../../containers/CreateCommodityModal";
import CreateLiabilityModal from "../../containers/CreateLiabilityModal";
import CreateTotalCapitalModal from "../../containers/CreateTotalCapitalModal";
import LiabilityExcelModalCaller from "../../Excel Reports/Imports/Liability/LiabilityExcelModalCaller";
import TotlaCapitalExcelModalCaller from "../../Excel Reports/Imports/Total capital/TotalCapitalExcelModalCaller";
import AssetExcelModalCaller from "../../Excel Reports/Imports/Asset/AssetExcelModalCaller";
import CommodityExcelModalCaller from "../../Excel Reports/Imports/Commodities/CommodityExcelModalCaller";
// import { downloadExcel } from "../../containers/DownloadExcel";
// import { sampleData } from "./sampleData";

const BalanceSheetMenu = ({
  activeTab,
  union,
  prCooperative,
  role,
  unionID,
  filterBy,
  setFilterBy,
  prCooperativeID,
  federation,
}) => {
  // function handleExport(data1) {
  //   downloadExcel(data1);
  // }

  // useEffect(() => {
  //   activeTab === "totalCapital" &&
  //     setFilterBy({
  //       option: "prCooperative",
  //     });
  // }, [activeTab, setFilterBy]);

  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterBy({
      ...filterBy, //spread operator
      [name]: value,
    });
  };

  return (
    <div className="pr-3">
      <div className="ui secondary  menu flex items-center">
        <div className="flex">
          <span className="item text-2xl font-bold text-gray-700">
            Balance Sheet
          </span>
          {role?.includes("bank") && (
            <span className="py-2">
              <select
                className="ui dropdown"
                name="option"
                value={filterBy?.option}
                onChange={handleChange}
                placeholder="Filter by"
                required
                // disabled={activeTab === "totalCapital"}
              >
                <option value="all">All</option>
                {activeTab !== "totalCapital" && (
                  <option value="federation">Federation</option>
                )}
                <option value="union">Union</option>
                <option value="prCooperative">Primary Cooperative</option>
              </select>
            </span>
          )}
        </div>
        <div className="right menu flex flex-col md:flex-row items-center">
          <div className="hidden md:flex">
            {activeTab === "liability" && role === "bankUser" && (
              <div>
                <LiabilityExcelModalCaller prCooperative={union} />
              </div>
            )}
            {activeTab === "asset" && role === "bankUser" && (
              <div>
                <AssetExcelModalCaller prCooperative={union} />
              </div>
            )}
            {activeTab === "totalCapital" && role === "bankUser" && (
              <div>
                <TotlaCapitalExcelModalCaller prCooperative={union} />
              </div>
            )}
            {activeTab === "commodity" && role === "bankUser" && (
              <div>
                <CommodityExcelModalCaller prCooperative={prCooperative} />
              </div>
            )}
            <div className="item">
              <div className="ui icon input">
                <input
                  type="text"
                  name="searchInput"
                  value={filterBy?.searchInput}
                  onChange={handleChange}
                  placeholder="Search ..."
                />
                <i className="search link icon"></i>
              </div>
            </div>
          </div>
          {role.includes("User") && (
            <div className="flex item-center">
              {activeTab === "asset" && (
                <div>
                  <button
                    className="ui teal button whitespace-nowrap"
                    onClick={() => handleAssign()}
                    style={{ backgroundColor: "#06B6D4" }}
                  >
                    <i className="plus icon"></i>
                    <span className="hidden md:inline-block">New Asset</span>
                  </button>
                </div>
              )}
              {activeTab === "liability" && (
                <div>
                  <button
                    className="ui teal button whitespace-nowrap"
                    onClick={() => handleAssign()}
                    style={{ backgroundColor: "#06B6D4" }}
                  >
                    <i className="plus icon"></i>
                    <span className="hidden md:inline-block">
                      New Liability
                    </span>
                  </button>
                </div>
              )}{" "}
              {activeTab === "commodity" && (
                <div>
                  <button
                    className="ui teal button whitespace-nowrap"
                    onClick={() => handleAssign()}
                    style={{ backgroundColor: "#06B6D4" }}
                  >
                    <i className="plus icon"></i>
                    <span className="hidden md:inline-block">
                      New Commodity
                    </span>
                  </button>
                </div>
              )}
              {activeTab === "totalCapital" && (
                <div>
                  <button
                    className="ui teal button whitespace-nowrap"
                    onClick={() => handleAssign()}
                    style={{ backgroundColor: "#06B6D4" }}
                  >
                    <i className="plus icon"></i>
                    <span className="hidden md:inline-block">New Capital</span>
                  </button>
                </div>
              )}
            </div>
          )}
          {/* {role.includes("Report") && (
            <div>
              <button
                className="ui basic button whitespace-nowrap"
                // onClick={() => handleExport(sampleData)}
              >
                <i className="download icon"></i>
                <span className="hidden md:inline-block">Excel Export</span>
              </button>
            </div>
          )} */}
        </div>
      </div>
      {activeTab === "asset" && (
        <CreateAssetModal
          title="New Asset"
          edit={false}
          union={union}
          role={role}
          prCooperativeID={prCooperativeID}
          unionID={unionID}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
          federation={federation}
        />
      )}
      {activeTab === "liability" && (
        <CreateLiabilityModal
          title="New Liability"
          edit={false}
          union={union}
          role={role}
          prCooperativeID={prCooperativeID}
          unionID={unionID}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
          federation={federation}
        />
      )}
      {activeTab === "commodity" && (
        <CreateCommodityModal
          title="New Commodity"
          edit={false}
          union={union}
          role={role}
          prCooperativeID={prCooperativeID}
          unionID={unionID}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
          federation={federation}
        />
      )}
      {activeTab === "totalCapital" && (
        <CreateTotalCapitalModal
          title="New Total Capital"
          edit={false}
          union={union}
          role={role}
          prCooperativeID={prCooperativeID}
          unionID={unionID}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
          federation={federation}
        />
      )}
    </div>
  );
};

export default BalanceSheetMenu;
