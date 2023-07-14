import React, { useState } from "react";
import ReactDataTable from "../../containers/DataTable";
import BarChart1 from "../Charts/BarChart";
// import { dataTry } from "../../tryData";
// import { unionFakeData } from "../../tryData";
// import { prFakeData } from "../../tryData";

const CapitalFilterMenu = ({
  activeTab,
  setActiveTab,
  fromDate,
  toDate,
  union,
  prCooperative,
  extendedUnionData,
  extendedPrCData,
  loading,
  // role,
  // unionID,
  // prCooperativeID,
}) => {
  const [isMemberData, setIsMemberData] = useState(true);
  // const data = Zonal_Data

  // start column

  const performance_at_CBO = [
    {
      name: "Name of the Cooperative",
      selector: (row) => row?.prCooperativeName,
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
      name: "Deposit Account",
      selector: (row) => row?.accountInfos[0]?.accountNumber,
      sortable: true,
    },
    {
      name: "Account Balance as at ",
      selector: (row) =>
        row.accountInfos[0]?.accountBalances
          ?.reduce((accountBalanceSum, balance) => {
            return accountBalanceSum + balance.accountBalance;
          }, 0)
          ?.toLocaleString(),
      sortable: true,
    },
    {
      name: "OS Loan balance as at ",
      selector: (row) =>
        row.osLoans
          ?.filter((loan) => {
            const loanDate = new Date(loan.dateGenerated);
            return (
              loanDate >= new Date(fromDate || "1000-01-01") &&
              loanDate <= new Date(toDate)
            );
          })
          .reduce((loanSum, loan) => {
            return loanSum + loan.osLoanValue;
          }, 0)
          ?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Paid-up capital",
      selector: (row) =>
        row.paidUpShares
          ?.filter((paidUpShare) => {
            const paidUpShareDate = new Date(paidUpShare.dateGenerated);
            return (
              paidUpShareDate >= new Date(fromDate || "1000-01-01") &&
              paidUpShareDate <= new Date(toDate)
            );
          })
          .reduce((paidUpSum, paidUp) => {
            return paidUpSum + paidUp.paidUpValue;
          }, 0)
          ?.toLocaleString(),
      sortable: true,
    },
  ];

  const summary_Union_Report = [
    {
      name: "Union Name",
      selector: (row) => row?.unionName,
      sortable: true,
      omit: activeTab === "prCooperative" ? true : false,
    },
    {
      name: "Primary Cooperative Name",
      selector: (row) => row?.prCooperativeName,
      sortable: true,
      omit: activeTab === "prCooperative" ? false : true,
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
      name: "Woreda",
      selector: (row) => row?.address?.woreda,
      sortable: true,
    },
    {
      name: "Town",
      selector: (row) => row?.address?.town,
      sortable: true,
    },
    {
      name: "Kebele",
      selector: (row) => row?.address?.kebele,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row?.address?.phoneNumber,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row?.type?.typeName,
      sortable: true,
    },
    {
      name: "Sector",
      selector: (row) => row?.sector?.name,
      sortable: true,
    },
    {
      name: "Major Commodities",
      selector: (row) =>
        row.commodities?.map((item) => item?.commodityName).join(", "),
      sortable: true,
    },
    {
      name: "Active PC Member",
      selector: (row) => row?.no_of_ActivePrCooperatives?.toLocaleString(),
      sortable: true,
      omit: activeTab === "prCooperative" ? true : false,
    },
    {
      name: "Non Active PC Member",
      selector: (row) => row?.no_of_Non_ActivePrCooperatives?.toLocaleString(),
      sortable: true,
      omit: activeTab === "prCooperative" ? true : false,
    },
    {
      name: "Total",
      selector: (row) =>
        row?.no_of_Non_ActivePrCooperatives +
        row?.no_of_ActivePrCooperatives?.toLocaleString(),
      sortable: true,
      omit: activeTab === "prCooperative" ? true : false,
    },
    {
      name: "Male Members",
      selector: (row) =>
        activeTab === "prCooperative"
          ? row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative?.no_Of_MaleMembers?.toLocaleString()
          : row?.no_of_Male_Individual_Member?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Female Members",
      selector: (row) =>
        activeTab === "prCooperative"
          ? row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative?.no_Of_FemaleMembers?.toLocaleString()
          : row?.no_of_Female_Individual_Member?.toLocaleString(),

      sortable: true,
    },
    {
      name: "Total",
      selector: (row) =>
        activeTab === "prCooperative"
          ? (
              row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
                ?.no_Of_MaleMembers +
              row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
                ?.no_Of_FemaleMembers
            ).toLocaleString()
          : row?.no_of_Male_Individual_Member +
            row?.no_of_Female_Individual_Member,
      sortable: true,
    },
    {
      name: "Account No",
      selector: (row) => row?.accountInfos[0]?.accountNumber,
      sortable: true,
    },
    {
      name: "District",
      selector: (row) => row?.accountInfos[0]?.district,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row?.accountInfos[0]?.branch,
      sortable: true,
    },
    {
      name: "Account Balance at ",
      selector: (row) =>
        row.accountInfos[0]?.accountBalances
          ?.reduce((accountBalanceSum, balance) => {
            return accountBalanceSum + balance.accountBalance;
          }, 0)
          ?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Year of Establishment",
      selector: (row) => row?.yearOfStablishment,
      sortable: true,
    },
    {
      name: "Male Members Up on Establishment",
      selector: (row) =>
        activeTab === "prCooperative"
          ? row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative?.maleMembersUpOnEstablishement?.toLocaleString()
          : row?.no_of_Male_Stablishing_Member?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Female Members Up on Establishment",
      selector: (row) =>
        activeTab === "prCooperative"
          ? row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative?.femaleMembersUpOnEstablishement?.toLocaleString()
          : row?.no_of_Female_Stablishing_Member?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) =>
        activeTab === "prCooperative"
          ? (
              row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
                ?.femaleMembersUpOnEstablishement +
              row?.accountInfos[0]?.accountBalances[0]?.account?.prCooperative
                ?.maleMembersUpOnEstablishement
            ).toLocaleString()
          : row?.no_of_Total_Stablishing_Member?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Share Capital Upon Establishment",
      selector: (row) => row?.shareCapitalUponEstablishmnet?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Annual Turnover at ",
      selector: (row) =>
        row.annualTurnOvers
          ?.filter((turnover) => {
            const turnoverDate = new Date(turnover.dateGenerated);
            return (
              turnoverDate >= new Date(fromDate || "1000-01-01") &&
              turnoverDate <= new Date(toDate)
            );
          })
          .reduce((turnoverSum, turnover) => {
            return turnoverSum + turnover.annualTurnOverValue;
          }, 0)
          ?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Total Asset at ",
      selector: (row) =>
        row.assets
          ?.reduce((assetsSum, asset) => {
            return assetsSum + asset.value;
          }, 0)
          ?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Total Liability at ",
      selector: (row) =>
        row.liabilities
          ?.filter((liabilities) => {
            const liabilitiesDate = new Date(liabilities.dateGenerated);
            return (
              liabilitiesDate >= new Date(fromDate || "1000-01-01") &&
              liabilitiesDate <= new Date(toDate)
            );
          })
          .reduce((assetsSum, asset) => {
            return assetsSum + asset.liabilityValue;
          }, 0)
          ?.toLocaleString(),
      sortable: true,
    },
    {
      name: "List of Fixed asset",
      selector: (row) => row.assets?.assetName,
      sortable: true,
    },
    {
      name: "Average account balance from _ to _ ",
      selector: (row) =>
        row.accountInfos[0]?.accountBalances
          ?.filter((accountBalances) => {
            const accountBalancesDate = new Date(accountBalances.dateGenerated);
            return (
              accountBalancesDate >= new Date(fromDate || "1000-01-01") &&
              accountBalancesDate <= new Date(toDate)
            );
          })
          .reduce((accountBalanceSum, balance) => {
            return accountBalanceSum + balance.accountBalance;
          }, 0)
          ?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Paid up share capital at ",
      selector: (row) =>
        row.paidUpShares
          ?.filter((paidUpShare) => {
            const paidUpShareDate = new Date(paidUpShare.dateGenerated);
            return (
              paidUpShareDate >= new Date(fromDate || "1000-01-01") &&
              paidUpShareDate <= new Date(toDate)
            );
          })
          .reduce((paidUpSum, paidUp) => {
            return paidUpSum + paidUp.paidUpValue;
          }, 0)
          ?.toLocaleString(),
      sortable: true,
    },
    {
      name: "OS Loan at ",
      selector: (row) =>
        row.osLoans
          ?.filter((loan) => {
            const loanDate = new Date(loan.dateGenerated);
            return (
              loanDate >= new Date(fromDate || "1000-01-01") &&
              loanDate <= new Date(toDate)
            );
          })
          .reduce((loanSum, loan) => {
            return loanSum + loan.osLoanValue;
          }, 0)
          ?.toLocaleString(),
      sortable: true,
    },
  ];

  const Zonal_Capital_Data = [
    {
      name: "Arsi",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Arsi"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "Arsi").length,
      //   amt: 2400
    },
    {
      name: "Bale",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Bale"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "Bale").length,
      //   amt: 2210
    },
    {
      name: "EBale",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "East Bale"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "East Bale")
        .length,
      //   amt: 2290
    },
    {
      name: "Borena",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Borena"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "Borena")
        .length,
      //   amt: 2000
    },
    {
      name: "BBedele",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Buno Bedele"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "Buno Bedele")
        .length,
      //   amt: 2181
    },
    {
      name: "EHararghe",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "East Hararghe"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "East Hararghe")
        .length,
      //   amt: 2500
    },
    {
      name: "EShoa",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "East Shoa"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "East Shoa")
        .length,
      //   amt: 2100
    },
    {
      name: "EWollega",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "East Wollega"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "East Wollega")
        .length,
      //   amt: 2100
    },
    {
      name: "Guji",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "East Guji"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "East Guji")
        .length,
      //   amt: 2100
    },
    {
      name: "HGWollega",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Horo Guduru Wollega"
      ).length,
      Unions: union?.filter(
        (union) => union?.address?.zone === "Horo Guduru Wollega"
      ).length,
      //   amt: 2100
    },
    {
      name: "Illu",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Ilu Aba Bora"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "Ilu Aba Bora")
        .length,
      //   amt: 2100
    },
    {
      name: "Jimma",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Jimma"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "Jimma").length,
      //   amt: 2100
    },
    {
      name: "KWollega",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Qelam Wollega"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "Qalem Wollega")
        .length,
      //   amt: 2100
    },
    {
      name: "NShoa",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "North Shoa"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "North Shoa")
        .length,
      //   amt: 2100
    },
    {
      name: "SwShoa",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Southwest Shoa"
      ).length,
      Unions: union?.filter(
        (union) => union?.address?.zone === "Southwest Shoa"
      ).length,
      //   amt: 2100
    },
    {
      name: "WArsi",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "West Arsi"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "West Arsi")
        .length,
      //   amt: 2100
    },
    {
      name: "WGuji",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "West Guji"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "West Guji")
        .length,
      //   amt: 2100
    },
    {
      name: "WHararghe",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "West Hararghe"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "West Hararghe")
        .length,
      //   amt: 2100
    },
    {
      name: "WShoa",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "West Shoa"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "West Shoa")
        .length,
      //   amt: 2100
    },
    {
      name: "WWollega",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "West Wollega"
      ).length,
      Unions: union?.filter((union) => union?.address?.zone === "West Wollega")
        .length,
      //   amt: 2100
    },
    {
      name: "AdamaSZ",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Adama Special Zone"
      ).length,
      Unions: union?.filter(
        (union) => union?.address?.zone === "Adama Special Zone"
      ).length,
      //   amt: 2100
    },
    {
      name: "JimmaSZ",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Jimma Special Zone"
      ).length,
      Unions: union?.filter(
        (union) => union?.address?.zone === "Jimma Special Zone"
      ).length,
      //   amt: 2100
    },
    {
      name: "OSZSFinfinne",
      Pr_Cooperatives: prCooperative.filter(
        (pr) => pr?.address?.zone === "Oromia Special Zone Surrounding Finfinne"
      ).length,
      Unions: union?.filter(
        (union) =>
          union?.address?.zone === "Oromia Special Zone Surrounding Finfinne"
      ).length,
      //   amt: 2100
    },
  ];

  const Zonal_Member_Data = [
    {
      name: "Arsi",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "Arsi")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "Arsi")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, osLoan) => acc + osLoan?.osLoanValue, 0),
          0
        ),
      //   amt: 2400
    },
    {
      name: "Bale",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "Bale")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "Bale")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2210
    },
    {
      name: "EBale",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "East Bale")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "East Bale")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2290
    },
    {
      name: "Borena",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "Borena")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "Borena")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2000
    },
    {
      name: "BBedele",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "Buno Bedele")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "Buno Bedele")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2181
    },
    {
      name: "EHararghe",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "East Hararghe")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "East Hararghe")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2500
    },
    {
      name: "EShoa",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "East Shoa")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "East Shoa")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "EWollega",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "East Wollega")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "East Wollega")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "Guji",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "East Guji")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "East Guji")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "HGWollega",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "Horo Guduru Wollega")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "Horo Guduru Wollega")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "Illu",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "Ilu Aba Bora")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "Ilu Aba Bora")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "Jimma",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "Jimma")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "Jimma")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "KWollega",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "Qelam Wollega")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "Qelam Wollega")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "NShoa",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "North Shoa")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "North Shoa")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "SwShoa",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "Southwest Shoa")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "Southwest Shoa")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "WArsi",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "West Arsi")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "West Arsi")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "WGuji",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "West Guji")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "West Guji")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "WHararghe",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "West Hararghe")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "West Hararghe")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "WShoa",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "West Shoa")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "West Shoa")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "WWollega",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "West Wollega")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "West Wollega")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "Adama Special Zone",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "Adama Special Zone")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "Adama Special Zone")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "JimmaSZ",
      PaidUpShare: extendedUnionData
        .filter((item) => item.address?.zone === "Jimma Special Zone")
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter((item) => item.address?.zone === "Jimma Special Zone")
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
    {
      name: "OSZSFinfinne",
      PaidUpShare: extendedUnionData
        .filter(
          (item) =>
            item.address?.zone === "Oromia Special Zone Surrounding Finfinne"
        )
        .reduce(
          (sum, item) =>
            sum +
            item.paidUpShares?.reduce(
              (acc, paidUp) => acc + paidUp?.paidUpValue,
              0
            ),
          0
        ),
      Loan: extendedUnionData
        .filter(
          (item) =>
            item.address?.zone === "Oromia Special Zone Surrounding Finfinne"
        )
        .reduce(
          (sum, item) =>
            sum +
            item.osLoans?.reduce((acc, paidUp) => acc + paidUp?.osLoanValue, 0),
          0
        ),
      //   amt: 2100
    },
  ];

  // end

  return (
    <div className="mx-5">
      <div className="ui secondary pointing menu">
        <span
          className={`${
            activeTab === "union" && "active teal"
          } item   cursor-pointer`}
          onClick={() => {
            setActiveTab("union");
            setIsMemberData(true);
          }}
        >
          Unions
        </span>
        <span
          className={`${
            activeTab === "prCooperative" && "active teal"
          } item cursor-pointer`}
          onClick={() => {
            setActiveTab("prCooperative");
            setIsMemberData(false);
          }}
        >
          Primary Cooperatives
        </span>
        <span
          className={`${
            activeTab === "performanceatCBO" && "active teal"
          } item cursor-pointer`}
          onClick={() => {
            setActiveTab("performanceatCBO");
            setIsMemberData(false);
          }}
        >
          Performance at CBO
        </span>
      </div>
      {(activeTab === "union" || activeTab === "prCooperative") && (
        <BarChart1
          isMemberData={isMemberData}
          data={activeTab !== "union" ? Zonal_Member_Data : Zonal_Capital_Data}
        />
      )}
      <div className="mt-5 border">
        <ReactDataTable
          data={activeTab === "union" ? extendedUnionData : extendedPrCData}
          // data={dataTry}
          columns={
            activeTab === "union" || activeTab === "prCooperative"
              ? summary_Union_Report
              : activeTab === "performanceatCBO" && performance_at_CBO
          }
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CapitalFilterMenu;
