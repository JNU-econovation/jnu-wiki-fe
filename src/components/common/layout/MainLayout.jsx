import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({
  children,
  onClick,
  isActive,
  myPageClicked,
  isDisplay,
}) => {
  return (
    <>
      <Sidebar
        onClick={onClick}
        isActive={isActive}
        myPageClicked={myPageClicked}
      />
      <Header isDisplay={isDisplay} />
      {children}
    </>
  );
};
export default MainLayout;
