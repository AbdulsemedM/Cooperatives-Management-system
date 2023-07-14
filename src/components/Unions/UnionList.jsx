import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactDataTable from "../../containers/DataTable";
import EditUPModal from "../../containers/EditUPModal";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectRole, selectUnionID } from "../../redux/user/userSelector";
import CreateAssetModal from "../../containers/CeateAssetModal";
import ActionDropdown from "../../containers/ActionDropdown";
import CreateLiabilityModal from "../../containers/CreateLiabilityModal";
import CreateCommodityModal from "../../containers/CreateCommodityModal";
import CreatePaidUpShareModal from "../../containers/CreatePaidUpShareModal";
import CreateMemberModal from "../../containers/CreateMemberModal";
import { Popup } from "semantic-ui-react";
import MemberUnionExcel from "../../Excel Reports/MemberUnionExcel";
import SectorAndIndustryMemberExcel from "../../Excel Reports/SectorAndIndustryMemberExcel";
import MemberByGeographicalLocation from "../../Excel Reports/MemberByGeographicalLocation";
import DetailModal from "../DetailModals/DetailModal";
import UnionExportExcel from "../../Excel Reports/UnionExportExcel";
import { setUpdatedState } from "../../redux/state-control/stateAction";
import { selectUpdatedState } from "../../redux/state-control/stateSelector";
import CreateAccountModal from "../../containers/CreateAccountModal";
import UnionExcelModalCaller from "../../Excel Reports/Imports/union/UnionExcelModalCaller";
import PCExcelModalCaller from "../../Excel Reports/Imports/prcooperatives/PCExcelModalCaller";
import { getPCData, getUnionData } from "../../redux/actions/union.action";
import { API } from "../../utils/API";

const UnionList = ({
  isPrCooperative,
  role,
  unionID,
  setUpdatedState,
  updatedState,
}) => {
  const [actionSelected, setActionSelected] = useState();
  const [selectedUnionId, setSelectedUnionId] = useState();
  const [selectedPrId, setSelectedPrId] = useState();
  const [activeTab, setActiveTab] = useState(
    isPrCooperative ? "allcooperative" : "allUnion"
  );

  // const [prData, setPrData] = useState([]);
  // const [prCooperative, setPrCooperative] = useState([]);
  const [dataToEdit, setDataToEdit] = useState();
  const [prMemberTotal, setPrMemberTotal] = useState([]);

  const [filterBy, setFilterBy] = useState({
    option: "",
    searchInput: "",
  });

  useEffect(() => {
    setSelectedPrId("");
    setSelectedUnionId("");
  }, [isPrCooperative]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterBy((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [dispatched, setDispatched] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const handleAssign = () => {
    setDispatched(true);
  };

  useEffect(() => {
    setActiveTab(isPrCooperative ? "allcooperative" : "allUnion");
  }, [isPrCooperative]);

  useEffect(() => {
    const fetchData = async () => {
      role === "bankReportViewer" &&
        (await API.get("/prCooperativeExport/getprCooperativesReport").then(
          (res) => setPrMemberTotal(res.data)
        ));

      // !isPrCooperative && role === "bankUser" && dispatch(getUnionData());
      // role === "bankUser" || role === "bankReportViewer"
      //   ? await API.get("/prCooperatives/getPrCooperatives").then((res) =>
      //       setPrCooperative(res.data)
      //     )
      //   : role === "unionUser" &&
      //     (await API.get(`/prCooperatives/union/${unionID}`).then((res) =>
      //       setPrCooperative(res.data)
      //     ));
      isPrCooperative
        ? role === "bankUser" || role === "bankReportViewer"
          ? dispatch(getPCData())
          : (role === "unionUser" || role === "unionReportViewer") &&
            dispatch(getUnionData())
        : (role === "bankUser" || role === "bankReportViewer") &&
          dispatch(getUnionData());
    };
    fetchData();
  }, [isPrCooperative, unionID, role, dispatch]);

  const unionData = useSelector((state) => state.unions);

  const { unions, pc, loading } = unionData;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     updatedState === "union" &&
  //       role === "bankUser" &&
  //       (await API.get("/union/getUnions").then((res) => setUnion(res.data)));

  //     updatedState === "prCoop" &&
  //       role === "bankUser" &&
  //       (await API.get("/prCooperatives/getPrCooperatives").then((res) =>
  //         setPrCooperative(res.data)
  //       ));

  //     updatedState === "prCoop" &&
  //       isPrCooperative &&
  //       (await API.get("/prCooperatives/getPrCooperatives").then((res) =>
  //         setPrData(res.data)
  //       ));
  //     updatedState === "union" &&
  //       isPrCooperative &&
  //       (await API.get("/union/getUnions").then((res) => setData(res.data)));
  //   };
  //   updatedState.length && fetchData();
  //   setUpdatedState("done");
  //   // eslint-disable-next-line
  // }, [updatedState]);

  useEffect(() => {
    // console.log("filter called");
    isPrCooperative
      ? setFilteredData(
          pc
            ?.filter((item) =>
              activeTab === "allcooperative"
                ? item
                : activeTab === "activePr"
                ? item?.isActive === true
                : activeTab === "inactivePr" && item?.isActive === false
            )
            ?.filter((item) =>
              filterBy?.searchInput === ""
                ? item
                : filterBy?.searchInput !== "" && filterBy?.option === ""
                ? Object.values(item)?.some(
                    (value) =>
                      typeof value === "string" &&
                      value
                        .toLowerCase()
                        .includes(filterBy?.searchInput?.toLowerCase())
                  )
                : filterBy.option === "unionName"
                ? item?.union?.name
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
                : filterBy.option === "phoneNumber"
                ? item?.address?.phoneNumber.includes(filterBy.searchInput)
                : filterBy.option === "region"
                ? item?.address?.region
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
                : filterBy.option === "zone"
                ? item?.address?.zone
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
                : filterBy.option === "woreda"
                ? item?.address?.woreda
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
                : filterBy.option === "sector"
                ? item?.sector?.name
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
                : filterBy.option === "type" &&
                  item?.type?.typeName
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
            )
        )
      : setFilteredData(
          unions
            ?.filter((item) =>
              activeTab === "allUnion"
                ? item
                : activeTab === "activeUnion"
                ? item?.isActive === true
                : activeTab === "inactiveUnion" && item?.isActive === false
            )
            ?.filter((item) =>
              filterBy?.searchInput === ""
                ? item
                : filterBy?.option === "" && filterBy?.searchInput !== ""
                ? Object.values(item)?.some(
                    (value) =>
                      typeof value === "string" &&
                      value
                        .toLowerCase()
                        .includes(filterBy?.searchInput?.toLowerCase())
                  )
                : filterBy.option === "unionName"
                ? item?.name
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
                : filterBy.option === "phoneNumber"
                ? item?.address?.phoneNumber.includes(
                    filterBy.searchInput?.toLowerCase()
                  )
                : filterBy.option === "region"
                ? item?.address?.region
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
                : filterBy.option === "zone"
                ? item?.address?.zone
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
                : filterBy.option === "woreda"
                ? item?.address?.woreda
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
                : filterBy.option === "sector"
                ? item?.sector?.name
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
                : filterBy.option === "type" &&
                  item?.type?.typeName
                    ?.toLowerCase()
                    .includes(filterBy.searchInput?.toLowerCase())
            )
        );
    setUpdatedState("");
  }, [
    pc,
    isPrCooperative,
    unions,
    updatedState,
    setUpdatedState,
    filterBy.option,
    filterBy.searchInput,
    activeTab,
  ]);

  // start
  const UnionColumn = [
    {
      name: "Union Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.address?.phoneNumber,
      sortable: true,
    },
    // {
    //   name: "Email",
    //   selector: (row) => row.address?.email,
    //   sortable: true,
    // },
    {
      name: "Zone",
      selector: (row) => row.address?.zone,
      sortable: true,
    },
    {
      name: "Woreda",
      selector: (row) => row.address?.woreda,
      sortable: true,
    },
    {
      name: "Sector",
      selector: (row) => row.sector?.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type?.typeName,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <div className="whitespace-nowrap">
            <span
              className="mx-2 cursor-pointer text-xl"
              onClick={() => {
                setActionSelected("");
                setDataToEdit(row);
                handleAssign();
              }}
            >
              <Popup
                content="Edit"
                trigger={<i className="edit text-orange-400 icon"></i>}
              />
            </span>
            <ActionDropdown
              row={row}
              isUnion={true}
              handleAssign={handleAssign}
              setSelectedUnionId={setSelectedUnionId}
              setActionSelected={setActionSelected}
              isPrCooperative={isPrCooperative}
            />
          </div>
        );
      },
      omit: role.includes("Report") && true,
      ignoreRowClick: true,
      allowOverflow: true,
      width: "110px",
      // button: true,
    },
    {
      cell: (row) => {
        return (
          <div className="whitespace-nowrap">
            <span className="mx-2 cursor-pointer text-xl">
              <DetailModal row={row} prDetail={false} />
            </span>
          </div>
        );
      },
      omit: role.includes("User") && true,
      ignoreRowClick: true,
      allowOverflow: true,
      width: "80px",
      // button: true,
    },
  ];

  const pcColumn = [
    {
      name: "PC Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.address?.phoneNumber,
      sortable: true,
    },

    {
      name: "Zone",
      selector: (row) => row.address?.zone,
      sortable: true,
    },
    {
      name: "Woreda",
      selector: (row) => row.address?.woreda,
      sortable: true,
    },
    {
      name: "Sector",
      selector: (row) => row.sector?.name,
      sortable: true,
    },

    {
      name: "date of establishment",
      selector: (row) => row?.dateOfEstablishmnet,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type?.typeName,
      sortable: true,
    },
    {
      name: "Male Membres",
      selector: (row) => row.no_Of_MaleMembers,
      sortable: true,
    },
    {
      name: "Female Membres",
      selector: (row) => row.no_Of_FemaleMembers,
      sortable: true,
    },
    {
      name: "Total Membres",
      selector: (row) => row.no_Of_FemaleMembers + row.no_Of_MaleMembers,
      sortable: true,
    },
    {
      name: "Union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit: role === "unionUser" || role === "unionReportViewer",
    },
    {
      cell: (row) => {
        return (
          <div className="whitespace-nowrap">
            <span
              className="mx-2 cursor-pointer text-xl"
              onClick={() => {
                setActionSelected("");
                setDataToEdit(row);
                handleAssign();
              }}
            >
              <Popup
                content="Edit"
                trigger={<i className="edit text-orange-400 icon"></i>}
              />
            </span>

            <ActionDropdown
              row={row}
              isUnion={false}
              handleAssign={handleAssign}
              setSelectedPrId={setSelectedPrId}
              setActionSelected={setActionSelected}
              isPrCooperative={isPrCooperative}
            />
          </div>
        );
      },
      omit: role.includes("Report") && true,
      ignoreRowClick: true,
      allowOverflow: true,
      width: "110px",
    },
    {
      cell: (row) => {
        return (
          <div className="whitespace-nowrap">
            <span className="mx-2 cursor-pointer text-xl">
              <DetailModal row={row} prDetail={true} />
            </span>
          </div>
        );
      },
      omit: role.includes("User") && true,
      ignoreRowClick: true,
      allowOverflow: true,
      width: "80px",
      // button: true,
    },
  ];
  // end
  return (
    <div>
      <div className="px-10 my-3 shadow py-3 rounded border">
        <div className="flex items-center justify-end my-3">
          <div className="flex">
            <select
              className="ui dropdown"
              name="option"
              value={filterBy?.option}
              onChange={handleChange}
              placeholder="Filter by"
              required
            >
              <option value=""></option>
              {isPrCooperative && <option value="unionName">Union Name</option>}
              <option value="region">Region</option>
              <option value="zone">Zone</option>
              <option value="woreda">Woreda</option>
              <option value="sector">Sector</option>
              <option value="type">Type</option>
            </select>
            <div className="ui icon input mx-2">
              <input
                type="text"
                name="searchInput"
                value={filterBy?.searchInput}
                onChange={handleChange}
                placeholder="Search ..."
              />
              <i className="search link icon"></i>
            </div>
            {role.includes("Report") && (
              <div>
                {(filterBy.option === "" ||
                  filterBy.option === "phoneNumber") && (
                  <UnionExportExcel
                    data={filteredData}
                    forCoop={isPrCooperative}
                  />
                )}
                {filterBy.option === "unionName" ? (
                  <MemberUnionExcel
                    data={filteredData}
                    totalMember={prMemberTotal}
                  />
                ) : filterBy.option === "sector" ||
                  filterBy.option === "type" ? (
                  <SectorAndIndustryMemberExcel data={filteredData} />
                ) : (
                  (filterBy.option === "region" ||
                    filterBy.option === "zone" ||
                    filterBy.option === "woreda") && (
                    <MemberByGeographicalLocation data={filteredData} />
                  )
                )}
              </div>
            )}
            {role.includes("bankUser") && isPrCooperative === false && (
              <div>
                <UnionExcelModalCaller />
              </div>
            )}
            {role.includes("bankUser") && isPrCooperative && (
              <div>
                <PCExcelModalCaller union={unions} />
              </div>
            )}
          </div>
          {role.includes("User") && (
            <div>
              <Link
                to={`/${role}/${isPrCooperative ? "addPC" : "addUnion"}`}
                className="ui teal button whitespace-nowrap"
                style={{ backgroundColor: "#06B6D4" }}
              >
                <i className="plus icon"></i>
                <span className="hidden md:inline-block">
                  {role !== "bankReportViewer" &&
                    (isPrCooperative ? "New Pr-Coop" : "New Union")}
                </span>
              </Link>
            </div>
          )}
        </div>
        {isPrCooperative ? (
          <div className="ui secondary pointing menu">
            <span
              className={`${
                activeTab === "allcooperative" && "active teal"
              } item cursor-pointer`}
              onClick={() => setActiveTab("allcooperative")}
            >
              All Pr Cooperatives
            </span>
            <span
              className={`${
                activeTab === "activePr" && "active teal"
              } item   cursor-pointer`}
              onClick={() => setActiveTab("activePr")}
            >
              Active
            </span>
            <span
              className={`${
                activeTab === "inactivePr" && "active teal"
              } item   cursor-pointer`}
              onClick={() => setActiveTab("inactivePr")}
            >
              Inactive
            </span>
          </div>
        ) : (
          <div className="ui secondary pointing menu">
            <span
              className={`${
                activeTab === "allUnion" && "active teal"
              } item cursor-pointer`}
              onClick={() => setActiveTab("allUnion")}
            >
              All Unions
            </span>
            <span
              className={`${
                activeTab === "activeUnion" && "active teal"
              } item   cursor-pointer`}
              onClick={() => setActiveTab("activeUnion")}
            >
              Active
            </span>
            <span
              className={`${
                activeTab === "inactiveUnion" && "active teal"
              } item   cursor-pointer`}
              onClick={() => setActiveTab("inactiveUnion")}
            >
              Inactive
            </span>
          </div>
        )}
        <ReactDataTable
          columns={isPrCooperative ? pcColumn : UnionColumn}
          data={filteredData}
          loading={loading}
        />
      </div>
      <div>
        {actionSelected === "" && (
          <EditUPModal
            title={isPrCooperative ? "Edit Pr Coop" : "Edit Union"}
            dataToEdit={dataToEdit}
            isPrCooperative={isPrCooperative}
            setDispatched={setDispatched}
            dispatched={dispatched}
            updatedState={updatedState}
            setUpdatedState={setUpdatedState}
          />
        )}
        {actionSelected === "asset" && (
          <CreateAssetModal
            title="New Asset"
            edit={false}
            union={unions}
            prCooperative={pc}
            selectedUnionId={selectedUnionId}
            selectedPrId={selectedPrId}
            role={role}
            setDispatched={setDispatched}
            dispatched={dispatched}
            updatedState={updatedState}
            setUpdatedState={setUpdatedState}
          />
        )}
        {actionSelected === "liability" && (
          <CreateLiabilityModal
            title="New Liability"
            edit={false}
            union={unions}
            prCooperative={pc}
            selectedUnionId={selectedUnionId}
            selectedPrId={selectedPrId}
            role={role}
            setDispatched={setDispatched}
            dispatched={dispatched}
            updatedState={updatedState}
            setUpdatedState={setUpdatedState}
          />
        )}
        {actionSelected === "commodity" && (
          <CreateCommodityModal
            title="Edit Commodity"
            edit={true}
            selectedUnionId={selectedUnionId}
            selectedPrId={selectedPrId}
            role={role}
            union={unions}
            prCooperative={pc}
            setDispatched={setDispatched}
            dispatched={dispatched}
            updatedState={updatedState}
            setUpdatedState={setUpdatedState}
          />
        )}
        {actionSelected === "paidUpShare" && (
          <CreatePaidUpShareModal
            title="New Paid Up Share"
            edit={false}
            isLoan={false}
            role={role}
            selectedUnionId={selectedUnionId}
            selectedPrId={selectedPrId}
            union={unions}
            prCooperative={pc}
            setDispatched={setDispatched}
            dispatched={dispatched}
            updatedState={updatedState}
            setUpdatedState={setUpdatedState}
          />
        )}
        {actionSelected === "osLoan" && (
          <CreatePaidUpShareModal
            title="New OS Loan"
            edit={false}
            isLoan={true}
            role={role}
            selectedUnionId={selectedUnionId}
            selectedPrId={selectedPrId}
            union={unions}
            prCooperative={pc}
            setDispatched={setDispatched}
            dispatched={dispatched}
            updatedState={updatedState}
            setUpdatedState={setUpdatedState}
          />
        )}
        {actionSelected === "individualMember" && (
          <CreateMemberModal
            title="Create Member"
            role={role}
            edit={false}
            unionID={unionID}
            selectedPrId={selectedPrId}
            setDispatched={setDispatched}
            dispatched={dispatched}
            updatedState={updatedState}
            setUpdatedState={setUpdatedState}
          />
        )}
        {actionSelected === "account" && (
          <CreateAccountModal
            title="New Account"
            edit={false}
            isLoan={true}
            role={role}
            selectedUnionId={selectedUnionId}
            selectedPrId={selectedPrId}
            updatedState={updatedState}
            setUpdatedState={setUpdatedState}
            union={unions}
            prCooperative={pc}
            setDispatched={setDispatched}
            dispatched={dispatched}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  role: selectRole,
  unionID: selectUnionID,
  updatedState: selectUpdatedState,
});

const mapDispatchToProps = (dispatch) => ({
  setUpdatedState: (item) => dispatch(setUpdatedState(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnionList);
