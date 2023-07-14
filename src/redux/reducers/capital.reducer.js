import { actionTypes } from "../types";

const INITIAL_STATE = {
  paidUpShare: [],
  osLoan: [],
  account: [],
  annualTurnover: [],
  loading: false,
};

const capitalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.GET_PAIDUPSHARE:
      return {
        ...state,
        paidUpShare: action.payload,
        loading: false,
      };
    case actionTypes.GET_OSLOAN:
      return {
        ...state,
        osLoan: action.payload,
        loading: false,
      };
    case actionTypes.GET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
        loading: false,
      };
    case actionTypes.GET_ANNUAL_TURNOVER:
      return {
        ...state,
        annualTurnover: action.payload,
        loading: false,
      };
    case actionTypes.GET_PAIDUPSHARE_ERROR:
      return {
        ...state,
        paidUpShare: [],
        loading: false,
      };
    case actionTypes.GET_OSLOAN_ERROR:
      return {
        ...state,
        osLoan: [],
        loading: false,
      };
    case actionTypes.GET_ACCOUNT_ERROR:
      return {
        ...state,
        account: [],
        loading: false,
      };
    case actionTypes.GET_ANNUAL_TURNOVER_ERROR:
      return {
        ...state,
        annualTurnover: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default capitalReducer;
