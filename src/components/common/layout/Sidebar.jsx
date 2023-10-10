import { useEffect, useState } from "react";
import styled from "styled-components";
import routes from "@/routes";
import MenuList from "./SidebarList";
import { GoHomeFill } from "react-icons/go";
import { FaPenSquare } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiTwotoneSetting } from "react-icons/ai";
import { useLocation } from "react-router-dom";
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
`;

function Sidebar({ onClick, viewActive, adminActive, myActive, scrapActive }) {
  const user = useSelector((state) => state.user);
  const { role } = user;
  //회원정보 가져오기, 이때 회원정보 중

  return (
    <Container>
      <MenuList
        onClick={onClick}
        name="홈"
        icons={<GoHomeFill />}
        route={routes.home}
        isActive={viewActive}
      ></MenuList>

      <MenuList
        onClick={onClick}
        name="게시글 작성"
        icons={<FaPenSquare />}
        route={routes.addPost}
      ></MenuList>

      <MenuList
        name="마이페이지"
        icons={<HiMiniUserGroup />}
        route={routes.myPage}
        isActive={myActive}
        onClick={onClick}
        scrapActive={scrapActive}
      ></MenuList>

      {role === "ADMIN" ? (
        <MenuList
          name="관리자"
          icons={<AiTwotoneSetting />}
          route={routes.admin}
          isActive={adminActive}
        ></MenuList>
      ) : null}
    </Container>
  );
}

export default Sidebar;
