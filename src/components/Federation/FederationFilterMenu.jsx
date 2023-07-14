import React, { useEffect, useState } from "react";
import ReactDataTable from "../../containers/DataTable";
import { Popup } from "semantic-ui-react";
import CreateFederationModal from "../../containers/CreateFederationModal";
import { useDispatch, useSelector } from "react-redux";
import { getFederationData } from "../../redux/actions/report.action";

const FederationFilterMenu = ({ role }) => {
  const [dataToEdit, setDataToEdit] = useState();

  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await API.get("/type/getTypes").then((res) => setType(res.data));
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getFederationData());
    };
    fetchData();
    // eslint-disable-next-line
  }, [dispatch]);

  const federationData = useSelector((state) => state.report);
  const { federation, loading } = federationData;

  // start
  // const sectorColumns = [
  //   {
  //     name: "Name",
  //     selector: (row) => row.name,
  //     sortable: true,
  //   },
  //   {
  //     name: "Description",
  //     selector: (row) => row.sectorDescription,
  //     sortable: true,
  //   },
  //   {
  //     cell: (row) => {
  //       return (
  //         <div className="whitespace-nowrap">
  //           <span
  //             className="mx-2 cursor-pointer text-xl"
  //             onClick={() => {
  //               setDataToEdit(row);
  //               handleAssign();
  //             }}
  //           >
  //             <Popup
  //               content="Edit"
  //               trigger={<i className="edit text-orange-400 icon"></i>}
  //             />
  //           </span>
  //         </div>
  //       );
  //     },
  //     omit: role.includes("Report") && true,
  //     ignoreRowClick: true,
  //     allowOverflow: true,
  //   },
  // ];
  const federationColumn = [
    {
      name: "Fedeation Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Establishment",
      selector: (row) => row?.yearOfEstablishmnet,
      sortable: true,
    },
    {
      name: "Share Capital upon Establishment",
      selector: (row) => row?.shareCapitalUpOnEstablishement,
      sortable: true,
    },
    {
      name: "Region",
      selector: (row) => row?.address?.region,
      sortable: true,
    },
    {
      name: "Zone",
      selector: (row) => row?.address?.zone,
      sortable: true,
    },
    {
      name: "Sector",
      selector: (row) => row?.sector?.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row?.type?.typeName,
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
          data={federation}
          columns={federationColumn}
          loading={loading}
        />
      </div>

      {
        <CreateFederationModal
          title="Edit Federation"
          dataToEdit={dataToEdit}
          edit={true}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      }
    </div>
  );
};

export default FederationFilterMenu;
