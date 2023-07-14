import React, { useEffect, useState } from "react";
import ReactDataTable from "../../containers/DataTable";
import { API } from "../../utils/API";
import CreateJobModal from "../../containers/CreateJobModal";
import { Popup } from "semantic-ui-react";

const JobFilterMenu = ({
  union,
  role,
  unionID,
  prCooperative,
  prCooperativeID,
}) => {
  // const [paidUpShare, setPaidUpShare] = useState([]);
  // const [osLoan, setOsLoan] = useState([]);
  const [dataToEdit, setDataToEdit] = useState();
  // const [totalCapital, setTotalCapital] = useState([]);
  const [job, setJob] = useState([]);

  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      role === "primaryCooperativeUser" &&
        (await API.get(`/job/getByprCooperativeId/${prCooperativeID}`).then(
          (res) => setJob(res.data)
        ));
      role === "bankUser" &&
        (await API.get("/job/getjobs").then((res) => setJob(res.data)));
      role === "unionUser" &&
        (await API.get(`/job/getByUnionId/${unionID}`).then((res) =>
          setJob(res.data)
        ));
    };
    fetchData();
  }, [role, unionID, prCooperativeID]);

  // start
  const jobColumn = [
    {
      name: "Title",
      selector: (row) => row.jobTitle,
      sortable: true,
    },
    {
      name: "Employee No",
      selector: (row) => row.employeeNumber,
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
    // {
    //   name: "Type",
    //   selector: (row) => row.type?.typeName,
    //   sortable: true,
    // },
    // {
    //   name: "Sector",
    //   selector: (row) => row.sector?.name,
    //   sortable: true,
    // },
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
            <span className="mx-2 cursor-pointer text-xl">
              <Popup
                content="Details"
                trigger={
                  <i className="file alternate outline outline-none teal icon"></i>
                }
              />
            </span>
          </div>
        );
      },
      omit: role === "bankReportViewer" && true,
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  // end

  return (
    <div className="mx-5">
      <div className="ui secondary pointing menu">
        {<span className={`${"active teal"} item   cursor-pointer`}>Jobs</span>}
      </div>
      <div>
        <ReactDataTable data={job} columns={jobColumn} />
      </div>
      {
        <CreateJobModal
          title="Edit Job"
          dataToEdit={dataToEdit}
          edit={true}
          role={role}
          union={union}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
          unionID={unionID}
        />
      }
    </div>
  );
};

export default JobFilterMenu;
