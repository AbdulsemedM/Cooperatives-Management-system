import React, { useEffect, useState } from "react";
import CreateSectorModal from "../../containers/CreateSectorModal";
import CreateTypeModal from "../../containers/CreateTypeModal";
import ReactDataTable from "../../containers/DataTable";
import CreateTotalCapitalModal from "../../containers/CreateTotalCapitalModal";
import { Popup } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSectorData,
  getTypeData,
} from "../../redux/actions/industry.action";

const IndustryFilterMenu = ({
  activeTab,
  setActiveTab,
  role,
  search,
  unionID,
  prCooperativeID,
  updatedState,
  setUpdatedState,
}) => {
  const [dataToEdit, setDataToEdit] = useState();

  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getTypeData());
      dispatch(getSectorData());
      // await API.get("/sector/getSectors").then((res) => setSector(res.data));
      // await API.get("/type/getTypes").then((res) => setType(res.data));
    };
    fetchData();
  }, [dispatch]);
  const industryData = useSelector((state) => state.industry);

  const { types, sectors, loading } = industryData;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     updatedState.length &&
  //       updatedState === "sector" &&
  //       (await API.get("/sector/getSectors").then((res) =>
  //         setSector(res.data)
  //       ));

  //     updatedState.length &&
  //       updatedState === "type" &&
  //       (await API.get("/type/getTypes").then((res) => setType(res.data)));
  //   };
  //   fetchData();
  //   setUpdatedState("");
  //   // eslint-disable-next-line
  // }, [updatedState]);

  // start
  const sectorColumns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.sectorDescription,
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
          </div>
        );
      },
      omit: role.includes("Report") && true,
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];
  const typeColumn = [
    {
      name: "Name",
      selector: (row) => row.typeName,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
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
    <div className="mx-5">
      <div className="ui secondary pointing menu">
        <span
          className={`${
            activeTab === "sector" && "active teal"
          } item   cursor-pointer`}
          onClick={() => setActiveTab("sector")}
        >
          Sector
        </span>
        <span
          className={`${
            activeTab === "type" && "active teal"
          } item cursor-pointer`}
          onClick={() => setActiveTab("type")}
        >
          Type
        </span>
        {/* <span
          className={`${
            activeTab === "industry" && "active teal"
          } item cursor-pointer`}
          onClick={() => setActiveTab("industry")}
        >
          Industry
        </span> */}
      </div>
      <div>
        <ReactDataTable
          data={
            activeTab === "sector"
              ? sectors?.filter((item) =>
                  item?.name?.toLowerCase().includes(search?.toLowerCase())
                )
              : types?.filter((item) =>
                  item?.typeName?.toLowerCase().includes(search?.toLowerCase())
                )
          }
          columns={activeTab === "sector" ? sectorColumns : typeColumn}
          loading={loading}
        />
      </div>
      {activeTab === "sector" && (
        <CreateSectorModal
          title="Edit Sector"
          dataToEdit={dataToEdit}
          edit={true}
          setDispatched={setDispatched}
          setUpdatedState={setUpdatedState}
          dispatched={dispatched}
        />
      )}
      {activeTab === "type" && (
        <CreateTypeModal
          title="Edit Type"
          dataToEdit={dataToEdit}
          edit={true}
          setDispatched={setDispatched}
          setUpdatedState={setUpdatedState}
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

export default IndustryFilterMenu;
