import React, { useState } from "react";
import CreateMemberModal from "../../containers/CreateMemberModal";
import PrMemberExcel from "../../Excel Reports/PrMemberExcel";
import AllPrMemberExcel from "../../Excel Reports/AllPrMemberExcel";

const MemberMenu = ({
  unionID,
  role,
  prCooperativeID,
  filterData,
  filteredMemberData,
  setFilterData,
}) => {
  // function handleExport(data1) {
  //   downloadExcel(data1);
  // }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };

  return (
    <div className="pr-3">
      <div className="ui secondary  menu flex items-center">
        <div>
          <span className="item text-2xl font-bold text-gray-700">Members</span>
        </div>
        <div className="right menu flex flex-col md:flex-row items-center">
          <div className="hidden md:flex">
            <div className="item">
              <div className="ui icon input">
                <input
                  type="text"
                  name="filterByPc"
                  value={filterData.filterByPc}
                  onChange={handleChange}
                  placeholder="Search by PC ..."
                />
                <i className="search link icon"></i>
              </div>
            </div>
          </div>
          {role.includes("User") && (
            <div className="flex item-center">
              <div>
                <button
                  className="ui teal button whitespace-nowrap"
                  onClick={() => handleAssign()}
                  style={{ backgroundColor: "#06B6D4" }}
                >
                  <i className="plus icon"></i>
                  <span className="hidden md:inline-block">New Member</span>
                </button>
              </div>
            </div>
          )}
          {role.includes("Report") && (
            <div>
              {filterData?.filterByPc !== "" ? (
                <PrMemberExcel
                  data={filteredMemberData ? filteredMemberData : []}
                />
              ) : (
                <AllPrMemberExcel
                  data={filteredMemberData ? filteredMemberData : []}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <CreateMemberModal
        title="Create Member"
        role={role}
        edit={false}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        setDispatched={setDispatched}
        dispatched={dispatched}
      />
    </div>
  );
};

export default MemberMenu;
