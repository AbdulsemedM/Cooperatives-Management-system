import { actionTypes } from "../types";

const INITIAL_STATE = {
  asset: [],
  liability: [],
  commodity: [],
  totalCapital: [],
  loading: false,
};

const sheetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.GET_ASSET:
      return {
        ...state,
        asset: action.payload,
        loading: false,
      };
    case actionTypes.GET_LIABILITY:
      return {
        ...state,
        liability: action.payload,
        loading: false,
      };
    case actionTypes.GET_COMMODITY:
      return {
        ...state,
        commodity: action.payload,
        loading: false,
      };
    case actionTypes.GET_TOTAL_CAPITAL:
      return {
        ...state,
        totalCapital: action.payload,
        loading: false,
      };
    case actionTypes.GET_ASSET_ERROR:
      return {
        ...state,
        asseet: [],
        loading: false,
      };
    case actionTypes.GET_COMMODITY_ERROR:
      return {
        ...state,
        commodity: [],
        loading: false,
      };

    case actionTypes.GET_LIABILITY_ERROR:
      return {
        ...state,
        liability: [],
        loading: false,
      };
    case actionTypes.GET_TOTAL_CAPITAL_ERROR:
      return {
        ...state,
        totalCapital: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default sheetReducer;
