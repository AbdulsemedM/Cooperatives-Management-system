import React, { useState } from "react";
import CreatePaidUpShareModal from "../../containers/CreatePaidUpShareModal";
import CreateAccountModal from "../../containers/CreateAccountModal";
// import { downloadExcel } from "../../containers/DownloadExcel";
// import { sampleData } from "./sampleData";

const IncomeStatementMenu = ({
  activeTab,
  union,
  prCooperative,
  role,
  unionID,
  prCooperativeID,
  scope,
  setScope,
}) => {
  // function handleExport(data1) {
  //   downloadExcel(data1);
  // }
  // const [scope, setScope] = useState({
  //   option: "all",
  // });
  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };
  const handleScope = (event) => {
    const { name, value } = event.target;
    setScope((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // console.log(scope);

  return (
    <div className="pr-3">
      <span className="border p-3 text-xl bg-red-100">
        Not Fully Functional, Its Under Development.
      </span>
      <div className="ui secondary  menu flex items-center">
        <div>
          <span className="item text-2xl font-bold text-gray-700">
            Income Statement
          </span>
        </div>
        <div className="field">
          <select
            className="ui dropdown"
            name="option"
            value={scope?.option}
            onChange={handleScope}
            // required
          >
            <option value="all">All</option>
            <option value="union">Union</option>
            <option value="prCooperative">Pr Cooperative</option>
          </select>
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
          {role.includes("User") && (
            <div className="flex item-center">
              {activeTab === "paidUpShare" && (
                <div>
                  <button
                    className="ui teal button whitespace-nowrap"
                    onClick={() => handleAssign()}
                    style={{ backgroundColor: "#06B6D4" }}
                  >
                    <i className="plus icon"></i>
                    <span className="hidden md:inline-block">
                      New Paid-Up-Share
                    </span>
                  </button>
                </div>
              )}
              {activeTab === "osLoan" && (
                <div>
                  <button
                    className="ui teal button whitespace-nowrap"
                    onClick={() => handleAssign()}
                    style={{ backgroundColor: "#06B6D4" }}
                  >
                    <i className="plus icon"></i>
                    <span className="hidden md:inline-block">New OS-Loan</span>
                  </button>
                </div>
              )}{" "}
              {activeTab === "totalCapital" && (
                <div>
                  <button
                    className="ui teal button whitespace-nowrap"
                    onClick={() => handleAssign()}
                    style={{ backgroundColor: "#06B6D4" }}
                  >
                    <i className="plus icon"></i>
                    <span className="hidden md:inline-block">
                      New Total Capital
                    </span>
                  </button>
                </div>
              )}{" "}
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
      {activeTab === "paidUpShare" && (
        <CreatePaidUpShareModal
          title="New Paid Up Share"
          edit={false}
          isLoan={false}
          role={role}
          union={union}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
          unionID={unionID}
          prCooperativeID={prCooperativeID}
        />
      )}
      {activeTab === "osLoan" && (
        <CreatePaidUpShareModal
          title="New OS Loan"
          edit={false}
          isLoan={true}
          role={role}
          union={union}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
          unionID={unionID}
          prCooperativeID={prCooperativeID}
        />
      )}
      {activeTab === "accounts" && (
        <CreateAccountModal
          title="New Account"
          edit={false}
          // isPrCoop={isPrCoop}
          union={union}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      )}
    </div>
  );
};

export default IncomeStatementMenu;
