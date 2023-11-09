import { createStore, applyMiddleware } from "redux";
import rootReducer from "./index.js";
import ReduxThunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension"; // 개발자 도구

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
); // 기존 store 내보내기

export const persistor = persistStore(store); // persist store 내보내기
