import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ viewActive, myActive, children, onClick }) => {
  return (
    <>
      <Sidebar viewActive={viewActive} myActive={myActive} onClick={onClick} />
      <Header />
      {children}
    </>
  );
};
export default MainLayout;
