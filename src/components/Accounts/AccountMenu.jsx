import React, { useState } from "react";
import CreateAccountModal from "../../containers/CreateAccountModal";
// import { downloadExcel } from "../../containers/DownloadExcel";
// import { sampleData } from "./sampleData";

const AccountMenu = ({ activeTab, union, isPrCoop, prCooperative, role }) => {
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
            Accounts
          </span>
        </div>
        <div className="right menu flex flex-col md:flex-row items-center">
          <div className="hidden md:flex">
            <div className="item">
              <div className="ui icon input">
                <input type="text" placeholder="Search ..." />
                <i className="search link icon"></i>
              </div>
            </div>
          </div>
          {(role === "bankAdmin" ||
            role === "unionAdmin" ||
            role === "primaryCooperativeAdmin") && (
            <div className="flex item-center">
              {activeTab === "accounts" && (
                <div>
                  <button
                    className="ui teal button whitespace-nowrap"
                    onClick={() => handleAssign()}
                    style={{ backgroundColor: "#06B6D4" }}
                  >
                    <i className="plus icon"></i>
                    <span className="hidden md:inline-block">New Account</span>
                  </button>
                </div>
              )}
            </div>
          )}
          <div>
            <button
              className="ui basic button whitespace-nowrap"
              // onClick={() => handleExport(sampleData)}
            >
              <i className="download icon"></i>
              <span className="hidden md:inline-block">Excel Export</span>
            </button>
          </div>
        </div>
      </div>
      {activeTab === "accounts" && (
        <CreateAccountModal
          title="New Account"
          edit={false}
          isPrCoop={isPrCoop}
          union={union}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      )}
    </div>
  );
};

export default AccountMenu;
