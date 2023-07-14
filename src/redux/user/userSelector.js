import { createSelector } from "reselect";

const selectData = (state) => state.user;

export const selectAccessToken = createSelector(
  [selectData],
  (user) => user.access_token
);
export const selectRefreshToken = createSelector(
  [selectData],
  (user) => user.refresh_token
);
export const selectRole = createSelector([selectData], (user) => user.roles[0]);

export const selectUnionID = createSelector(
  [selectData],
  (user) => user.unionId
);
export const selectPrCooperativeID = createSelector(
  [selectData],
  (user) => user.prCooperativeId
);
export const selectUserProfile = createSelector(
  [selectData],
  (user) => user.userProfile
);
export const selectUserProfileByName = createSelector([selectData], (user) =>
  user?.roles[0].includes("primary")
    ? user.userProfile?.prCooperative?.name
    : user.userProfile?.union?.name
);

export const selectFullName = createSelector(
  [selectData],
  (user) => user.userProfile?.fullName
);

export const selectEmail = createSelector(
  [selectData],
  (user) => user.userProfile?.address?.email
);
