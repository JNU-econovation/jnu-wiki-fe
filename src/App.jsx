import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import routes from "./routes.js";
import Home from "./pages/Home.jsx";
import AddPost from "./pages/AddPost.jsx"
import MyPage from "./pages/MyPage.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.addPost} element={<AddPost />} />
          <Route path={routes.myPage} element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
