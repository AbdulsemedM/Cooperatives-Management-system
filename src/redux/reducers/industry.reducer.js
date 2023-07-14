import { actionTypes } from "../types";

const INITIAL_STATE = {
  types: [],
  sectors: [],
  loading: false,
};

const industryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.GET_TYPE:
      return {
        ...state,
        types: action.payload,
        loading: false,
      };
    case actionTypes.GET_SECTOR:
      return {
        ...state,
        sectors: action.payload,
        loading: false,
      };
    case actionTypes.GET_TYPE_ERROR:
      return {
        ...state,
        types: [],
        loading: false,
      };
    case actionTypes.GET_SECTOR_ERROR:
      return {
        ...state,
        sectors: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default industryReducer;
