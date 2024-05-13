import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { useEffect } from "react";

import routes from "./routes.js";
import AddPost from "./pages/AddPost.jsx";
import MyPage from "./pages/MyPage.jsx";
import Login from "./pages/Login.jsx";
import Join from "./pages/Join.jsx";
import MyInfoEdit from "./pages/MyInfoEdit.jsx";
import Admin from "./pages/Admin.jsx";
import BasicInfoEditReq from "./pages/BasicInfoEditReq.jsx";
import NewDocsReq from "./pages/NewDocsReq.jsx";
import DocumentPage from "./pages/DocumentPage.jsx";
import DocumentListPage from "./pages/DocumentListPage.jsx";
import Scrap from "./pages/Scrap.jsx";
import { GlobalStyle } from "./styles/globalStyle";
import { store, persistor } from "./store/store.js";
import NotFound from "./pages/NotFound.jsx";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle />
          <BrowserRouter>
            <Routes>
              <Route path={routes.home} element={<DocumentListPage />} />
              <Route path={routes.addPost} element={<AddPost />} />
              <Route path={routes.myInfoEdit} element={<MyInfoEdit />} />
              <Route path={routes.documentPage} element={<DocumentPage />} />
              <Route path={routes.myPage} element={<MyPage />} />
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.join} element={<Join />} />
              <Route path={routes.admin} element={<Admin />} />
              <Route path={routes.scrap} element={<Scrap />} />
              <Route path={routes.notFound} element={<NotFound />} />
              <Route
                path={`${routes.newDocsRequest}/:id`}
                element={<NewDocsReq />}
              />
              <Route
                path={`${routes.basicInfoEditRequest}/:docsId/:docsRequestId`}
                element={<BasicInfoEditReq />}
              />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
