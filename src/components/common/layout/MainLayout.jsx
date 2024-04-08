import Sidebar from "./Sidebar";
import Header from "./Header";
import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";
import HeaderButtons from "../button/HeaderButtons";

const MainLayout = ({
  children,
  onClick,
  isActive,
  myPageClicked,
  isDisplay,
}) => {
  const { node, clicked, handleOnClick } = useHandleClickOutside();

  return (
    <section ref={node}>
      <HeaderButtons isMenu={clicked} onClick={handleOnClick} />
      <Header isDisplay={isDisplay} isMenu={clicked} />
      <Sidebar
        onClick={onClick}
        isActive={isActive}
        myPageClicked={myPageClicked}
        isMenu={clicked}
      />
      {children}
    </section>
  );
};
export default MainLayout;
