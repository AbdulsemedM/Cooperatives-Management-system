import { stateActionTypes } from "./stateType";

const INITIAL_STATE = {
  hidden_sidebar: true,
  activeSidebarTab: "dashboard",
  updated_state: "",
};

const stateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case stateActionTypes.SET_SIDEBAR_STATE:
      return {
        ...state,
        hidden_sidebar: action.payload,
      };
    case stateActionTypes.ACTIVE_SIDEBAR_TAB:
      return {
        ...state,
        activeSidebarTab: action.payload,
      };
    case stateActionTypes.UPDATED_STATE:
      return {
        ...state,
        updated_state: action.payload,
      };
    default:
      return state;
  }
};
export default stateReducer;
