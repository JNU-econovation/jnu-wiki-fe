import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ active,children }) => {
  return (
    <>
      <Sidebar active={active} />
      <Header />
      {children}
    </>
  );
};
export default MainLayout;
