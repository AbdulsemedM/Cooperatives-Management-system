import React from "react";
import { writeFile, utils, WorkBook } from "xlsx";

const ExcelExport = () => {
  const data = [
    { no: 1, male: 44, female: 66, total: 100 },
    { no: 2, male: 64, female: 66, total: 130 },
  ];

  const wsData = [
    ["no", "Members", "", "", "", ""],
    ["", "Male", "Female", "Total", "", ""],
    ...data.map((row) => [
      row.no,
      row.male,
      row.female,
      row.total,
      "", // Add additional cells as needed
      "",
    ]),
  ];

  const ws = {};
  const wsName = "Sheet1";
  ws[wsName] = utils.aoa_to_sheet(wsData);

  // Set column width
  const wscols = [{ wch: 5 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
  ws[wsName]["!cols"] = wscols;

  // Generate Excel file
  const wb = { SheetNames: [wsName], Sheets: ws };
  const wbout = writeFile(wb, { bookType: "xlsx", type: "binary" }); // Change type to "binary"

  // Download Excel file
  const downloadExcelFile = () => {
    const fileName = "report.xlsx";
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" }); // Convert to ArrayBuffer

    if (navigator.msSaveBlob) {
      // For IE
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // Feature detection
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  // Utility function to convert binary string to ArrayBuffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  return (
    <div>
      <h1>Excel Export Example</h1>
      <button onClick={downloadExcelFile}>Download Excel</button>
    </div>
  );
};

export default ExcelExport;
