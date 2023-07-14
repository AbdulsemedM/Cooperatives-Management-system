import { API } from "../../utils/API";

const fetchPaidUpShare = async (unionID, prCooperativeID) => {
  return unionID
    ? await API.get(`/paidUpShare/union/${unionID}`).then((res) => res.data)
    : prCooperativeID
    ? await API.get(`/paidUpShare/prCooperative/${prCooperativeID}`).then(
        (res) => res.data
      )
    : await API.get("/paidUpShare/getPaidUpShares").then((res) => res.data);
};

const fetchOSLoan = async (unionID, prCooperativeID) => {
  return unionID
    ? await API.get(`/osLoan/getByUnionId/${unionID}`).then((res) => res.data)
    : prCooperativeID
    ? await API.get(`/osLoan/getByPrCooperativeId/${prCooperativeID}`).then(
        (res) => res.data
      )
    : await API.get("/osLoan/getosLoans").then((res) => res.data);
};
const fetchAccount = async (unionID, prCooperativeID) => {
  return unionID
    ? await API.get(`/account/getByUnionId/${unionID}`).then((res) => res.data)
    : prCooperativeID
    ? await API.get(`/account/getByPrCooperativeId/${prCooperativeID}`).then(
        (res) => res.data
      )
    : await API.get("/accountBalance/getaccountBalances").then((res) => res.data);
};
const fetchAnnualTurnover = async (unionID, prCooperativeID) => {
  return unionID
    ? await API.get(`/annualTurnOver/union/${unionID}`).then((res) => res.data)
    : prCooperativeID
    ? await API.get(`/annualTurnOver/prCooperative/${prCooperativeID}`).then(
        (res) => res.data
      )
    : await API.get(`/annualTurnOver/getAnnualTurnOver`).then((res) => res.data);
};

const CapitalService = {
  fetchPaidUpShare,
  fetchOSLoan,
  fetchAccount,
  fetchAnnualTurnover
};

export default CapitalService;
