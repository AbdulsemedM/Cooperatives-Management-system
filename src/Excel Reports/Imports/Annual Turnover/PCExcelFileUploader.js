import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Input } from "semantic-ui-react";
import moment from "moment";

const PCExcelFileUploader = ({ onDataUpload, prCooperative }) => {
  // eslint-disable-next-line
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setExcelData(jsonData);

      // Find the desired column index in the first row
      const firstRow = jsonData[0];
      const PCNameIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "union Name".toLowerCase()
      );

      const annualTurnovervalueIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Annual Turnover value".toLowerCase()
      );
      // const dateGeneratedIndex = firstRow.findIndex(
      //   (cell) => cell?.toLowerCase() === "Date Generated".toLowerCase()
      // );
      // const branchIndex = firstRow.findIndex(
      //   (cell) => cell?.toLowerCase() === "Branch".toLowerCase()
      // );

      const mappedData = jsonData
        .slice(1) // Exclude the first row
        .map((row) => ({
          annualTurnOverValue:
            typeof row[annualTurnovervalueIndex] === "number"
              ? row[annualTurnovervalueIndex]
              : 0,
          // dateGenerated: moment("30/6/2022", "D/M/YYYY")
          //   .toDate()
          //   ?.toISOString()
          //   ?.split("T")[0],
          union: row[PCNameIndex]?.length
            ? {
                unionId: prCooperative
                  ?.filter((item) =>
                    item?.name
                      ?.toLowerCase()
                      .includes(row[PCNameIndex]?.toLowerCase())
                  )
                  .map((item) => item)[0]?.unionId,
              }
            : null,
          dateGenerated: moment("30/6/2022", "D/M/YYYY")
            .toDate()
            ?.toISOString()
            ?.split("T")[0],
          // branch: row[branchIndex]?.length ? row[branchIndex] : null,
        }));
      onDataUpload(mappedData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Input
      type="file"
      className="flex w-full h-40"
      onChange={handleFileUpload}
    />
  );
};

export default PCExcelFileUploader;
