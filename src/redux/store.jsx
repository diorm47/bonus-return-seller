import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk"; // Use named import
import userReducer from "./user-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
});

const middleware = [thunk]; // Keep this as is

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);
export const persistor = persistStore(store);
