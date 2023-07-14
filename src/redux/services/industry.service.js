import { API } from "../../utils/API";

const fetchType = async () => {
  return await API.get("/type/getTypes").then((res) => res.data);
};
const fetchSector = async () => {
  return await API.get("/sector/getSectors").then((res) => res.data);
};

const IndustryService = {
  fetchType,
  fetchSector,
};

export default IndustryService;
