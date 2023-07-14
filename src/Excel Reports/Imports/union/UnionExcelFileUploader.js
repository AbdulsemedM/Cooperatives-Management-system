import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Input } from "semantic-ui-react";
import moment from "moment/moment";

const UnionExcelFileUploader = ({ onDataUpload, type, sector }) => {
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
        (cell) => cell?.toLowerCase() === "Union Name".toLowerCase()
      );
      const TypeIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Type".toLowerCase()
      );
      const SectorIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Sector".toLowerCase()
      );
      const RegionIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Region".toLowerCase()
      );
      const ZoneIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Zone".toLowerCase()
      );
      const WoredaIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Woreda".toLowerCase()
      );
      const TownIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Town".toLowerCase()
      );
      const KebeleIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Kebele".toLowerCase()
      );
      const EmailIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Email".toLowerCase()
      );
      const phonNumberIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Phone Number".toLowerCase()
      );
      const shareCapitalIndex = firstRow.findIndex(
        (cell) =>
          cell?.toLowerCase() ===
          "Share Capital Upon Establishment".toLowerCase()
      );
      const dateOfEstablishmentIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Date of Establishment".toLowerCase()
      );
      // const licensingOrganIndex = firstRow.findIndex(
      //   (cell) => cell?.toLowerCase() === "Licensing Organ".toLowerCase()
      // );

      const mappedData = jsonData
        .slice(1) // Exclude the first row
        .map((row) => ({
          // typeName: row[desiredIndex],
          name: row[PCNameIndex],
          dateOfEstablishmnet: moment(row[dateOfEstablishmentIndex], "M/D/YYYY")
            .toDate()
            ?.toISOString()
            ?.split("T")[0],
          shareCapitalUponEstablishmnet:
            typeof row[shareCapitalIndex] === "number"
              ? row[shareCapitalIndex]
              : 0,
          isActive: true,
          address: {
            region: row[RegionIndex],
            zone: row[ZoneIndex],
            woreda: row[WoredaIndex],
            town: row[TownIndex],
            kebele: row[KebeleIndex],
            email: row[EmailIndex],
            phoneNumber: row[phonNumberIndex],
          },
          type: row[TypeIndex]?.length
            ? {
                typeId: type
                  ?.filter(
                    (item) =>
                      item?.typeName?.toLowerCase() ===
                      row[TypeIndex]?.toLowerCase()
                  )
                  .map((item) => item)[0]?.typeId,
              }
            : null,
          sector: row[SectorIndex]?.length
            ? {
                sectorId: sector
                  ?.filter(
                    (item) =>
                      item?.name?.toLowerCase() ===
                      row[SectorIndex]?.toLowerCase()
                  )
                  .map((item) => item)[0]?.sectorId,
              }
            : null,
          federations: {
            federationId: 1,
          },
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

export default UnionExcelFileUploader;
