import CapitalService from "../services/capital.service";
import { actionTypes } from "../types";

export const getPaidUpShareData =
  (unionID, prCooperativeID) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START,
        payload: true,
      });
      const paidUpShareData = await CapitalService.fetchPaidUpShare(
        prCooperativeID,
        unionID
      );
      dispatch({
        type: actionTypes.GET_PAIDUPSHARE,
        payload: paidUpShareData,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PAIDUPSHARE_ERROR,
        payload: error,
      });
    }
  };
export const getOSLoanData = (unionID, prCooperativeID) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const osLoanData = await CapitalService.fetchOSLoan(
      prCooperativeID,
      unionID
    );
    dispatch({
      type: actionTypes.GET_OSLOAN,
      payload: osLoanData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_OSLOAN_ERROR,
      payload: error,
    });
  }
};
export const getAccountData =
  (unionID, prCooperativeID) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START,
        payload: true,
      });
      const accountData = await CapitalService.fetchAccount(
        unionID,
        prCooperativeID
      );
      dispatch({
        type: actionTypes.GET_ACCOUNT,
        payload: accountData,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ACCOUNT_ERROR,
        payload: error,
      });
    }
  };
export const getAnnualTurnoverData =
  (unionID, prCooperativeID) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START,
        payload: true,
      });
      const turnoverData = await CapitalService.fetchAnnualTurnover(
        unionID,
        prCooperativeID
      );
      dispatch({
        type: actionTypes.GET_ANNUAL_TURNOVER,
        payload: turnoverData,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ANNUAL_TURNOVER_ERROR,
        payload: error,
      });
    }
  };
