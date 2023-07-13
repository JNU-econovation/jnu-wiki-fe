import React from "react";
import styled from "styled-components";
import routes from "../../../routes";
import MenuList from "./SidebarList";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaPenSquare } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";

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
`;

function Sidebar() {
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
      </Container>
    </>
  );
}

export default Sidebar;
