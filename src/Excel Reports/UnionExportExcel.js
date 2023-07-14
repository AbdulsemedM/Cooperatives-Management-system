import React from "react";
import { writeFile, utils } from "xlsx";

const UnionExportExcel = ({ toDate, data, forCoop }) => {
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
    ["", "", `${forCoop ? "Primary Cooperatives" : "Cooperative unions"}`],
    [
      "No.",
      `${forCoop ? "Name of the PC" : "Name of the Union"}`,
      "Sector",
      "Type",
      "Region",
      "Zone",
      "Woreda",
      "Kebele",
      "Phone Number",
      "Email",
      "Date of Establishment",
      "Capital Upon Establishment",
    ],
    ...data?.map((row) => [
      ++i,
      row?.name,
      row?.sector?.name,
      row?.type?.typeName,
      row?.address?.region,
      row?.address?.zone,
      row?.address?.woreda,
      row?.address?.kebele,
      row?.address?.phoneNumber,
      row?.address?.email,
      row?.dateOfEstablishmnet,
      row?.shareCapitalUponEstablishmnet,
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
  ]; // Merge cells A1:C2
  ws["A1"].s = columnHeaderStyle; // Apply style to merged cell

  // Convert worksheet to workbook
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");

  // Function to download the Excel file
  const handleExportExcel = () => {
    writeFile(wb, `${forCoop ? "Primary Cooperatives.xlsx" : "unions.xlsx"}`, {
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

export default UnionExportExcel;
