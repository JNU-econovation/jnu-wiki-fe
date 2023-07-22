import { combineReducers, createStore } from "redux";
import latLngReducer from "./latLngReducer";
import addressReducer from "./addressReducer";

const rootReducer = combineReducers({
  latLng: latLngReducer,
  address: addressReducer,
});

const store = createStore(rootReducer);

export default store;
