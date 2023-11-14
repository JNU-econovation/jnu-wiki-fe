import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ children, onClick, isActive, myPageClicked }) => {
  return (
    <>
      <Sidebar
        onClick={onClick}
        isActive={isActive}
        myPageClicked={myPageClicked}
      />
      <Header />
      {children}
    </>
  );
};
export default MainLayout;
