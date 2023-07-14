import { cacheActionTypes } from "./cacheType";

const INITIAL_STATE = {
  pcData: [],
  typeData: [],
  unionData: [],
  sectorData: [],
  memberData: [],
  paidUpShareData: [],
  osLoanData: [],
  accountData: [],
  assetData: [],
  liabilityData: [],
  commodityData: [],
  totalCapitaData: [],
  userData: [],
  unionEstablishmentData: [],
  pcEstablishmentData: [],
  sellData: [],
  turnoverData: [],
  unionReportData: [],
  pcReportData: [],
};

const cacheReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cacheActionTypes.SET_UNION:
      return {
        ...state,
        unionData: action.payload,
      };
    case cacheActionTypes.SET_PC:
      return {
        ...state,
        pcData: action.payload,
      };
    case cacheActionTypes.SET_ACCOUNT:
      return {
        ...state,
        accountData: action.payload,
      };
    case cacheActionTypes.SET_ASSET:
      return {
        ...state,
        assetData: action.payload,
      };
    case cacheActionTypes.SET_COMMODITY:
      return {
        ...state,
        commodity: action.payload,
      };
    case cacheActionTypes.SET_LIABILITY:
      return {
        ...state,
        liabilityData: action.payload,
      };
    case cacheActionTypes.SET_MEMBER:
      return {
        ...state,
        memberData: action.payload,
      };
    case cacheActionTypes.SET_OS_LOAN:
      return {
        ...state,
        osLoanData: action.payload,
      };
    case cacheActionTypes.SET_PAID_UP_SHARE:
      return {
        ...state,
        paidUpShareData: action.payload,
      };
    case cacheActionTypes.SET_PC_ESTABLISHMENT:
      return {
        ...state,
        pcEstablishmentData: action.payload,
      };
    case cacheActionTypes.SET_PC_REPORT:
      return {
        ...state,
        pcReportData: action.payload,
      };
    case cacheActionTypes.SET_SECTOR:
      return {
        ...state,
        sectorData: action.payload,
      };
    case cacheActionTypes.SET_SELL:
      return {
        ...state,
        sellData: action.payload,
      };
    case cacheActionTypes.SET_TOTAL_CAPITAL:
      return {
        ...state,
        totalCapitaData: action.payload,
      };
    case cacheActionTypes.SET_TURNOVER:
      return {
        ...state,
        turnoverData: action.payload,
      };
    case cacheActionTypes.SET_TYPE:
      return {
        ...state,
        typeData: action.payload,
      };
    case cacheActionTypes.SET_UNION_ESTABLISHMENT:
      return {
        ...state,
        unionEstablishmentData: action.payload,
      };
    case cacheActionTypes.SET_UNION_REPORT:
      return {
        ...state,
        unionReportData: action.payload,
      };
    case cacheActionTypes.SET_USER:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default cacheReducer;
