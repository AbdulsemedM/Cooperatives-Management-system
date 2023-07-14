import reportService from "../services/report.service";
import { actionTypes } from "../types";

export const getUnionEstData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const unionEstData = await reportService.fetchUnionEst();
    dispatch({
      type: actionTypes.GET_UNION_EST,
      payload: unionEstData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_UNION_EST_ERROR,
      payload: error,
    });
  }
};
export const getPCEstData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const pcEstData = await reportService.fetchPCEst();
    dispatch({
      type: actionTypes.GET_PC_EST,
      payload: pcEstData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PC_EST_ERROR,
      payload: error,
    });
  }
};
export const getUnionReportData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const unionReportData = await reportService.fetchUnionReport();
    dispatch({
      type: actionTypes.GET_UNION_REPORT,
      payload: unionReportData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_UNION_REPORT_ERROR,
      payload: error,
    });
  }
};
export const getPCReportData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const pcReportData = await reportService.fetchPCReport();
    dispatch({
      type: actionTypes.GET_PC_REPORT,
      payload: pcReportData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PC_EST_ERROR,
      payload: error,
    });
  }
};
export const getFederationData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const federationData = await reportService.fetchFederation();
    dispatch({
      type: actionTypes.GET_FEDERATION,
      payload: federationData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_FEDERATION_ERROR,
      payload: error,
    });
  }
};
