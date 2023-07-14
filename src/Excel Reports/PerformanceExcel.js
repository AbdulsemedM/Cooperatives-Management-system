import React from "react";
import { writeFile, utils } from "xlsx";

const PerformanceExcel = ({ toDate, data }) => {
  // let data = [];
  let i = 0;
  const columnHeaderStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } }, // bold font with white color
    fill: { fgColor: { rgb: "0074D9" } }, // blue fill color
    border: {
      // border properties
      top: { style: "thin", color: { rgb: "000000" } }, // thin border on top with black color
      bottom: { style: "thin", color: { rgb: "000000" } }, // thin border on bottom with black color
      left: { style: "thin", color: { rgb: "000000" } }, // thin border on left with black color
      right: { style: "thin", color: { rgb: "000000" } }, // thin border on right with black color
    },
  };

  const wsData = [
    ["", "", "Cooperative Bank of Oromia SC"],
    ["", "", "Cooperatives Performance at Coopbank"],
    ["", "", `As of - ${toDate}`],
    [
      "No.",
      "Name of the Cooperative",
      "Sector",
      "Type",
      "Region",
      "Zone",
      "Deposit Account",
      "Deposit Balance as at",
      "OS Loan balance at ",
      "Paid-up Capital",
    ],
    ...data.map((row) => [
      i++,
      row?.prCooperativeName,
      row?.sector?.name,
      row?.type?.typeName,
      row?.address?.region,
      row?.address?.zone,
      row?.accountInfos[0]?.accountNumber,
      row.accountInfos[0]?.accountBalances?.reduce(
        (accountBalanceSum, balance) => {
          return accountBalanceSum + balance.accountBalance;
        },
        0
      ),
      row.osLoans
        ?.filter((loan) => {
          const loanDate = new Date(loan.dateGenerated);
          return loanDate <= new Date(toDate);
        })
        .reduce((loanSum, loan) => {
          return loanSum + loan.osLoanValue;
        }, 0),
      row.paidUpShares
        ?.filter((paidUpShare) => {
          const paidUpShareDate = new Date(paidUpShare.dateGenerated);
          return paidUpShareDate <= new Date(toDate);
        })
        .reduce((paidUpSum, paidUp) => {
          return paidUpSum + paidUp.paidUpValue;
        }, 0),
    ]),
  ];

  const ws = utils.aoa_to_sheet(wsData);

  // Set style for column headers
  ws["A2"].s = columnHeaderStyle;
  ws["B2"].s = columnHeaderStyle;
  ws["C2"].s = columnHeaderStyle;

  // Merge rows 1 and 2 (A1:C2)
  ws["!merges"] = [
    { s: { r: 0, c: 2 }, e: { r: 0, c: 7 } },
    { s: { r: 1, c: 2 }, e: { r: 1, c: 7 } },
    { s: { r: 2, c: 2 }, e: { r: 2, c: 7 } },
  ]; // Merge cells A1:C2
  ws["A1"].s = columnHeaderStyle; // Apply style to merged cell

  // Convert worksheet to workbook
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");

  // Function to download the Excel file
  const handleExportExcel = () => {
    writeFile(wb, "Performance at CBO.xlsx", {
      bookType: "xlsx",
      bookSST: false,
    });
  };

  return (
    <div>
      <button
        className="ui basic button whitespace-nowrap"
        onClick={handleExportExcel}
      >
        <i className="download icon"></i>
        <span className="hidden md:inline-block">Excel Export</span>
      </button>
    </div>
  );
};

export default PerformanceExcel;
