import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ viewActive, adminActive, children, onClick }) => {
  return (
    <>
      <Sidebar
        viewActive={viewActive}
        adminActive={adminActive}
        onClick={onClick}
      />
      <Header />
      {children}
    </>
  );
};
export default MainLayout;
