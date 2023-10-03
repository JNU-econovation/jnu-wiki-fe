import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes.js";
import AddPost from "./pages/AddPost.jsx";
import MyPage from "./pages/MyPage.jsx";
import Login from "./pages/Login.jsx";
import Join from "./pages/Join.jsx";
import MyInfoEdit from "./pages/MyInfoEdit.jsx";
import { GlobalStyle } from "./styles/globalStyle";
import Admin from "./pages/Admin.jsx";
// import store from "./store/index.js";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import BasicInfoEditReq from "./pages/BasicInfoEditReq.jsx";
import NewDocsReq from "./pages/NewDocsReq.jsx";
import DocumentPage from "./pages/DocumentPage.jsx";
import DocumentListPage from "./pages/DocumentListPage.jsx";
import Scrap from "./pages/Scrap.jsx";
import MypageScrapDetail from "./components/mypage/MypageScrapDetail.jsx";
import MypageScrapDetailPage from "./pages/MypageScrapDetailPage.jsx";
<<<<<<< HEAD
import { store, persistor } from "./store/store.js";
=======
>>>>>>> 4fa540c2aa48ff4e39ba55feb7f05fb4b311cff2

function App() {
  return (
    <>
      <Provider store={store}>
<<<<<<< HEAD
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
              <Route
                path={routes.scrapDetailPage}
                element={<MypageScrapDetailPage />}
              />
              <Route
                path={routes.scrapDetail}
                element={<MypageScrapDetail />}
              />

              {/* <Route path={routes.documentList} element={<DocumentListPage />} /> */}
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
=======
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
            <Route
              path={routes.scrapDetailPage}
              element={<MypageScrapDetailPage />}
            />
            <Route path={routes.scrapDetail} element={<MypageScrapDetail />} />
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
>>>>>>> 4fa540c2aa48ff4e39ba55feb7f05fb4b311cff2
      </Provider>
    </>
  );
}

export default App;
