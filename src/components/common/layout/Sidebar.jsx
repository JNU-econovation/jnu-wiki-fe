import styled from "styled-components";
import routes from "@/routes";
import MenuList from "./SidebarList";
import { GoHomeFill } from "react-icons/go";
import { FaPenSquare } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiTwotoneSetting } from "react-icons/ai";
import { useSelector } from "react-redux";

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

const Container = styled.nav`
  width: 15rem;
  height: 100vh;

  background-color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  position: fixed;
  top: 6.3rem;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 3;

  @media screen and (max-width: 1023px) {
    display: ${(props) => (props.isMenu ? "flex" : "none")};
    background-color: white;
    box-shadow: -5px 0px 30px -1px rgba(0, 0, 0, 0.25);

    width: 12rem;
    top: 0;
    left: auto;
    right: 0;
    padding-left: 1rem;

    & > * {
      position: relative;
      top: 4rem;
    }
  }
`;

export default Sidebar;
