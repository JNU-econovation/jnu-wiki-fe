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
    <div ref={node}>
      <HeaderButtons isMenu={clicked} onClick={handleOnClick} />
      <Header isDisplay={isDisplay} isMenu={clicked} />
      <div>
        <Sidebar
          onClick={onClick}
          isActive={isActive}
          myPageClicked={myPageClicked}
          isMenu={clicked}
        />
      </div>
      {children}
    </div>
  );
};
export default MainLayout;
