import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import routes from "./routes.js";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
