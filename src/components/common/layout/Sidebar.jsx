import React from "react";
import styled from "styled-components";
import routes from "../../../routes";
import MenuList from "./SidebarList";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaPenSquare } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { useState, useRef, useEffect } from "react";
import CreateDocument from "../Document/CreateDocument";

const Container = styled.div`
  width: 20rem;
  height: 50rem;
  background-color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 6rem;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DocumentWrapper = styled.div`
  opacity: ${({ isvisible }) => (isvisible ? 1 : 0)};
  transition: opacity 0.2s ease-out;
`;

function Sidebar() {
  const [isShow, setShow] = useState(false);

  const handleClick = () => {
    setShow(!isShow);
  };

  return (
    <>
      <Container>
        <MenuList
          onClick={routes.home}
          name="Home"
          icons={<GoHomeFill />}
          route={routes.home}
        ></MenuList>

        <MenuList
          onClick={handleClick}
          name="Add Posts"
          icons={<FaPenSquare />}
          // route={routes.addPost}
        ></MenuList>

        <MenuList
          onClick={handleClick}
          name="Mypage"
          icons={<HiMiniUserGroup />}
          route={routes.myPage}
        ></MenuList>
      </Container>

      <DocumentWrapper isvisible={isShow}>
        <CreateDocument />
      </DocumentWrapper>
    </>
  );
}

export default Sidebar;
