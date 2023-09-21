import Sidebar from "./Sidebar";
import Header from "./Header";
import { mypageTestData } from "../form/MypageTestData";

const MainLayout = ({
  viewActive,
  adminActive,
  myActive,
  children,
  onClick,
  scrapActive,
}) => {
  return (
    <>
      <Sidebar
        viewActive={viewActive}
        adminActive={adminActive}
        myActive={myActive}
        onClick={onClick}
        scrapActive={scrapActive}
      />
      <Header />
      {children}
    </>
  );
};
export default MainLayout;
