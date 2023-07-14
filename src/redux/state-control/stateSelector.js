import { createSelector } from "reselect";

const selectData = (item) => item.state;

export const selectHiddenSidebarState = createSelector(
  [selectData],
  (state) => state.hidden_sidebar
);
export const selectActiveSidebarTab = createSelector(
  [selectData],
  (state) => state.activeSidebarTab
);
export const selectUpdatedState = createSelector(
  [selectData],
  (state) => state.updated_state
);
