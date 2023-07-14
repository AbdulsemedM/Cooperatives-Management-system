import React, { useEffect, useState } from "react";
import ReactDataTable from "../../containers/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getPCEstData,
  getUnionEstData,
} from "../../redux/actions/report.action";

const EstablishmentFilterMenu = ({
  activeTab,
  setActiveTab,
  // role,
  search,
}) => {
  const [filteredUnion, setFilteredUnion] = useState([]);
  const [filteredPC, setFilteredPC] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // role === "bankReportViewer" &&
      dispatch(getUnionEstData());

      // role === "bankReportViewer" &&
      dispatch(getPCEstData());
    };
    fetchData();
  }, [dispatch]);

  const establishmentData = useSelector((state) => state.report);
  const { unionEst, pcEst, loading } = establishmentData;

  useEffect(() => {
    const filterEST = unionEst?.filter((item) =>
      search === ""
        ? item
        : item.unionName.toLowerCase().includes(search?.toLowerCase())
    );
    setFilteredUnion(filterEST);

    const filterPC = pcEst?.filter((item) =>
      search === ""
        ? item
        : search !== "" &&
          item.prCooperativeName.toLowerCase().includes(search?.toLowerCase())
    );
    setFilteredPC(filterPC);
  }, [pcEst, unionEst, search]);

  // start
  const UnionColumn = [
    {
      name: "Union Name",
      selector: (row) => row.unionName,
      sortable: true,
    },
    {
      name: "Date os Establishment",
      selector: (row) => row.dateOfEstablishmnet,
      sortable: true,
    },
    // {
    //   name: "Pr Cooperatives",
    //   selector: (row) => row.no_of_Total_Stablishing_Member,
    //   sortable: true,
    // },
    {
      name: "Capital",
      selector: (row) => row.shareCapitalUponEstablishmnet?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Licensing Organ",
      selector: (row) => row.licensingOrgan,
      sortable: true,
    },
  ];

  const PrCoopColumn = [
    {
      name: "Pr Coop Name",
      selector: (row) => row.prCooperativeName,
      sortable: true,
    },
    {
      name: "Date os Establishment",
      selector: (row) => row.yearOfStablishment,
      sortable: true,
    },
    {
      name: "Male",
      selector: (row) => row.maleMembersUpOnEstablishement,
      sortable: true,
    },
    {
      name: "Female",
      selector: (row) => row.femaleMembersUpOnEstablishement,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) =>
        row.maleMembersUpOnEstablishement + row.femaleMembersUpOnEstablishement,
      sortable: true,
    },
    {
      name: "Capital",
      selector: (row) => row.shareCapitalUponEstablishmnet?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Licensing Organ",
      selector: (row) => row.licensingOrgan,
      sortable: true,
    },
  ];

  // end

  return (
    <div className="mx-5">
      {
        <div className="ui secondary pointing menu">
          <span
            className={`${
              activeTab === "union" && "active teal"
            } item   cursor-pointer`}
            onClick={() => setActiveTab("union")}
          >
            Union
          </span>
          <span
            className={`${
              activeTab === "prCoop" && "active teal"
            } item   cursor-pointer`}
            onClick={() => setActiveTab("prCoop")}
          >
            Pr Cooperatives
          </span>
        </div>
      }
      <div>
        <ReactDataTable
          data={activeTab === "union" ? filteredUnion : filteredPC}
          columns={activeTab === "union" ? UnionColumn : PrCoopColumn}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EstablishmentFilterMenu;
