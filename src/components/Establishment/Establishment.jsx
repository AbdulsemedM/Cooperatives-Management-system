import React, { useState } from "react";
import EstablishmentFilterMenu from "./EstablishmentFilterMenu";
import EstablishmentMenu from "./EstablishmentMenu";
import { connect } from "react-redux";
import { selectRole } from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";

const Establishment = ({ role }) => {
  const [activeTab, setActiveTab] = useState("union");
  // const [unionsEst, setUnionsEst] = useState([]);
  // const [prCoopEst, setPrCoopEst] = useState([]);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // role === "bankReportViewer" &&
  //     await API.get("/unionExport/getUnionsReport").then((res) =>
  //       setUnionsEst(res.data)
  //     );

  //     // role === "bankReportViewer" &&
  //     await API.get("/prCooperativeExport/getprCooperativesReport").then(
  //       (res) => setPrCoopEst(res.data)
  //     );
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="border p-5 rounded shadow">
      <EstablishmentMenu
        activeTab={activeTab}
        role={role}
        search={search}
        setSearch={setSearch}
      />
      <EstablishmentFilterMenu
        activeTab={activeTab}
        role={role}
        setActiveTab={setActiveTab}
        search={search}
      />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  role: selectRole,
});

export default connect(mapStateToProps)(Establishment);
