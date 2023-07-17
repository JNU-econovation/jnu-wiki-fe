import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import routes from "./routes.js";
import Home from "./pages/Home.jsx";
import AddPost from "./pages/AddPost.jsx";
import MyPage from "./pages/MyPage.jsx";
import Login from "./pages/Login.jsx";
import Join from "./pages/Join.jsx";
import MyInfoEdit from "./pages/MyInfoEdit.jsx";
import { GlobalStyle } from "./styles/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          {/* <Route path={routes.addPost} element={<AddPost />} /> */}
          <Route path={routes.myInfoEdit} element={<MyInfoEdit />} />
          <Route path={routes.myPage} element={<MyPage />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.join} element={<Join />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
