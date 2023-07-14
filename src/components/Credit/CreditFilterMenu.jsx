import React, { useEffect, useState } from "react";
import CreateSectorModal from "../../containers/CreateSectorModal";
import CreateTypeModal from "../../containers/CreateTypeModal";
import ReactDataTable from "../../containers/DataTable";
import { API } from "../../utils/API";
import CreateTotalCapitalModal from "../../containers/CreateTotalCapitalModal";
import { Popup } from "semantic-ui-react";

const CreditFilterMenu = ({
  activeTab,
  setActiveTab,
  role,
  unionID,
  prCooperativeID,
}) => {
  const [type, setType] = useState([]);
  const [dataToEdit, setDataToEdit] = useState();

  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      await API.get("/type/getTypes").then((res) => setType(res.data));
    };
    fetchData();
  }, [role]);

  // start
  const creditColumns = [
    {
      name: "Name of PC",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Industry",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Loan Disbursed",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "term",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Maturity Date",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Interest Rate",
      selector: (row) => row.description,
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
        <span
          className={`${
            activeTab === "credit" && "active teal"
          } item   cursor-pointer`}
          onClick={() => setActiveTab("credit")}
        >
          Credit
        </span>
     
      </div>
      <div>
        <ReactDataTable
          data={ type}
          columns={creditColumns}
        />
      </div>
      {activeTab === "sector" && (
        <CreateSectorModal
          title="Edit Sector"
          dataToEdit={dataToEdit}
          edit={true}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      )}
      {activeTab === "type" && (
        <CreateTypeModal
          title="Edit Type"
          dataToEdit={dataToEdit}
          edit={true}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      )}
      {activeTab === "totalCapital" && (
        <CreateTotalCapitalModal
          title="Edit Total Capital"
          edit={true}
          role={role}
          prCooperativeID={prCooperativeID}
          unionID={unionID}
          dataToEdit={dataToEdit}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      )}
    </div>
  );
};

export default CreditFilterMenu;
