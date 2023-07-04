import React from "react";
import styled from 'styled-components';
import routes from "../../../routes";
import MenuList from "./SidebarList";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from 'react-icons/go';
import { FaPenSquare } from 'react-icons/fa';
import { HiMiniUserGroup } from 'react-icons/hi2';


const Container = styled.div`
    width : 20rem;
    height : 45rem;
    background-color : white;
    box-shadow:0.2rem 0.3rem 1rem rgba(0, 0, 0, 0.25);
    position:absolute;
    top:6rem;
    left:0;

    display:flex;
    flex-direction: column;
    align-items: center;
    
    `



function Sidebar() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <MenuList name="Home" icons={<GoHomeFill />} onClick={() => { navigate(routes.home); }}>
        </MenuList>

        <MenuList name="Add Posts" icons={<FaPenSquare />} onClick={() => { navigate(routes.addPosts); }}>
        </MenuList>


        <MenuList name="Mypage" icons={<HiMiniUserGroup />} onClick={() => { navigate(routes.mypage); }}>
        </MenuList>
      </Container >

    </>

  )
}

export default Sidebar;
