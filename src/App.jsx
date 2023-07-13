import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import routes from "./routes.js";
import Home from "./pages/Home.jsx";
import AddPost from "./pages/AddPost.jsx"
import MyPage from "./pages/MyPage.jsx"
import Join from "./pages/Join.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.addPost} element={<AddPost />} />
          <Route path={routes.myPage} element={<MyPage />} />
          <Route path={routes.join} element={<Join />} />
          <Route path={routes.login} element={<Login />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
