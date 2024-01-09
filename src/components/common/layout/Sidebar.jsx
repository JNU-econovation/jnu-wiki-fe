import styled from "styled-components";
import routes from "@/routes";
import MenuList from "./SidebarList";
import { GoHomeFill } from "react-icons/go";
import { FaPenSquare } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiTwotoneSetting } from "react-icons/ai";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 15rem;
  height: 100vh;

  background-color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  position: fixed;
  top: 6rem;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 3;

  @media screen and (max-width: 1023px) {
    background-color: white;
    box-shadow: none;

    flex-direction: row;
    justify-content: center;

    width: 100vw;
    height: 3.4rem;

    top: auto;
    bottom: 0;
  }
`;

function Sidebar({ isActive, myPageClicked, onClick }) {
  const user = useSelector((state) => state.user);
  const { role } = user;

  return (
    <Container>
      <MenuList
        name="홈"
        icons={<GoHomeFill />}
        route={routes.home}
        onClick={onClick}
        isActive={isActive}
      ></MenuList>

      <MenuList
        name="게시글 작성"
        icons={<FaPenSquare />}
        route={routes.addPost}
        onClick={onClick}
      ></MenuList>

      <MenuList
        name="마이페이지"
        icons={<HiMiniUserGroup />}
        route={routes.myPage}
        myPageClicked={myPageClicked}
      ></MenuList>

      {role === "ADMIN" && (
        <MenuList
          name="관리자"
          icons={<AiTwotoneSetting />}
          route={routes.admin}
        ></MenuList>
      )}
    </Container>
  );
}

export default Sidebar;
