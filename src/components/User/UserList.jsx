import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactDataTable from "../../containers/DataTable";
import { API } from "../../utils/API";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { Popup } from "semantic-ui-react";
import ResetPasswordModal from "../../containers/ResetPasswordModal";

const UserList = ({ role, prCooperativeID, unionID }) => {
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState();
  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };

  // console.log("da", data);
  useEffect(() => {
    const fetchData = async () => {
      await API.get("/users/getUsers").then((res) =>
        role.includes("union")
          ? setData(
              res?.data?.filter((item) => item?.union?.unionId === unionID)
            )
          : role.includes("primary")
          ? setData(
              res?.data?.filter(
                (item) =>
                  item?.prCooperative?.prCooperativeId === prCooperativeID
              )
            )
          : setData(res.data)
      );
    };
    fetchData();
  }, [unionID, prCooperativeID, role]);

  // start
  //   let i = 1;
  const UnionColumn = [
    // {
    //   name: "No.",
    //   cell: (row) => i++,
    //   width: "60px",
    //   sortable: true,
    // },
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.address?.phoneNumber,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.address?.email,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.roles[0]?.roleName,
      sortable: true,
    },
    {
      name: "Union",
      selector: (row) => row.union?.name,
      sortable: true,
    },
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <div className="whitespace-nowrap">
            <span
              className="mx-2 cursor-pointer text-xl"
              onClick={() => {
                setDataToEdit(row);
                handleAssign();
              }}
            >
              <Popup
                content="Reset Password"
                trigger={
                  <i className="unlock alternate icon text-orange-400 icon"></i>
                }
              />
            </span>
          </div>
        );
      },
      omit: role.includes("Report") && true,
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];
  // end
  return (
    <div>
      <div className="px-10 my-3 shadow py-3 rounded border">
        <div className="flex items-center justify-end my-3">
          {role.includes("admin") && (
            <div>
              <Link
                to={`bank/createUser`}
                className="ui teal button whitespace-nowrap"
                style={{ backgroundColor: "#06B6D4" }}
              >
                <i className="plus icon"></i>
                <span className="hidden md:inline-block">New User</span>
              </Link>
            </div>
          )}
          {(role === "bankReportViewer" || role === "bankAdmin") && (
            <div>
              <div className="ui icon input mx-2">
                <input type="text" placeholder="Search ..." />
                <i className="search link icon"></i>
              </div>
              {/* <button
                className="ui basic button whitespace-nowrap"
                // onClick={() => handleExport(sampleData)}
              >
                <i className="download icon"></i>
                <span className="hidden md:inline-block">Excel Export</span>
              </button> */}
            </div>
          )}
        </div>
        <div className="ui divider"></div>

        <div className="bg-white">
          <ReactDataTable columns={UnionColumn} data={data} />
        </div>
        <div>
          <ResetPasswordModal
            title={`Reset Password for ${dataToEdit?.username}`}
            dataToEdit={dataToEdit}
            setDispatched={setDispatched}
            dispatched={dispatched}
          />
        </div>
      </div>
    </div>
  );
};
const mapSateToProps = createStructuredSelector({
  role: selectRole,
  unionID: selectUnionID,
  prCooperativeID: selectPrCooperativeID,
});

export default connect(mapSateToProps)(UserList);
