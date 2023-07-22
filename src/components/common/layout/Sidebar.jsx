import { useEffect, useState } from "react";
import styled from "styled-components";
import routes from "../../../routes";
import MenuList from "./SidebarList";
import { GoHomeFill } from "react-icons/go";
import { FaPenSquare } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiTwotoneSetting } from "react-icons/ai";

const Container = styled.div`
  width: 20rem;
  height: 45rem;
  background-color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 6rem;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 3;
`;

function Sidebar() {
  const [role, setRole] = useState(window.localStorage.getItem('role'));
  useEffect(
    () => { setRole(window.localStorage.getItem('role')) }, [])
  //회원정보 가져오기, 이때 회원정보 중 

  return (
    <>
      <Container>
        <MenuList
          name="Home"
          icons={<GoHomeFill />}
          route={routes.home}
        ></MenuList>

        <MenuList
          name="Add Posts"
          icons={<FaPenSquare />}
          route={routes.addPost}
        ></MenuList>

        <MenuList
          name="Mypage"
          icons={<HiMiniUserGroup />}
          route={routes.myPage}
        ></MenuList>
        {role === 'admin' ?
          <MenuList
            name="Admin"
            icons={<AiTwotoneSetting />}
            route={routes.admin}
          ></MenuList>
          : null}

      </Container>
    </>
  );
}

export default Sidebar;
