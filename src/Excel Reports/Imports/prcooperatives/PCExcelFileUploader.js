import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Input } from "semantic-ui-react";
import moment from "moment/moment";

const PCExcelFileUploader = ({ onDataUpload, sector, type, union }) => {
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
        (cell) => cell?.toLowerCase() === "PC Name".toLowerCase()
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
      const maleMemberIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Male Member".toLowerCase()
      );
      const femaleMemberIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Female Member".toLowerCase()
      );
      const maleEstablishmentMemberIndex = firstRow.findIndex(
        (cell) =>
          cell?.toLowerCase() === "Male Establishment Member".toLowerCase()
      );
      const femaleEstablishmentMemberIndex = firstRow.findIndex(
        (cell) =>
          cell?.toLowerCase() === "Female Establishment Member".toLowerCase()
      );
      const jobOpportunityIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Job Opportunity".toLowerCase()
      );
      const shareCapitalIndex = firstRow.findIndex(
        (cell) =>
          cell?.toLowerCase() ===
          "Share Capital Upon Establishment".toLowerCase()
      );
      const dateOfEstablishmentIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Date of Establishment".toLowerCase()
      );
      const unionIndex = firstRow.findIndex(
        (cell) => cell?.toLowerCase() === "Union Name".toLowerCase()
      );

      const mappedData = jsonData
        .slice(1) // Exclude the first row
        .map((row) => ({
          // typeName: row[desiredIndex],
          name: row[PCNameIndex],
          dateOfEstablishmnet:
            // row[dateOfEstablishmentIndex] &&
            moment([dateOfEstablishmentIndex], "D/M/YYYY").toISOString() &&
            moment(row[dateOfEstablishmentIndex], "D/M/YYYY")
              .toDate()
              ?.toISOString()
              ?.split("T")[0],
          shareCapitalUponEstablishmnet:
            typeof row[shareCapitalIndex] === "number"
              ? row[shareCapitalIndex]
              : 0,
          isActive: true,
          no_Of_MaleMembers:
            typeof row[maleMemberIndex] === "number" ? row[maleMemberIndex] : 0,
          no_Of_FemaleMembers: row[femaleMemberIndex]
            ? row[femaleMemberIndex]
            : 0,
          maleMembersUpOnEstablishement:
            typeof row[maleEstablishmentMemberIndex] === "number"
              ? row[maleEstablishmentMemberIndex]
              : 0,
          femaleMembersUpOnEstablishement:
            typeof row[femaleEstablishmentMemberIndex] === "number"
              ? row[femaleEstablishmentMemberIndex]
              : 0,
          jobOpportunityCreated:
            typeof row[jobOpportunityIndex] === "number"
              ? row[jobOpportunityIndex]
              : 0,
          address: {
            region: row[RegionIndex] ? row[RegionIndex] : null,
            zone: row[ZoneIndex] ? row[ZoneIndex] : null,
            woreda: row[WoredaIndex] ? row[WoredaIndex] : null,
            town: row[TownIndex] ? row[TownIndex] : null,
            kebele: row[KebeleIndex] ? row[KebeleIndex] : null,
            email: row[EmailIndex] ? row[EmailIndex] : null,
            phoneNumber: row[phonNumberIndex] ? row[phonNumberIndex] : null,
          },
          type: row[TypeIndex]?.length
            ? {
                typeId: type
                  ?.filter((item) =>
                    item?.typeName
                      ?.toLowerCase()
                      .includes(row[TypeIndex]?.toLowerCase())
                  )
                  .map((item) => item)[0]?.typeId,
              }
            : null,
          sector: row[SectorIndex]?.length
            ? {
                sectorId: sector
                  ?.filter((item) =>
                    item?.name
                      ?.toLowerCase()
                      .includes(row[SectorIndex]?.toLowerCase())
                  )
                  .map((item) => item)[0]?.sectorId,
              }
            : null,
          union: row[unionIndex]?.length
            ? {
                unionId: union
                  ?.filter((item) =>
                    item?.name
                      ?.toLowerCase()
                      .includes(row[unionIndex]?.toLowerCase())
                  )
                  .map((item) => item)[0]?.unionId,
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

export default PCExcelFileUploader;
