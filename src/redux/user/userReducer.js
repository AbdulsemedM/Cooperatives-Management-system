import { userActionTypes } from "./userType";

const INITIAL_STATE = {
  access_token: null,
  refresh_token: null,
  roles: [],
  unionId: null,
  prCooperativeId: null,
  userProfile: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_TOKEN:
      return {
        ...state,
        access_token: action.payload,
      };
    case userActionTypes.REFRESH_TOKEN:
      return {
        ...state,
        refresh_token: action.payload,
      };
    case userActionTypes.TOGGLE_ROLE:
      return {
        ...state,
        roles: action.payload,
      };
    case userActionTypes.SET_UNION_ID:
      return {
        ...state,
        unionId: action.payload,
      };
    case userActionTypes.SET_PRCOOPERATIVE_ID:
      return {
        ...state,
        prCooperativeId: action.payload,
      };
    case userActionTypes.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
