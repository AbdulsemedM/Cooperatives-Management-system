import { stateActionTypes } from "./stateType";

export const setHiddenSidebar = (item) => ({
  type: stateActionTypes.SET_SIDEBAR_STATE,
  payload: item,
});
export const setActiveSidebarTab = (item) => ({
  type: stateActionTypes.ACTIVE_SIDEBAR_TAB,
  payload: item,
});
export const setUpdatedState = (item) => ({
  type: stateActionTypes.UPDATED_STATE,
  payload: item,
});
