import React, { useEffect, useState } from "react";
import CreateAssetModal from "../../containers/CeateAssetModal";
import CreateCommodityModal from "../../containers/CreateCommodityModal";
import CreateLiabilityModal from "../../containers/CreateLiabilityModal";
import ReactDataTable from "../../containers/DataTable";
import CreateTotalCapitalModal from "../../containers/CreateTotalCapitalModal";
import { Popup } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssetData,
  getCommodityData,
  getLiabilityData,
  getTotlaCapitalData,
} from "../../redux/actions/sheet.action";

const BalanceSheetFilterMenu = ({
  activeTab,
  setActiveTab,
  union,
  role,
  unionID,
  prCooperativeID,
  filterBy,
  prCooperative,
  // updatedState,
  setUpdatedState,
  federation,
}) => {
  // const [asset, setAsset] = useState([]);
  // const [liability, setLiability] = useState([]);
  // const [commodity, setCommodity] = useState([]);
  const [dataToEdit, setDataToEdit] = useState();
  // const [totalCapital, setTotalCapital] = useState([]);
  const [filteredAsset, setFilteredAsset] = useState();
  const [filteredCapital, setFilteredCapital] = useState();
  const [filteredLiability, setFilteredLiability] = useState();
  const [filteredCommodity, setFilteredCommodity] = useState();

  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const handleAssign = () => {
    setDispatched(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      role === "bankUser" || role === "bankReportViewer"
        ? dispatch(getAssetData())
        : role === "unionUser" || role === "unionReportViewer"
        ? dispatch(getAssetData(unionID))
        : (role === "primaryCooperativeUser" ||
            role === "primaryCooperativeReportViewer") &&
          dispatch(getAssetData(prCooperativeID));
      //
      role === "bankUser" || role === "bankReportViewer"
        ? dispatch(getLiabilityData())
        : role === "unionUser" || role === "unionReportViewer"
        ? dispatch(getLiabilityData(unionID))
        : (role === "primaryCooperativeUser" ||
            role === "primaryCooperativeReportViewer") &&
          dispatch(getLiabilityData(prCooperativeID));
      //
      role === "bankUser" || role === "bankReportViewer"
        ? dispatch(getCommodityData())
        : role === "unionUser" || role === "unionReportViewer"
        ? dispatch(getCommodityData(unionID))
        : (role === "primaryCooperativeUser" ||
            role === "primaryCooperativeReportViewer") &&
          dispatch(getCommodityData(prCooperativeID));
      role === "bankUser" || role === "bankReportViewer"
        ? dispatch(getTotlaCapitalData())
        : role === "unionUser" || role === "unionReportViewer"
        ? dispatch(getTotlaCapitalData(unionID))
        : role.includes("primaryCooperative") &&
          dispatch(getTotlaCapitalData(prCooperativeID));
    };
    fetchData();
  }, [role, unionID, prCooperativeID, dispatch]);

  const sheetData = useSelector((state) => state.sheet);
  const { asset, liability, commodity, totalCapital, loading } = sheetData;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     updatedState.length &&
  //       updatedState === "asset" &&
  //       (role === "bankUser" || role === "bankReportViewer"
  //         ? await API.get("/asset/getAssets").then((res) => setAsset(res.data))
  //         : role === "unionUser" || role === "unionReportViewer"
  //         ? await API.get(`/asset/union/${unionID}`).then((res) =>
  //             setAsset(res.data)
  //           )
  //         : (role === "primaryCooperativeUser" ||
  //             role === "primaryCooperativeReportViewer") &&
  //           (await API.get(`/asset/prCooperative/${prCooperativeID}`).then(
  //             (res) => setAsset(res.data)
  //           )));
  //     updatedState.length &&
  //       updatedState === "liability" &&
  //       (role === "bankUser" || role === "bankReportViewer"
  //         ? await API.get("/liability/getLiabilities").then((res) =>
  //             setLiability(res.data)
  //           )
  //         : role === "unionUser" || role === "unionReportViewer"
  //         ? await API.get(`/liability/getByUnionId/${unionID}`).then((res) =>
  //             setLiability(res.data)
  //           )
  //         : (role === "primaryCooperativeUser" ||
  //             role === "primaryCooperativeReportViewer") &&
  //           (await API.get(
  //             `/liability/getByPrCooperativeId/${prCooperativeID}`
  //           ).then((res) => setLiability(res.data))));
  //     updatedState.length &&
  //       updatedState === "commodity" &&
  //       (role === "bankUser" || role === "bankReportViewer"
  //         ? await API.get("/commodity/getcommodities").then((res) =>
  //             setCommodity(res.data)
  //           )
  //         : role === "unionUser" || role === "unionReportViewer"
  //         ? await API.get(`/commodity/getByUnionId/${unionID}`).then((res) =>
  //             setCommodity(res.data)
  //           )
  //         : (role === "primaryCooperativeUser" ||
  //             role === "primaryCooperativeReportViewer") &&
  //           (await API.get(
  //             `/commodity/getByPrCooperativeId/${prCooperativeID}`
  //           ).then((res) => setCommodity(res.data))));
  //     updatedState.length &&
  //       updatedState === "totalCapital" &&
  //       (role === "bankUser" || role === "bankReportViewer") &&
  //       (await API.get("/totalCapital/totalCapitals").then((res) =>
  //         setTotalCapital(res.data)
  //       ));
  //   };
  //   fetchData();
  //   setUpdatedState("");
  //   // eslint-disable-next-line
  // }, [updatedState]);

  useEffect(() => {
    const filterAsset = asset
      ?.filter((item) =>
        filterBy?.option === "all"
          ? item
          : filterBy?.option === "union"
          ? item?.union !== null
          : filterBy?.option === "prCooperative"
          ? item?.prCooperative !== null
          : filterBy?.option === "federation" && item?.federation !== null
      )
      ?.filter((item) =>
        filterBy?.searchInput === ""
          ? item
          : filterBy?.searchInput !== "" && filterBy?.option === "prCooperative"
          ? Object.values(item.prCooperative)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : filterBy?.searchInput !== "" && filterBy?.option === "union"
          ? Object.values(item.union)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLocaleLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : filterBy?.searchInput !== "" && filterBy?.option === "federation"
          ? Object.values(item.federation)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLocaleLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : Object.values(
              item.union || item.prCooperative || item.federation
            )?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
      );
    setFilteredAsset(filterAsset);

    const filterCapital = totalCapital
      ?.filter((item) =>
        filterBy?.option === "all"
          ? item
          : filterBy?.option === "union"
          ? item?.union !== null
          : filterBy?.option === "prCooperative"
          ? item?.prCooperative !== null
          : filterBy?.option === "federation" && item
      )
      ?.filter((item) =>
        filterBy?.searchInput === ""
          ? item
          : filterBy?.searchInput !== "" && filterBy?.option === "prCooperative"
          ? Object.values(item.prCooperative)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : filterBy?.searchInput !== "" && filterBy?.option === "union"
          ? Object.values(item?.union)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLocaleLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : filterBy?.searchInput !== "" && filterBy?.option === "federation"
          ? Object.values(item)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLocaleLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : Object.values(
              item?.union || item?.prCooperative || item?.federation
            )?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
      );
    setFilteredCapital(filterCapital);

    const filterLiability = liability
      ?.filter((item) =>
        filterBy?.option === "all"
          ? item
          : filterBy?.option === "union"
          ? item?.union !== null
          : filterBy?.option === "prCooperative"
          ? item?.prCooperative !== null
          : filterBy?.option === "federation" && item?.federation !== null
      )
      ?.filter((item) =>
        filterBy?.searchInput === ""
          ? item
          : filterBy?.searchInput !== "" && filterBy?.option === "prCooperative"
          ? Object.values(item.prCooperative)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : filterBy?.searchInput !== "" && filterBy?.option === "union"
          ? Object.values(item?.union)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLocaleLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : filterBy?.searchInput !== "" && filterBy?.option === "federation"
          ? Object.values(item?.federation)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLocaleLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : Object.values(
              item?.union || item.prCooperative || item?.federation
            )?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
      );
    setFilteredLiability(filterLiability);
    const filterCommodity = commodity
      ?.filter((item) =>
        filterBy?.option === "all"
          ? item
          : filterBy?.option === "union"
          ? item?.union !== null
          : filterBy?.option === "prCooperative"
          ? item?.prCooperative !== null
          : filterBy?.option === "federation" && item?.federation !== null
      )
      ?.filter((item) =>
        filterBy?.searchInput === ""
          ? item
          : filterBy?.searchInput !== "" && filterBy?.option === "prCooperative"
          ? Object.values(item.prCooperative)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : filterBy?.searchInput !== "" && filterBy?.option === "union"
          ? Object.values(item.union)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLocaleLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : filterBy?.searchInput !== "" && filterBy?.option === "federation"
          ? Object.values(item.federation)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLocaleLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : Object.values(
              item.union || item.prCooperative || item?.federation
            )?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
      );
    setFilteredCommodity(filterCommodity);
  }, [
    filterBy?.option,
    asset,
    totalCapital,
    liability,
    commodity,
    filterBy.searchInput,
  ]);
  // console.log(filterBy?.option);

  // start
  const assetColumn = [
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
      omit: filterBy?.option === "union" || filterBy?.option === "federation",
    },
    {
      name: "Union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit:
        filterBy?.option === "prCooperative" ||
        role?.includes("union") ||
        filterBy?.option === "federation",
    },
    {
      name: "Federation",
      selector: (row) => row.federation?.name,
      sortable: true,
      omit:
        filterBy?.option === "prCooperative" ||
        role?.includes("union") ||
        filterBy?.option === "union",
    },
    {
      name: "Asset Name",
      selector: (row) => row.assetName,
      sortable: true,
    },
    {
      name: "Value",
      selector: (row) => row.value?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Date Generated",
      selector: (row) => row.dateGenerated,
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
      width: "80px",
    },
  ];
  const liabilityColumn = [
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
      omit: filterBy?.option === "union" || filterBy?.option === "federation",
    },
    {
      name: "Union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit:
        filterBy?.option === "prCooperative" ||
        role?.includes("union") ||
        filterBy?.option === "federation",
    },
    {
      name: "Federation",
      selector: (row) => row.federation?.name,
      sortable: true,
      omit:
        filterBy?.option === "prCooperative" ||
        role?.includes("union") ||
        filterBy?.option === "union",
    },
    {
      name: "Liability Value",
      selector: (row) => row.liabilityValue?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Date Generated",
      selector: (row) => row.dateGenerated,
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
      width: "80px",
    },
  ];

  const commodityColumn = [
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
      omit: filterBy?.option === "union" || filterBy?.option === "federation",
    },
    {
      name: "Union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit:
        filterBy?.option === "prCooperative" ||
        role?.includes("union") ||
        filterBy?.option === "federation",
    },
    {
      name: "Federation",
      selector: (row) => row.federation?.name,
      sortable: true,
      omit:
        filterBy?.option === "prCooperative" ||
        role?.includes("union") ||
        filterBy?.option === "union",
    },

    {
      name: "Commodity Name",
      selector: (row) => row.commodityName,
      sortable: true,
    },
    // {
    //   name: "Commodity Value",
    //   selector: (row) => row?.commodityValue,
    //   sortable: true,
    // },
    {
      name: "Date Generated",
      selector: (row) => row.dateGenerated,
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
      width: "80px",
    },
  ];

  const TotalCapitalColumn = [
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
      omit: filterBy?.option === "union",
    },
    {
      name: "Union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit: filterBy?.option === "prCooperative" || role?.includes("union"),
    },
    {
      name: "Capital Value",
      selector: (row) => row.totalCapitalValue?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Date Generated",
      selector: (row) => row.dateGenerated,
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
    <div className="mx-5 relative">
      <div className="ui secondary pointing menu">
        <span
          className={`${
            activeTab === "asset" && "active teal"
          } item   cursor-pointer`}
          onClick={() => setActiveTab("asset")}
        >
          Asset
        </span>
        {!role?.includes("union") && (
          <span
            className={`${
              activeTab === "totalCapital" && "active teal"
            } item   cursor-pointer`}
            onClick={() => setActiveTab("totalCapital")}
          >
            Total Capital
          </span>
        )}
        <span
          className={`${
            activeTab === "liability" && "active teal"
          } item cursor-pointer`}
          onClick={() => setActiveTab("liability")}
        >
          Liability
        </span>
        <span
          className={`${
            activeTab === "commodity" && "active teal"
          } item cursor-pointer`}
          onClick={() => setActiveTab("commodity")}
        >
          Commodity
        </span>
      </div>
      <div style={{ overflow: "visible" }}>
        <ReactDataTable
          data={
            activeTab === "asset"
              ? filteredAsset
              : activeTab === "liability"
              ? filteredLiability
              : activeTab === "commodity"
              ? filteredCommodity
              : filteredCapital
          }
          columns={
            activeTab === "asset"
              ? assetColumn
              : activeTab === "liability"
              ? liabilityColumn
              : activeTab === "commodity"
              ? commodityColumn
              : TotalCapitalColumn
          }
          loading={loading}
        />
      </div>
      {activeTab === "asset" && (
        <CreateAssetModal
          title="Edit Asset"
          dataToEdit={dataToEdit}
          edit={true}
          role={role}
          prCooperativeID={prCooperativeID}
          unionID={unionID}
          setUpdatedState={setUpdatedState}
          union={union}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
          federation={federation}
        />
      )}
      {activeTab === "liability" && (
        <CreateLiabilityModal
          title="Edit Liability"
          union={union}
          role={role}
          setUpdatedState={setUpdatedState}
          prCooperativeID={prCooperativeID}
          unionID={unionID}
          prCooperative={prCooperative}
          dataToEdit={dataToEdit}
          edit={true}
          setDispatched={setDispatched}
          dispatched={dispatched}
          federation={federation}
        />
      )}
      {activeTab === "totalCapital" && (
        <CreateTotalCapitalModal
          title="Edit Total Capital"
          edit={true}
          role={role}
          setUpdatedState={setUpdatedState}
          prCooperativeID={prCooperativeID}
          unionID={unionID}
          dataToEdit={dataToEdit}
          setDispatched={setDispatched}
          dispatched={dispatched}
          federation={federation}
        />
      )}
      {activeTab === "commodity" && (
        <CreateCommodityModal
          title="Edit Commodity"
          dataToEdit={dataToEdit}
          edit={true}
          role={role}
          setUpdatedState={setUpdatedState}
          prCooperativeID={prCooperativeID}
          unionID={unionID}
          prCooperative={prCooperative}
          union={union}
          setDispatched={setDispatched}
          dispatched={dispatched}
          federation={federation}
        />
      )}
    </div>
  );
};

export default BalanceSheetFilterMenu;
