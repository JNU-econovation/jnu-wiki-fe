import { combineReducers, createStore } from "redux";
import latLngReducer from "./latLngReducer";
import addressReducer from "./addressReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  latLng: latLngReducer,
  address: addressReducer,
  category: categoryReducer,
});

const store = createStore(rootReducer);

export default store;
