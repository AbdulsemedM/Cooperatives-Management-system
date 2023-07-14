import { createSelector } from "reselect";

const selectData = (state) => state.cache;

export const selectUnionData = createSelector(
  [selectData],
  (cache) => cache.unionData
);
export const selectPCData = createSelector(
  [selectData],
  (cache) => cache.pcData
);
export const selectTypeData = createSelector(
  [selectData],
  (cache) => cache.typeData
);

export const selectSectorData = createSelector(
  [selectData],
  (cache) => cache.sectorData
);
export const selectMemberData = createSelector(
  [selectData],
  (cache) => cache.memberData
);
export const selectPaidUpShareData = createSelector(
  [selectData],
  (cache) => cache.paidUpShareData
);
export const selectOSLoanData = createSelector(
  [selectData],
  (cache) => cache?.osLoanData
);
export const selectAccountData = createSelector(
  [selectData],
  (cache) => cache?.accountData
);
export const selectAssetData = createSelector(
  [selectData],
  (cache) => cache?.assetData
);
export const selectLiabilityData = createSelector(
  [selectData],
  (cache) => cache?.liabilityData
);
export const selectCommodityData = createSelector(
  [selectData],
  (cache) => cache?.commodityData
);
export const selectTotalCapitalData = createSelector(
  [selectData],
  (cache) => cache?.totalCapitaData
);
export const selectUserData = createSelector(
  [selectData],
  (cache) => cache?.userData
);
export const selectUnionEstablishmentData = createSelector(
  [selectData],
  (cache) => cache?.unionEstablishmentData
);
export const selectPCEstablishmentData = createSelector(
  [selectData],
  (cache) => cache?.pcEstablishmentData
);
export const selectSellData = createSelector(
  [selectData],
  (cache) => cache?.sellData
);
export const selectTurnoverData = createSelector(
  [selectData],
  (cache) => cache?.turnoverData
);
export const selectUnionReportData = createSelector(
  [selectData],
  (cache) => cache?.unionReportData
);
export const selectPCReportData = createSelector(
  [selectData],
  (cache) => cache?.pcReportData
);
