import SheetService from "../services/sheet.service";
import { actionTypes } from "../types";

export const getAssetData = (unionID, prCooperativeID) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const assetData = await SheetService.fetchAsset(unionID, prCooperativeID);
    dispatch({
      type: actionTypes.GET_ASSET,
      payload: assetData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ASSET_ERROR,
      payload: error,
    });
  }
};

export const getLiabilityData =
  (unionID, prCooperativeID) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START,
        payload: true,
      });
      const liabilityData = await SheetService.fetchLiability(
        unionID,
        prCooperativeID
      );
      dispatch({
        type: actionTypes.GET_LIABILITY,
        payload: liabilityData,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_LIABILITY_ERROR,
        payload: error,
      });
    }
  };

export const getTotlaCapitalData =
  (unionID, prCooperativeID) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START,
        payload: true,
      });
      const totalCapitalData = await SheetService.fetchTotlaCapital(
        unionID,
        prCooperativeID
      );
      dispatch({
        type: actionTypes.GET_TOTAL_CAPITAL,
        payload: totalCapitalData,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_TOTAL_CAPITAL_ERROR,
        payload: error,
      });
    }
  };
export const getCommodityData =
  (unionID, prCooperativeID) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START,
        payload: true,
      });
      const commodityData = await SheetService.fetchCommodity(
        unionID,
        prCooperativeID
      );
      dispatch({
        type: actionTypes.GET_COMMODITY,
        payload: commodityData,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_COMMODITY_ERROR,
        payload: error,
      });
    }
  };
