import React, { useEffect, useState } from "react";
import CreateMemberModal from "../../containers/CreateMemberModal";
import ReactDataTable from "../../containers/DataTable";
import { API } from "../../utils/API";
import { Popup } from "semantic-ui-react";
import MemberDetailModal from "../DetailModals/MemberDetails";

const MemberFilterMenu = ({
  activeTab,
  setActiveTab,
  unionID,
  role,
  prCooperativeID,
  setFilteredMemberData,
  filteredMemberData,
  filterData,
  status,
  updatedState,
  setUpdatedState,
}) => {
  const [member, setMember] = useState([]);
  const [dataToEdit, setDataToEdit] = useState();

  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      role === "bankUser" || role === "bankReportViewer"
        ? await API.get("/member/getMembers").then((res) => setMember(res.data))
        : role === "unionUser" || role === "unionReportViewer"
        ? await API.get(`/member/getByUnionId/${unionID}`).then((res) =>
            setMember(res.data)
          )
        : (role === "primaryCooperativeUser" ||
            role === "PrimaryCooperativeReportViewer") &&
          (await API.get(
            `/member/getByPrCooperativeId/${prCooperativeID}`
          ).then((res) => setMember(res.data)));
    };
    fetchData();
  }, [prCooperativeID, unionID, role, status]);

  useEffect(() => {
    const fetchData = async () => {
      updatedState.length &&
        updatedState === "member" &&
        (role === "bankUser" || role === "bankReportViewer"
          ? await API.get("/member/getMembers").then((res) =>
              setMember(res.data)
            )
          : role === "unionUser" || role === "unionReportViewer"
          ? await API.get(`/member/getByUnionId/${unionID}`).then((res) =>
              setMember(res.data)
            )
          : (role === "primaryCooperativeUser" ||
              role === "PrimaryCooperativeReportViewer") &&
            (await API.get(
              `/member/getByPrCooperativeId/${prCooperativeID}`
            ).then((res) => setMember(res.data))));
    };
    fetchData();
    setUpdatedState("");
    // eslint-disable-next-line
  }, [updatedState]);

  useEffect(() => {
    setFilteredMemberData(
      member
        .filter((item) =>
          filterData?.filterByPc?.length
            ? item?.prCooperative?.name
                ?.toLowerCase()
                .includes(filterData?.filterByPc.toLowerCase())
            : item
        )
        .filter((item) =>
          activeTab === "cooperative"
            ? item
            : activeTab === "male"
            ? item?.gender === "MALE"
            : activeTab === "female" && item?.gender === "FEMALE"
        )
    );
  }, [filterData?.filterByPc, activeTab, member, setFilteredMemberData]);

  // start
  const UnionMemberColumn = [
    {
      name: "Name",
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
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Woreda",
      selector: (row) => row.address?.woreda,
      sortable: true,
    },
    {
      name: "Pr Cooperative",
      selector: (row) => row?.prCooperative?.name,
      sortable: true,
      omit:
        role === "primaryCooperativeUser" ||
        role === "primaryCooperativeReportViewer",
    },
    {
      name: "Union",
      selector: (row) => row?.union?.name,
      sortable: true,
      omit:
        role === "unionUser" ||
        role === "unionReportViewer" ||
        role === "primaryCooperativeUser" ||
        role === "primaryCooperativeReportViewer",
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
                content="Edit"
                trigger={<i className="edit text-orange-400 icon"></i>}
              />
            </span>
          </div>
        );
      },
      omit: role.includes("Report") && true,
      ignoreRowClick: true,
      allowOverflow: true,
      width: "80px",
    },
    {
      cell: (row) => {
        return (
          <div className="whitespace-nowrap">
            <span className="mx-2 cursor-pointer text-xl">
              <MemberDetailModal row={row} />
            </span>
          </div>
        );
      },
      omit: role.includes("User") && true,
      ignoreRowClick: true,
      allowOverflow: true,
      width: "80px",
    },
  ];

  // end

  return (
    <div className="mx-5">
      <div className="ui secondary pointing menu">
        <span
          className={`${
            activeTab === "cooperative" && "active teal"
          } item cursor-pointer`}
          onClick={() => setActiveTab("cooperative")}
        >
          All Members
        </span>
        <span
          className={`${
            activeTab === "male" && "active teal"
          } item   cursor-pointer`}
          onClick={() => setActiveTab("male")}
        >
          Male Members
        </span>
        <span
          className={`${
            activeTab === "female" && "active teal"
          } item   cursor-pointer`}
          onClick={() => setActiveTab("female")}
        >
          Female Members
        </span>
      </div>
      <div>
        <ReactDataTable data={filteredMemberData} columns={UnionMemberColumn} />
      </div>
      <CreateMemberModal
        title="Edit Member"
        edit={true}
        role={role}
        setUpdatedState={setUpdatedState}
        prCooperativeID={prCooperativeID}
        unionID={unionID}
        dataToEdit={dataToEdit}
        setDispatched={setDispatched}
        dispatched={dispatched}
      />
    </div>
  );
};

export default MemberFilterMenu;
