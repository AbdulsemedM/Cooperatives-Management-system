import React, { useEffect, useState } from "react";
import ReactDataTable from "../../containers/DataTable";
import CreatePaidUpShareModal from "../../containers/CreatePaidUpShareModal";
import CreateTotalCapitalModal from "../../containers/CreateTotalCapitalModal";
import { Popup } from "semantic-ui-react";
import CreateAccountModal from "../../containers/CreateAccountModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountData,
  getOSLoanData,
  getPaidUpShareData,
} from "../../redux/actions/capital.action";
import CreateAccountBalanceModal from "../../containers/CreateAccountBalanceModal";
import AddBalanceModal from "../../containers/AddBalanceModal";

const CapitalFilterMenu = ({
  activeTab,
  setActiveTab,
  union,
  role,
  unionID,
  prCooperative,
  prCooperativeID,
  scope,
  federation,
  // setScope,
  // updatedState,
  // setAccountData,
  // accountData,
}) => {
  const [dataToEdit, setDataToEdit] = useState();
  const [accountFiltered, setAccountFiltered] = useState();
  const [osLoanFiltered, setOSLoanFiltered] = useState();
  const [paidupFiltered, setPaidupFiltered] = useState();
  const [selectedPrId, setSelectedPrId] = useState();
  const [actionSelected, setActionSelected] = useState();

  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      role === "bankUser" || role === "bankReportViewer"
        ? // dispatch()
          dispatch(getPaidUpShareData())
        : role === "unionUser" || role === "unionReportViewer"
        ? dispatch(getPaidUpShareData(unionID))
        : (role === "primaryCooperativeUser" ||
            role === "primaryCooperativeReportViewer") &&
          dispatch(getPaidUpShareData(prCooperativeID));
      role === "bankUser" || role === "bankReportViewer"
        ? dispatch(getOSLoanData())
        : role === "unionUser" || role === "unionReportViewer"
        ? dispatch(getOSLoanData(unionID))
        : (role === "primaryCooperativeUser" ||
            role === "primaryCooperativeReportViewer") &&
          dispatch(getOSLoanData(prCooperativeID));

      role === "bankUser" || role === "bankReportViewer"
        ? dispatch(getAccountData())
        : role === "unionUser" || role === "unionReportViewer"
        ? dispatch(getAccountData(unionID))
        : (role === "primaryCooperativeUser" ||
            role === "primaryCooperativeReportViewer") &&
          dispatch(getAccountData(prCooperativeID));
    };
    fetchData();
  }, [role, dispatch, prCooperativeID, unionID]);

  const capitalData = useSelector((state) => state.capital);

  const { account, osLoan, paidUpShare, loading } = capitalData;

  // console.log(account)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     updatedState.length &&
  //       updatedState === "paidUpShare" &&
  //       (role === "bankUser" || role === "bankReportViewer"
  //         ? await API.get("/paidUpShare/getPaidUpShares").then((res) =>
  //             setPaidUpShare(res.data)
  //           )
  //         : role === "unionUser" || role === "unionReportViewer"
  //         ? await API.get(`/paidUpShare/union/${unionID}`).then((res) =>
  //             setPaidUpShare(res.data)
  //           )
  //         : (role === "primaryCooperativeUser" ||
  //             role === "primaryCooperativeReportViewer") &&
  //           (await API.get(
  //             `/paidUpShare/prCooperative/${prCooperativeID}`
  //           ).then((res) => setPaidUpShare(res.data))));

  //     updatedState.length &&
  //       updatedState === "osLoan" &&
  //       (role === "bankUser" || role === "bankReportViewer"
  //         ? await API.get("/osLoan/getosLoans").then((res) =>
  //             setOsLoan(res.data)
  //           )
  //         : role === "unionUser" || role === "unionReportViewer"
  //         ? await API.get(`/osLoan/getByUnionId/${unionID}`).then((res) =>
  //             setOsLoan(res.data)
  //           )
  //         : (role === "primaryCooperativeUser" ||
  //             role === "primaryCooperativeReportViewer") &&
  //           (await API.get(
  //             `/osLoan/getByPrCooperativeId/${prCooperativeID}`
  //           ).then((res) => setOsLoan(res.data))));

  //     updatedState.length &&
  //       updatedState === "account" &&
  //       (role === "bankUser" || role === "bankReportViewer"
  //         ? await API.get("/account/getaccounts").then((res) =>
  //             setAccounts(res.data)
  //           )
  //         : role === "unionUser" || role === "unionReportViewer"
  //         ? await API.get(`/account/getByUnionId/${unionID}`).then((res) =>
  //             setAccounts(res.data)
  //           )
  //         : (role === "primaryCooperativeUser" ||
  //             role === "primaryCooperativeReportViewer") &&
  //           (await API.get(
  //             `/account/getByPrCooperativeId/${prCooperativeID}`
  //           ).then((res) => setAccounts(res.data))));
  //   };
  //   fetchData();
  //   setUpdatedState("");
  //   // eslint-disable-next-line
  // }, [updatedState]);

  useEffect(() => {
    // console.log(account);
    const filterAccount = account
      ?.filter((item) =>
        scope?.option === "all"
          ? item
          : scope?.option === "union"
          ? item?.account?.union !== null
          : scope?.option === "prCooperative"
          ? item?.account?.prCooperative !== null
          : scope?.option === "federation" && item?.account?.federation !== null
      )
      ?.filter((item) =>
        scope?.searchInput === ""
          ? item
          : scope?.searchInput !== "" && scope?.option === "prCooperative"
          ? Object.values(item?.account?.prCooperative)?.some(
              (value) =>
                typeof value === "string" &&
                value?.toLowerCase().includes(scope?.searchInput?.toLowerCase())
            )
          : scope?.searchInput !== "" && scope?.option === "union"
          ? Object.values(item?.account?.union)?.some(
              (value) =>
                typeof value === "string" &&
                value?.toLowerCase().includes(scope?.searchInput?.toLowerCase())
            )
          : scope?.searchInput !== "" && scope?.option === "federation"
          ? Object.values(item?.account?.federation)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  ?.toLocaleLowerCase()
                  ?.includes(scope?.searchInput?.toLowerCase())
            )
          : Object.values(
              item?.account?.union ||
                item?.account?.prCooperative ||
                item?.account?.federation
            )?.some(
              (value) =>
                typeof value === "string" &&
                value?.toLowerCase().includes(scope?.searchInput?.toLowerCase())
            )
      );

    setAccountFiltered(filterAccount);

    const filterPaidUp = paidUpShare
      ?.filter((item) =>
        scope?.option === "all"
          ? item
          : scope?.option === "union"
          ? item?.union !== null
          : scope?.option === "prCooperative"
          ? item?.prCooperative !== null
          : scope?.option === "federation" && item?.federation !== null
      )
      ?.filter((item) =>
        scope?.searchInput === ""
          ? item
          : scope?.searchInput !== "" && scope?.option === "prCooperative"
          ? Object.values(item?.prCooperative)?.some(
              (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(scope?.searchInput.toLowerCase())
            )
          : scope?.searchInput !== "" && scope?.option === "union"
          ? Object.values(item?.union)?.some(
              (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(scope?.searchInput.toLowerCase())
            )
          : scope?.searchInput !== "" && scope?.option === "federation"
          ? Object.values(item?.federation)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLocaleLowerCase()
                  .includes(scope?.searchInput?.toLowerCase())
            )
          : Object.values(
              item.union || item.prCooperative || item?.federation
            )?.some(
              (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(scope?.searchInput.toLowerCase())
            )
      );
    setPaidupFiltered(filterPaidUp);

    const filterOSLoan = osLoan
      ?.filter((item) =>
        scope?.option === "all"
          ? item
          : scope?.option === "union"
          ? item?.union !== null
          : scope?.option === "prCooperative"
          ? item?.prCooperative !== null
          : scope?.option === "federation" && item?.federation !== null
      )
      ?.filter((item) =>
        scope?.searchInput === ""
          ? item
          : scope?.searchInput !== "" && scope?.option === "prCooperative"
          ? Object.values(item.prCooperative)?.some(
              (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(scope?.searchInput.toLowerCase())
            )
          : scope?.searchInput !== "" && scope?.option === "union"
          ? Object.values(item.union)?.some(
              (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(scope?.searchInput.toLowerCase())
            )
          : scope?.searchInput !== "" && scope?.option === "federation"
          ? Object.values(item.federation)?.some(
              (value) =>
                typeof value === "string" &&
                value
                  .toLocaleLowerCase()
                  .includes(scope?.searchInput?.toLowerCase())
            )
          : Object.values(
              item.union || item.prCooperative || item.federation
            )?.some(
              (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(scope?.searchInput.toLowerCase())
            )
      );
    setOSLoanFiltered(filterOSLoan);
  }, [scope?.option, osLoan, paidUpShare, account, scope.searchInput]);

  // start
  const paidUpShareColumn = [
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
      omit:
        scope.option === "union" ||
        scope.option === "federation" ||
        role === "unionUser" ||
        role === "unionReportViewer" ||
        role === "primaryCooperativeUser" ||
        role === "primaryCooperativeReportViewer",
    },
    {
      name: "Union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit:
        scope.option === "prCooperative" ||
        scope.option === "federation" ||
        role === "unionUser" ||
        role === "unionReportViewer",
    },
    {
      name: "Federation",
      selector: (row) => row.federation?.name,
      sortable: true,
      omit:
        scope.option === "prCooperative" ||
        scope.option === "union" ||
        role === "unionUser" ||
        role === "unionReportViewer",
    },
    {
      name: "Paid Up Value",
      selector: (row) => row.paidUpValue?.toLocaleString(),
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
  const osLoanColumn = [
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
      omit:
        scope.option === "union" ||
        scope.option === "federation" ||
        role === "unionUser" ||
        role === "unionReportViewer" ||
        role === "primaryCooperativeUser" ||
        role === "primaryCooperativeReportViewer",
    },
    {
      name: "Union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit:
        scope.option === "prCooperative" ||
        scope.option === "federation" ||
        role === "unionUser" ||
        role === "unionReportViewer",
    },
    {
      name: "Federation",
      selector: (row) => row.federation?.name,
      sortable: true,
      omit:
        scope.option === "prCooperative" ||
        scope.option === "union" ||
        role === "unionUser" ||
        role === "unionReportViewer",
    },
    {
      name: "OS Loan Value",
      selector: (row) => row.osLoanValue?.toLocaleString(),
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

  const accountsColumn = [
    {
      name: "Pr Cooperative",
      selector: (row) => row.account?.prCooperative?.name,
      sortable: true,
      omit:
        scope.option === "union" ||
        role.includes("union") ||
        role === "primaryCooperativeUser" ||
        scope.option === "federation" ||
        role === "primaryCooperativeReportViewer",
    },
    {
      name: "union",
      selector: (row) => row.account?.union?.name,
      sortable: true,
      omit:
        scope.option === "prCooperative" ||
        scope.option === "federation" ||
        role === "unionUser" ||
        role === "unionReportViewer",
      // role === "primaryCooperativeReportViewer" ||
      // role === "primaryCooperativeUser"
      //   ? true
      //   : false,
    },
    {
      name: "Federation",
      selector: (row) => row.account?.federation?.name,
      sortable: true,
      omit:
        scope.option === "prCooperative" ||
        role === "unionUser" ||
        role === "unionReportViewer" ||
        scope.option === "union",
      // role === "primaryCooperativeReportViewer" ||
      // role === "primaryCooperativeUser"
      //   ? true
      //   : false,
    },
    {
      name: "accountNumber",
      selector: (row) => row.account?.accountNumber,
      sortable: true,
    },
    {
      name: "Account Balance",
      selector: (row) =>
        (row?.accountBalance ? row?.accountBalance : 0)?.toLocaleString(),
      sortable: true,
    },
    {
      name: "district",
      selector: (row) => row.account?.district,
      sortable: true,
    },
    {
      name: "branch",
      selector: (row) => row.account?.branch,
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
            <CreateAccountBalanceModal
              row={row}
              handleAssign={handleAssign}
              setDataToEdit={setDataToEdit}
              setSelectedPrId={setSelectedPrId}
              setActionSelected={setActionSelected}
            />
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
      <div className="ui secondary pointing menu">
        <span
          className={`${
            activeTab === "accounts" && "active teal"
          } item   cursor-pointer`}
          onClick={() => setActiveTab("accounts")}
        >
          Accounts
        </span>
        <span
          className={`${
            activeTab === "paidUpShare" && "active teal"
          } item   cursor-pointer`}
          onClick={() => setActiveTab("paidUpShare")}
        >
          Paid Up Share
        </span>
        <span
          className={`${
            activeTab === "osLoan" && "active teal"
          } item cursor-pointer`}
          onClick={() => setActiveTab("osLoan")}
        >
          OS Loan
        </span>
      </div>
      <div>
        <ReactDataTable
          data={
            activeTab === "paidUpShare"
              ? paidupFiltered
              : activeTab === "osLoan"
              ? osLoanFiltered
              : accountFiltered
          }
          columns={
            activeTab === "paidUpShare"
              ? paidUpShareColumn
              : activeTab === "osLoan"
              ? osLoanColumn
              : accountsColumn
          }
          loading={loading}
        />
      </div>
      {actionSelected === "account" && (
        <AddBalanceModal
          title="Add Balance"
          dataToEdit={dataToEdit}
          edit={true}
          role={role}
          union={union}
          isLoan={false}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
          prCooperativeID={selectedPrId}
          federation={federation}
          account={account}
        />
      )}
      {activeTab === "paidUpShare" && (
        <CreatePaidUpShareModal
          title="Edit Paid Up Share"
          dataToEdit={dataToEdit}
          edit={true}
          role={role}
          union={union}
          isLoan={false}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
          prCooperativeID={prCooperativeID}
          federation={federation}
          unionID={unionID}
        />
      )}
      {activeTab === "accounts" && actionSelected === "" && (
        <CreateAccountModal
          title="Edit Account"
          dataToEdit={dataToEdit}
          edit={true}
          role={role}
          union={union}
          isLoan={false}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
          prCooperativeID={prCooperativeID}
          federation={federation}
          unionID={unionID}
        />
      )}
      {activeTab === "osLoan" && (
        <CreatePaidUpShareModal
          title="Edit OS Loan"
          union={union}
          role={role}
          prCooperative={prCooperative}
          dataToEdit={dataToEdit}
          edit={true}
          isLoan={true}
          setDispatched={setDispatched}
          dispatched={dispatched}
          prCooperativeID={prCooperativeID}
          federation={federation}
          unionID={unionID}
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
          federation={federation}
          dispatched={dispatched}
        />
      )}
    </div>
  );
};

export default CapitalFilterMenu;
