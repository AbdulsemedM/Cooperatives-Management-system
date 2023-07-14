import React, { useEffect, useState } from "react";
import ReactDataTable from "../../containers/DataTable";
import { API } from "../../utils/API";
import CreatePaidUpShareModal from "../../containers/CreatePaidUpShareModal";
import CreateTotalCapitalModal from "../../containers/CreateTotalCapitalModal";
import { Popup } from "semantic-ui-react";

const IncomeStatementFilterMenu = ({
  activeTab,
  setActiveTab,
  union,
  role,
  unionID,
  prCooperative,
  prCooperativeID,
  scope,
  setScope,
}) => {
  const [paidUpShare, setPaidUpShare] = useState([]);
  const [osLoan, setOsLoan] = useState([]);
  const [dataToEdit, setDataToEdit] = useState();
  const [accounts, setAccounts] = useState([]);
  const [accountFiltered, setAccountFiltered] = useState();
  const [osLoanFiltered, setOSLoanFiltered] = useState();
  const [paidupFiltered, setPaidupFiltered] = useState();

  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      role === "bankUser" || role === "bankReportViewer"
        ? await API.get("/paidUpShare/getPaidUpShares").then((res) =>
            setPaidUpShare(res.data)
          )
        : role === "unionUser" || role === "unionReportViewer"
        ? await API.get(`/paidUpShare/union/${unionID}`).then((res) =>
            setPaidUpShare(res.data)
          )
        : await API.get(`/paidUpShare/prCooperative/${prCooperativeID}`).then(
            (res) => setPaidUpShare(res.data)
          );
      role === "bankUser" || role === "bankReportViewer"
        ? await API.get("/osLoan/getosLoans").then((res) => setOsLoan(res.data))
        : role === "unionUser" || role === "unionReportViewer"
        ? await API.get(`/osLoan/getByUnionId/${unionID}`).then((res) =>
            setOsLoan(res.data)
          )
        : await API.get(`/osLoan/getByPrCooperativeId/${prCooperativeID}`).then(
            (res) => setOsLoan(res.data)
          );

      role === "bankUser" || role === "bankReportViewer"
        ? await API.get("/account/getaccounts").then((res) =>
            setAccounts(res.data)
          )
        : role === "unionUser" || role === "unionReportViewer"
        ? await API.get(`/account/getByUnionId/${unionID}`).then((res) =>
            setAccounts(res.data)
          )
        : await API.get(
            `/account/getByPrCooperativeId/${prCooperativeID}`
          ).then((res) => setAccounts(res.data));
    };
    fetchData();
  }, [role, unionID, prCooperativeID]);

  useEffect(() => {
    const filterAccount = accounts?.filter((item) =>
      scope?.option === "all"
        ? item
        : scope?.option === "union"
        ? item?.union !== null
        : scope?.option === "prCooperative" && item?.prCooperative !== null
    );
    setAccountFiltered(filterAccount);

    const filterPaidUp = paidUpShare?.filter((item) =>
      scope?.option === "all"
        ? item
        : scope?.option === "union"
        ? item?.union !== null
        : scope?.option === "prCooperative" && item?.prCooperative !== null
    );
    setPaidupFiltered(filterPaidUp);

    const filterOSLoan = osLoan?.filter((item) =>
      scope?.option === "all"
        ? item
        : scope?.option === "union"
        ? item?.union !== null
        : scope?.option === "prCooperative" && item?.prCooperative !== null
    );
    setOSLoanFiltered(filterOSLoan);
  }, [scope?.option, osLoan, paidUpShare, accounts]);

  // start
  const paidUpShareColumn = [
    {
      name: "Union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit: scope.option === "prCooperative",
    },
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
      omit: scope.option === "union",
    },
    {
      name: "Date Generated",
      selector: (row) => row.dateGenerated,
      sortable: true,
    },
    {
      name: "Paid Up Value",
      selector: (row) => row.paidUpValue,
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
  const osLoanColumn = [
    {
      name: "Union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit: scope.option === "prCooperative",
    },
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
      omit: scope.option === "union",
    },
    {
      name: "Date Generated",
      selector: (row) => row.dateGenerated,
      sortable: true,
    },
    {
      name: "OS Loan Value",
      selector: (row) => row.osLoanValue,
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

  const accountsColumn = [
    {
      name: "union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit: scope.option === "prCooperative",
      // role === "primaryCooperativeReportViewer" ||
      // role === "primaryCooperativeUser"
      //   ? true
      //   : false,
    },
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
      omit: scope.option === "union",
    },
    {
      name: "accountNumber",
      selector: (row) => row.accountNumber,
      sortable: true,
    },
    {
      name: "district",
      selector: (row) => row.district,
      sortable: true,
    },
    {
      name: "branch",
      selector: (row) => row.branch,
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
            activeTab === "revenue" && "active teal"
          } item   cursor-pointer`}
          onClick={() => setActiveTab("revenue")}
        >
          Revenue
        </span>
        <span
          className={`${
            activeTab === "cost" && "active teal"
          } item   cursor-pointer`}
          onClick={() => setActiveTab("cost")}
        >
          Cost
        </span>
        <span
          className={`${
            activeTab === "expense" && "active teal"
          } item cursor-pointer`}
          onClick={() => setActiveTab("expense")}
        >
          Expense
        </span>
        <span
          className={`${
            activeTab === "net income" && "active teal"
          } item cursor-pointer`}
          onClick={() => setActiveTab("net income")}
        >
          Net Income
        </span>
      </div>
      <div>
        <ReactDataTable
          data={
            activeTab === "net income"
              ? paidupFiltered
              : activeTab === "revenue"
              ? osLoanFiltered
              : accountFiltered
          }
          columns={
            activeTab === "net income"
              ? paidUpShareColumn
              : activeTab === "revenue"
              ? osLoanColumn
              : accountsColumn
          }
        />
      </div>
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
          dispatched={dispatched}
        />
      )}
    </div>
  );
};

export default IncomeStatementFilterMenu;
