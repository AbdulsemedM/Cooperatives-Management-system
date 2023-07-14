import { actionTypes } from "../types";

const INITIAL_STATE = {
  unionReport: [],
  pcReport: [],
  unionEst: [],
  pcEst: [],
  federation: [],
  loading: false,
};

const reportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.GET_PC_EST:
      return {
        ...state,
        pcEst: action.payload,
        loading: false,
      };
    case actionTypes.GET_PC_REPORT:
      return {
        ...state,
        pcReport: action.payload,
        loading: false,
      };
    case actionTypes.GET_UNION_EST:
      return {
        ...state,
        unionEst: action.payload,
        loading: false,
      };
    case actionTypes.GET_UNION_REPORT:
      return {
        ...state,
        unionReport: action.payload,
        loading: false,
      };
    case actionTypes.GET_FEDERATION:
      return {
        ...state,
        federation: action.payload,
        loading: false,
      };
    case actionTypes.GET_PC_EST_ERROR:
      return {
        ...state,
        pcEst: [],
        loading: false,
      };
    case actionTypes.GET_PC_REPORT_ERROR:
      return {
        ...state,
        pcReport: [],
        loading: false,
      };
    case actionTypes.GET_UNION_EST_ERROR:
      return {
        ...state,
        unionEst: [],
        loading: false,
      };
    case actionTypes.GET_UNION_REPORT_ERROR:
      return {
        ...state,
        unionReport: [],
        loading: false,
      };
    case actionTypes.GET_FEDERATION_ERROR:
      return {
        ...state,
        federation: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default reportReducer;
