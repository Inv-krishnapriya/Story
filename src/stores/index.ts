import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import createSagaMiddleware from "redux-saga";
import nonSerializable from "./nonSerializable";
import packageJson from "../../package.json";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import storage from "redux-persist/lib/storage";

const DEBUG = process.env.NODE_ENV !== "production";

/*
 * redux-persist configuration
 */
const persistConfig = {
  // if immutable js is used //#region
  transforms: [],
  key: packageJson.name || "root",
  storage,
  whitelist: ["global", "interviewdates", "schedule","videocall"],
  stateReconciler: autoMergeLevel2,
  version: 1,
};
const formattedRootReducer: any = (state: any, action: any) => {
  if (action.type === "SIGN_OUT") {
    state = undefined;
  }
  return rootReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, formattedRootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleware: any[] = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: nonSerializable,
    },
  }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: DEBUG,
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);
export { persistor };
export default store;
