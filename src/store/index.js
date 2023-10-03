import { combineReducers, createStore } from "redux";
import latLngReducer from "./latLngReducer";
import requestLatLngReducer from "./requestLatLngReducer";
import addressReducer from "./addressReducer";
import categoryReducer from "./categoryReducer";
import boundReducer from "./boundReducer";
import userReducer from "./userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  // localStorage에 저장.
  storage,

  whitelist: ["user"],
};

const rootReducer = combineReducers({
  latLng: latLngReducer,
  requestLatLng: requestLatLngReducer,
  address: addressReducer,
  category: categoryReducer,
  SwNe: boundReducer,
  user: userReducer,
});

// const store = createStore(rootReducer);
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
