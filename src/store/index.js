import { combineReducers } from "redux";
import latLngReducer from "./latLngReducer";
import requestLatLngReducer from "./requestLatLngReducer";
import addressReducer from "./addressReducer";
import boundReducer from "./boundReducer";
import userReducer from "./userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import editReducer from "./editReducer";
import displayReducer from "./displayReudcer";

const persistConfig = {
  key: "root",
  storage,

  whitelist: ["user"],
};

const rootReducer = combineReducers({
  latLng: latLngReducer,
  requestLatLng: requestLatLngReducer,
  address: addressReducer,
  SwNe: boundReducer,
  user: userReducer,
  edit: editReducer,
  display: displayReducer,
});

// const store = createStore(rootReducer);
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
