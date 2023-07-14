import React, { useEffect } from "react";
import { useState } from "react";

const EstablishmentMenu = ({
  prCoopEst,
  activeTab,
  unionsEst,
  role,
  search,
  setSearch,
}) => {
  // eslint-disable-next-line
  const [data, setData] = useState([]);

  useEffect(() => {
    activeTab === "union"
      ? setData(unionsEst)
      : activeTab === "prCoop" && setData(prCoopEst);
  }, [activeTab, prCoopEst, unionsEst]);

  // const handleExport = (exportData) => {
  //   downloadExcel(exportData);
  // };
  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <div className="pr-3">
      <div className="ui secondary  menu flex items-center">
        <div>
          <span className="item text-2xl font-bold text-gray-700">
            Establishment
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
                  onChange={handleChange}
                  placeholder="Search ..."
                />
                <i className="search icon"></i>
              </div>
            </div>
          </div>
          <div>
            {/* {role === "bankReportViewer" && (
              <button
                className="ui basic button whitespace-nowrap"
                onClick={() => handleExport(data)}
              >
                <i className="download icon"></i>
                <span className="hidden md:inline-block">Excel Export</span>
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstablishmentMenu;
