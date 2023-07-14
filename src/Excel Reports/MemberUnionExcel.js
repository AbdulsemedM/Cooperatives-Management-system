import React, { useEffect, useState } from "react";
import { writeFile, utils } from "xlsx";
import { API } from "../utils/API";

const MemberUnionExcel = ({ toDate, data }) => {
  const [memberByUId, setUnionById] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await API.get(`/member/getMembers`).then((res) => setUnionById(res.data));
    };
    fetchData();
  }, []);
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
    ["", "", "", "Cooperative Bank of Oromia SC"],
    ["", "", "", "Cooperatives data by Member"],
    ["", "", "", `As of - `],
    [`Name of The Union - ${data[0]?.union?.name}`],
    [
      "No.",
      "Name of the PC",
      "Sector",
      "type",
      "Region",
      "Zone",
      "Woreda",
      "Kebele",
      "Total Members",
    ],
    ["", "", "", "", "", "", "", "", "Male", "Female", "Total"],
    ...data.map((row) => [
      ++i,
      row?.name,
      row?.sector?.name,
      row?.type?.typeName,
      row?.address?.region,
      row?.address?.zone,
      row?.address?.woreda,
      row?.address?.kebele,
      row?.no_Of_MaleMembers,
      row?.no_Of_FemaleMembers,
      row?.no_Of_MaleMembers + row?.no_Of_FemaleMembers,
    ]),
  ];

  const ws = utils.aoa_to_sheet(wsData);

  // Set style for column headers
  ws["A2"].s = columnHeaderStyle;
  ws["B2"].s = columnHeaderStyle;
  ws["C2"].s = columnHeaderStyle;

  // Merge rows 1 and 2 (A1:C2)
  ws["!merges"] = [
    { s: { r: 0, c: 3 }, e: { r: 0, c: 10 } },
    { s: { r: 1, c: 3 }, e: { r: 1, c: 10 } },
    { s: { r: 2, c: 3 }, e: { r: 2, c: 10 } },
    { s: { r: 3, c: 0 }, e: { r: 3, c: 10 } },
    { s: { r: 4, c: 0 }, e: { r: 5, c: 0 } },
    { s: { r: 4, c: 1 }, e: { r: 5, c: 1 } },
    { s: { r: 4, c: 2 }, e: { r: 5, c: 2 } },
    { s: { r: 4, c: 3 }, e: { r: 5, c: 3 } },
    { s: { r: 4, c: 4 }, e: { r: 5, c: 4 } },
    { s: { r: 4, c: 5 }, e: { r: 5, c: 5 } },
    { s: { r: 4, c: 6 }, e: { r: 5, c: 6 } },
    { s: { r: 4, c: 7 }, e: { r: 5, c: 7 } },
    { s: { r: 4, c: 8 }, e: { r: 4, c: 10 } },
  ]; // Merge cells A1:C2
  ws["A1"].s = columnHeaderStyle; // Apply style to merged cell

  // Convert worksheet to workbook
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");

  // Function to download the Excel file
  const handleExportExcel = () => {
    writeFile(wb, "Member for Union.xlsx", {
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

export default MemberUnionExcel;
