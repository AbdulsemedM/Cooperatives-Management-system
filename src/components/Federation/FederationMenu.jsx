import React, { useState } from "react";
import CreateFederationModal from "../../containers/CreateFederationModal";

const FederationMenu = ({ role }) => {
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
            Federation
          </span>
        </div>
        <div className="right menu flex flex-col md:flex-row items-center">
          <div className="hidden md:flex">
            <div className="item">
              <div className="ui icon input">
                {/* <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search ..."
                /> */}
                {/* <i className="search link icon"></i> */}
              </div>
            </div>
          </div>
          {(role === "bankUser" || role === "bankAdmin") && (
            <div className="flex item-center">
              <div>
                <button
                  className="ui teal button whitespace-nowrap"
                  onClick={() => handleAssign()}
                  style={{ backgroundColor: "#06B6D4" }}
                >
                  <i className="plus icon"></i>
                  <span className="hidden md:inline-block">New Federation</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {
        <CreateFederationModal
          title="Create Federation"
          edit={false}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      }
    </div>
  );
};

export default FederationMenu;
