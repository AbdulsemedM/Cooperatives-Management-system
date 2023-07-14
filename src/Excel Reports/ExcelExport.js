import React from "react";
import { writeFile, utils } from "xlsx";

const ExcelExport = ({
  fromDate,
  toDate,
  atDate,
  activeTab,
  extendedPrCData,
  extendedUnionData,
}) => {
  fromDate = fromDate ? fromDate : "1000-01-01";
  let data = activeTab === "union" ? extendedUnionData : extendedPrCData;
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

  // const data = [
  //   { no: 1, male: 44, female: 66, total: 100 },
  //   { no: 2, male: 64, female: 66, total: 130 },
  // ];

  const wsData = [
    [
      "S.no",
      "Name of the Cooperative Union",
      "Address",
      "",
      "",
      "",
      "",
      "",
      "Type",
      "Main Business Sector Engaged",
      "Major Commodities Grown, Traded or Manufactured",
      "Number of Member PC",
      "",
      "",
      "Number  of Individual Members",
      "",
      "",
      "Account Number at Coopbank",
      "District",
      "Branch",
      `Account Balance as at ${toDate}`,
      "Year of establishment",
      "Member up on  Establishment",
      "",
      "",
      "Share Capital up-on establishment",
      `Annual turnover as at ${toDate}`,
      `Total Asset as at ${toDate}`,
      `Total liability as at ${toDate}`,
      "List of  fixed asset",
      `Average Account Balance from ${fromDate} to ${toDate}`,
      `Paid Up Share Capital at coopbannk as at ${toDate}`,
      `OS loan as at ${toDate}`,
    ],
    [
      "",
      "",
      "Region",
      "Zone",
      "Woreda",
      "Town",
      "Kebele",
      "Telephone number",
      "",
      "",
      "",
      "Active",
      "Non active",
      "Total",
      "Male",
      "Female",
      "Total",
      "",
      "",
      "",
      "",
      "",
      "Male",
      "Female",
      "Total",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    ...data?.map((row) => [
      i++,
      row.unionName ? row.unionName : row?.prCooperativeName,
      row.address?.region,
      row.address?.zone,
      row.address?.woreda,
      row.address?.town,
      row.address?.kebele,
      row.address?.phoneNumber,
      row.type?.typeName,
      row.sector?.name,
      row.commodities?.map((item) => item?.commodityName).join(", "),
      row.no_of_ActivePrCooperatives ? row.no_of_ActivePrCooperatives : null,
      row.no_of_Non_ActivePrCooperatives
        ? row.no_of_Non_ActivePrCooperatives
        : null,
      row.total_No_of_PrCooperatives ? row.total_No_of_PrCooperatives : null,
      row.no_of_Male_Individual_Member
        ? row.no_of_Male_Individual_Member
        : row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
            ?.no_Of_MaleMembers,
      row.no_of_Female_Individual_Member
        ? row.no_of_Female_Individual_Member
        : row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
            ?.no_Of_FemaleMembers,
      row.total_no_of_Individual_Member
        ? row.total_no_of_Individual_Member
        : row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
            ?.no_Of_FemaleMembers +
          row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
            ?.no_Of_MaleMembers,
      row.accountInfos[0]?.accountNumber,
      row.accountInfos[0]?.district,
      row.accountInfos[0]?.branch,
      row.accountInfos[0]?.accountBalances?.reduce(
        (accountBalanceSum, balance) => {
          return accountBalanceSum + balance.accountBalance;
        },
        0
      ),
      row.yearOfStablishment,
      row.no_of_Male_Stablishing_Member
        ? row.no_of_Male_Stablishing_Member
        : row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
            ?.maleMembersUpOnEstablishement,
      row.no_of_Female_Stablishing_Member
        ? row.no_of_Female_Stablishing_Member
        : row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
            ?.femaleMembersUpOnEstablishement,
      row.no_of_Total_Stablishing_Member
        ? row.no_of_Total_Stablishing_Member
        : row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
            ?.femaleMembersUpOnEstablishement +
          row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
            ?.maleMembersUpOnEstablishement,
      row.shareCapitalUponEstablishmnet,
      row.annualTurnOvers
        ?.filter((turnover) => {
          const turnoverDate = new Date(turnover.dateGenerated);
          return (
            turnoverDate >= new Date(fromDate) &&
            turnoverDate <= new Date(toDate)
          );
        })
        .reduce((turnoverSum, turnover) => {
          return turnoverSum + turnover.annualTurnOverValue;
        }, 0),
      row.assets?.reduce((assetsSum, asset) => {
        return assetsSum + asset.value;
      }, 0),
      row.liabilities
        ?.filter((liabilities) => {
          const liabilitiesDate = new Date(liabilities.dateGenerated);
          return (
            liabilitiesDate >= new Date(fromDate) &&
            liabilitiesDate <= new Date(toDate)
          );
        })
        .reduce((assetsSum, asset) => {
          return assetsSum + asset.liabilityValue;
        }, 0),
      row.assets?.map((item) => item?.assetName).join(", "),
      row.accountInfos[0]?.accountBalances
        ?.filter((accountBalances) => {
          const accountBalancesDate = new Date(accountBalances.dateGenerated);
          return (
            accountBalancesDate >= new Date(fromDate) &&
            accountBalancesDate <= new Date(toDate)
          );
        })
        .reduce((accountBalanceSum, balance) => {
          return accountBalanceSum + balance.accountBalance;
        }, 0),
      row.paidUpShares
        ?.filter((paidUpShare) => {
          const paidUpShareDate = new Date(paidUpShare.dateGenerated);
          return (
            paidUpShareDate >= new Date(fromDate) &&
            paidUpShareDate <= new Date(toDate)
          );
        })
        .reduce((paidUpSum, paidUp) => {
          return paidUpSum + paidUp.paidUpValue;
        }, 0),
      row.osLoans
        ?.filter((loan) => {
          const loanDate = new Date(loan.dateGenerated);
          return loanDate >= new Date(fromDate) && loanDate <= new Date(toDate);
        })
        .reduce((loanSum, loan) => {
          return loanSum + loan.osLoanValue;
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
    { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
    { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
    { s: { r: 0, c: 2 }, e: { r: 0, c: 7 } },
    { s: { r: 0, c: 8 }, e: { r: 1, c: 8 } },
    { s: { r: 0, c: 9 }, e: { r: 1, c: 9 } },
    { s: { r: 0, c: 10 }, e: { r: 1, c: 10 } },
    { s: { r: 0, c: 11 }, e: { r: 0, c: 13 } },
    { s: { r: 0, c: 14 }, e: { r: 0, c: 16 } },
    { s: { r: 0, c: 17 }, e: { r: 1, c: 17 } },
    { s: { r: 0, c: 18 }, e: { r: 1, c: 18 } },
    { s: { r: 0, c: 19 }, e: { r: 1, c: 19 } },
    { s: { r: 0, c: 20 }, e: { r: 1, c: 20 } },
    { s: { r: 0, c: 21 }, e: { r: 1, c: 21 } },
    { s: { r: 0, c: 22 }, e: { r: 0, c: 24 } },
    { s: { r: 0, c: 25 }, e: { r: 1, c: 25 } },
    { s: { r: 0, c: 26 }, e: { r: 1, c: 26 } },
    { s: { r: 0, c: 27 }, e: { r: 1, c: 27 } },
    { s: { r: 0, c: 28 }, e: { r: 1, c: 28 } },
    { s: { r: 0, c: 29 }, e: { r: 1, c: 29 } },
    { s: { r: 0, c: 30 }, e: { r: 1, c: 30 } },
    { s: { r: 0, c: 31 }, e: { r: 1, c: 31 } },
    { s: { r: 0, c: 32 }, e: { r: 1, c: 32 } },
  ]; // Merge cells A1:C2
  ws["A1"].s = columnHeaderStyle; // Apply style to merged cell

  // Convert worksheet to workbook
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");

  // Function to download the Excel file
  const handleExportExcel = () => {
    writeFile(wb, "members.xlsx", { bookType: "xlsx", bookSST: false });
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

export default ExcelExport;
