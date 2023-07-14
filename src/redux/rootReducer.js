import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/userReducer";
import stateReducer from "./state-control/stateReducer";
import cacheReducer from "./cache/cacheReducer";
import unionReducer from "./reducers/union.reducer";
import industryReducer from "./reducers/industry.reducer";
import capitalReducer from "./reducers/capital.reducer";
import sheetReducer from "./reducers/sheet.reducer";
import reportReducer from "./reducers/report.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "state", "cache"],
};

const rootReducer = combineReducers({
  user: userReducer,
  state: stateReducer,
  cache: cacheReducer,
  unions: unionReducer,
  industry: industryReducer,
  capital: capitalReducer,
  sheet: sheetReducer,
  report: reportReducer,
});

export default persistReducer(persistConfig, rootReducer);
