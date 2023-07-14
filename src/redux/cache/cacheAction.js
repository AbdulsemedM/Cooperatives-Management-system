import { cacheActionTypes } from "./cacheType";

export const setUnion = (item) => ({
  type: cacheActionTypes.SET_UNION,
  payload: item,
});

export const setPC = (item) => ({
  type: cacheActionTypes.SET_PC,
  payload: item,
});
export const setAsset = (item) => ({
  type: cacheActionTypes.SET_ASSET,
  payload: item,
});

export const setAccount = (item) => ({
  type: cacheActionTypes.SET_ACCOUNT,
  payload: item,
});

export const setCommodity = (item) => ({
  type: cacheActionTypes.SET_COMMODITY,
  payload: item,
});
export const setLiability = (item) => ({
  type: cacheActionTypes.SET_LIABILITY,
  payload: item,
});

export const setMember = (item) => ({
  type: cacheActionTypes.SET_MEMBER,
  payload: item,
});
export const setSector = (item) => ({
  type: cacheActionTypes.SET_SECTOR,
  payload: item,
});
export const setOSLoan = (item) => ({
  type: cacheActionTypes.SET_OS_LOAN,
  payload: item,
});
export const setPaidUpShare = (item) => ({
  type: cacheActionTypes.SET_PAID_UP_SHARE,
  payload: item,
});
export const setPCEstablishment = (item) => ({
  type: cacheActionTypes.SET_PC_ESTABLISHMENT,
  payload: item,
});
export const setPCReport = (item) => ({
  type: cacheActionTypes.SET_PC_REPORT,
  payload: item,
});
export const setSell = (item) => ({
  type: cacheActionTypes.SET_SELL,
  payload: item,
});
export const setTotalCapital = (item) => ({
  type: cacheActionTypes.SET_TOTAL_CAPITAL,
  payload: item,
});
export const setTurnover = (item) => ({
  type: cacheActionTypes.SET_TURNOVER,
  payload: item,
});
export const setType = (item) => ({
  type: cacheActionTypes.SET_TYPE,
  payload: item,
});
export const setUnionEstablishment = (item) => ({
  type: cacheActionTypes.SET_UNION_ESTABLISHMENT,
  payload: item,
});
export const setUnionReport = (item) => ({
  type: cacheActionTypes.SET_UNION_REPORT,
  payload: item,
});
export const setUser = (item) => ({
  type: cacheActionTypes.SET_USER,
  payload: item,
});
