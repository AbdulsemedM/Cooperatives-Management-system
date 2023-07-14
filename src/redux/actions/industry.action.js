import IndustryService from "../services/industry.service";
import { actionTypes } from "../types";

export const getTypeData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const typeData = await IndustryService.fetchType();
    dispatch({
      type: actionTypes.GET_TYPE,
      payload: typeData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TYPE_ERROR,
      payload: error,
    });
  }
};
export const getSectorData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const sectorData = await IndustryService.fetchSector();
    // console.log(sectorData);
    dispatch({
      type: actionTypes.GET_SECTOR,
      payload: sectorData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_SECTOR_ERROR,
      payload: error,
    });
  }
};
