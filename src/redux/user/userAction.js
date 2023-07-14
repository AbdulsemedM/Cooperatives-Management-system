import { userActionTypes } from "./userType";

export const setToken = (item) => ({
  type: userActionTypes.SET_TOKEN,
  payload: item,
});

export const setRefreshToken = (item) => ({
  type: userActionTypes.REFRESH_TOKEN,
  payload: item,
});
export const setUserProfile = (item) => ({
  type: userActionTypes.SET_USER_PROFILE,
  payload: item,
});

export const setRole = (item) => ({
  type: userActionTypes.TOGGLE_ROLE,
  payload: item,
});

export const setUnionId = (item) => ({
  type: userActionTypes.SET_UNION_ID,
  payload: item,
});

export const setPrCooperativeId = (item) => ({
  type: userActionTypes.SET_PRCOOPERATIVE_ID,
  payload: item,
});
