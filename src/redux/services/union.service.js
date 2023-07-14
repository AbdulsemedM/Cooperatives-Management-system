import { API } from "../../utils/API";

const fetchUnion = async () => {
  return await API.get("/union/getUnions").then((res) => res.data);
};
const fetchFederation = async () => {
  return await API.get("/federation/getFederations").then((res) => res.data);
};

const createUnion = async (data) => {
  await API.post("/union/add", data).then((res) => res);
};
const createPC = async (data) => {
  await API.post("/union/add", data).then((res) => res);
};

const editUnion = async (data) => {
  await API.post(`/union/edit/`, data).then((res) => res);
};
const editPC = async (data) => {
  await API.post(`/union/edit/`, data).then((res) => res);
};

const fetchPC = async (unionID) => {
  return unionID
    ? await API.get(`/prCooperatives/union/${unionID}`).then((res) => res.data)
    : await API.get("/prCooperatives/getPrCooperatives").then(
        (res) => res.data
      );
};
const UnionAndPCService = {
  fetchUnion,
  createUnion,
  editUnion,
  fetchPC,
  createPC,
  editPC,
  fetchFederation
};

export default UnionAndPCService;
