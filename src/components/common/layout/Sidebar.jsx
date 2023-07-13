import React from "react";
import styled from 'styled-components';
import routes from "../../../routes";
import MenuList from "./SidebarList";
import { GoHomeFill } from 'react-icons/go';
import { FaPenSquare } from 'react-icons/fa';
import { HiMiniUserGroup } from 'react-icons/hi2';


function Sidebar() {


  return (
    <>
      <SidebarContainer>
        <MenuList name="Home" icons={<GoHomeFill />} route={routes.home}>
        </MenuList>

        <MenuList name="Add Posts" icons={<FaPenSquare />} route={routes.addPost}>
        </MenuList>


        <MenuList name="Mypage" icons={<HiMiniUserGroup />} route={routes.myPage}>
        </MenuList>
      </SidebarContainer >

    </>

  )
}


const SidebarContainer = styled.div`
    width : 20rem;
    height : 40rem;

    background-color : white;
    box-shadow:0.2rem 0.5rem 0.7rem rgba(0, 0, 0, 0.25);

    position:absolute;
    /* position: sticky; */
    top:6rem;
    left:0;

    display:flex;
    flex-direction: column;
    align-items: center;
    
    `

export default Sidebar;




