import { combineReducers, createStore } from "redux";
import latLngReducer from "./latLngReducer";
import requestLatLngReducer from "./requestLatLngReducer";
import addressReducer from "./addressReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  latLng: latLngReducer,
  requestLatLng: requestLatLngReducer,
  address: addressReducer,
  category: categoryReducer,
});

const store = createStore(rootReducer);

export default store;
