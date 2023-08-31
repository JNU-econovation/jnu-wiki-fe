import Sidebar from "./Sidebar";
import Header from "./Header";
import { mypageTestData } from "../form/MypageTestData";

const MainLayout = ({
  viewActive,
  adminActive,
  myActive,
  children,
  onClick,
}) => {
  return (
    <>
      <Sidebar
        viewActive={viewActive}
        adminActive={adminActive}
        myActive={myActive}
        onClick={onClick}
      />
      <Header />
      {children}
    </>
  );
};
export default MainLayout;
