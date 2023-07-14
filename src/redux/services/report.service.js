import { API } from "../../utils/API";

const fetchUnionEst = async () => {
  return await API.get("/unionExport/getUnionsReport").then((res) => res.data);
};
const fetchPCEst = async () => {
  return await API.get("/prCooperativeExport/getprCooperativesReport").then(
    (res) => res.data
  );
};
const fetchUnionReport = async () => {
  return await API.get("/unionExport/getUnionsExport").then((res) => res.data);
};
const fetchPCReport = async () => {
  return await API.get("/prCooperativeExport/getPrCooperativesExport").then(
    (res) => res.data
  );
};
const fetchFederation = async () => {
  return await API.get("/federation/getFederations").then(
    (res) => res.data
  );
};

const reportService = {
  fetchUnionEst,
  fetchPCEst,
  fetchUnionReport,
  fetchPCReport,
  fetchFederation
};

export default reportService;
