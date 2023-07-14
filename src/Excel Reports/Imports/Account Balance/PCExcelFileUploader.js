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
      const accountNumberIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Account Number".toLowerCase()
      );

      const accountBalanceIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Account Balance".toLowerCase()
      );
      // const districtIndex = firstRow.findIndex(
      //   (cell) => cell?.toLowerCase() === "District".toLowerCase()
      // );
      // const branchIndex = firstRow.findIndex(
      //   (cell) => cell?.toLowerCase() === "Branch".toLowerCase()
      // );

      const mappedData = jsonData
        .slice(1) // Exclude the first row
        .map((row) => ({
          accountBalance:
            typeof row[accountBalanceIndex] === "number"
              ? row[accountBalanceIndex]
              : 0,
          dateGenerated: moment("30/6/2022", "D/M/YYYY")
            .toDate()
            ?.toISOString()
            ?.split("T")[0],
          account: row[accountNumberIndex]
            ? {
                accountId: prCooperative
                  ?.filter((item) =>
                    item?.accountNumber?.includes(
                      row[accountNumberIndex]
                    )
                  )
                  .map((item) => item)[0]?.accountId,
              }
            : null,
          // district: row[districtIndex]?.length ? row[districtIndex] : null,
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
