import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
// import logger from "redux-logger";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  )
);

export const persistor = persistStore(store);

export default store;
