import { actionTypes } from "../types";

const INITIAL_STATE = {
  unions: [],
  pc: [],
  federation: [],
  loading: false,
};

const unionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.GET_FEDERATION:
      return {
        ...state,
        federation: action.payload,
        loading: false,
      };
    case actionTypes.GET_UNION:
      return {
        ...state,
        unions: action.payload,
        loading: false,
      };
    case actionTypes.GET_PC:
      return {
        ...state,
        pc: action.payload,
        loading: false,
      };
    case actionTypes.GET_FEDERATION_ERROR:
      return {
        ...state,
        federation: [],
        loading: false,
      };
    case actionTypes.GET_UNION_ERROR:
      return {
        ...state,
        unions: [],
        loading: false,
      };
    case actionTypes.GET_PC_ERROR:
      return {
        ...state,
        pc: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default unionReducer;
