import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import ReactDataTable from "../../containers/DataTable";
import { Popup } from "semantic-ui-react";
import AnnualTurnoverExcelModalCaller from "../../Excel Reports/Imports/Annual Turnover/AnnualTurnoverExcelModalCaller";
import { useDispatch, useSelector } from "react-redux";
import { getAnnualTurnoverData } from "../../redux/actions/capital.action";

const SellAndTurnOverFilterMenu = ({
  role,
  unionID,
  prCooperativeID,
  setDataToEdit,
  setFilterBy,
  filterBy,
  setIsEdit,
  prCooperative,
  union,
  federation,
}) => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterBy({
      ...filterBy, //spread operator
      [name]: value,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterBy({
      ...filterBy, //spread operator
      [name]: value,
    });
  };
  const [fiteredTurnover, setFilteredTurnover] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      (role === "bankUser" || role === "bankReportViewer") &&
        dispatch(getAnnualTurnoverData());
      (role === "primaryCooperativeUser" ||
        role === "primaryCooperativeReportViewer") &&
        dispatch(getAnnualTurnoverData(prCooperativeID));
      (role === "unionUser" || role === "unionReportViewer") &&
        dispatch(getAnnualTurnoverData(unionID));
    };
    fetchData();
  }, [role, unionID, prCooperativeID, dispatch]);

  const turnoverData = useSelector((state) => state.capital);
  const { annualTurnover, loading } = turnoverData;
  useEffect(() => {
    const filterTurnover = annualTurnover
      ?.filter((item) =>
        filterBy?.option === "union"
          ? item?.union !== null
          : filterBy?.option === "prCooperative"
          ? item?.prCooperative !== null
          : filterBy?.option === "federation" && item?.federation !== null
      )
      ?.filter((item) =>
        filterBy?.searchInput === ""
          ? item
          : filterBy?.searchInput !== "" && filterBy?.option === "prCooperative"
          ? Object.values(item?.prCooperative)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  ?.toLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : filterBy?.searchInput !== "" && filterBy?.option === "union"
          ? Object.values(item?.union)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  ?.toLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
          : filterBy?.searchInput !== "" && filterBy?.option === "federation"
          ? Object.values(item?.federation)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  ?.toLocaleLowerCase()
                  ?.includes(filterBy?.searchInput?.toLowerCase())
            )
          : Object.values(
              item?.union || item?.prCooperative || item?.federation
            )?.some(
              (value) =>
                typeof value === "string" &&
                value
                  ?.toLowerCase()
                  .includes(filterBy?.searchInput?.toLowerCase())
            )
      );

    setFilteredTurnover(filterTurnover);
  }, [annualTurnover, filterBy?.option, filterBy?.searchInput]);

  const sellAndTurnoverColumn = [
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
      omit:
        filterBy?.option === "federation" ||
        filterBy?.option === "union" ||
        !role.includes("bank")
          ? true
          : false,
    },
    {
      name: "Union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit:
        filterBy?.option === "federation" ||
        filterBy?.option === "prCooperative" ||
        !role.includes("bank")
          ? true
          : false,
    },
    {
      name: "Federation",
      selector: (row) => row.federation?.name,
      sortable: true,
      omit:
        filterBy?.option === "prCooperative" ||
        filterBy?.option === "union" ||
        !role.includes("bank")
          ? true
          : false,
    },
    {
      name: "annualTurnOverValue",
      selector: (row) => row.annualTurnOverValue?.toLocaleString(),
      sortable: true,
      // omit: filterBy?.option === "union" ? false : true,
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
                setIsEdit(true);
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
  // end

  return (
    <div className="mx-5">
      {role.includes("bank") && (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <label htmlFor="filtering">Filter By: </label>
            <span className="py-2 ml-2">
              <select
                id="filtering"
                className="ui dropdown"
                name="option"
                value={filterBy?.option}
                onChange={handleFilterChange}
                placeholder="Filter by"
                required
              >
                {role.includes("bank") && (
                  <option value="federation">Federation</option>
                )}
                <option value="union">Union</option>
                <option value="prCooperative">Primary Cooperative</option>
              </select>
            </span>
          </div>
          <div className="item">
            <div className="ui icon input">
              <input
                type="text"
                name="searchInput"
                value={filterBy?.searchInput}
                onChange={handleChange}
                placeholder="Search ..."
              />
              <i className="search link icon"></i>
            </div>
          </div>
          <div>
            <AnnualTurnoverExcelModalCaller prCooperative={union} />
          </div>
        </div>
      )}
      <div>
        <ReactDataTable
          data={fiteredTurnover}
          columns={sellAndTurnoverColumn}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SellAndTurnOverFilterMenu;
