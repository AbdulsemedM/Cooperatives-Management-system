import { API } from "../../utils/API";

const fetchAsset = async (unionID, prCooperativeID) => {
  return unionID
    ? await API.get(`/asset/union/${unionID}`).then((res) => res.data)
    : prCooperativeID
    ? await API.get(`/asset/prCooperative/${prCooperativeID}`).then(
        (res) => res.data
      )
    : await API.get("/asset/getAssets").then((res) => res.data);
};
const fetchLiability = async (unionID, prCooperativeID) => {
  return unionID
    ? await API.get(`/liability/getByUnionId/${unionID}`).then(
        (res) => res.data
      )
    : prCooperativeID
    ? await API.get(`/liability/getByPrCooperativeId/${prCooperativeID}`).then(
        (res) => res.data
      )
    : await API.get("/liability/getLiabilities").then((res) => res.data);
};
const fetchCommodity = async (unionID, prCooperativeID) => {
  return unionID
    ? await API.get(`/commodity/getByUnionId/${unionID}`).then(
        (res) => res.data
      )
    : prCooperativeID
    ? await API.get(`/commodity/getByPrCooperativeId/${prCooperativeID}`).then(
        (res) => res.data
      )
    : await API.get("/commodity/getcommodities").then((res) => res.data);
};
const fetchTotlaCapital = async (unionID, prCooperativeID) => {
  return await API.get("/totalCapital/totalCapitals").then((res) => res.data);
};

const SheetService = {
  fetchAsset,
  fetchLiability,
  fetchCommodity,
  fetchTotlaCapital,
};

export default SheetService;
