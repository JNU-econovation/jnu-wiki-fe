import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Header />
      {children}
    </>
  );
};
export default MainLayout;
