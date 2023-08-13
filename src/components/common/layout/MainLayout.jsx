import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ active, children, onClick }) => {
  return (
    <>
      <Sidebar active={active} onClick={onClick} />
      <Header />
      {children}
    </>
  );
};
export default MainLayout;
