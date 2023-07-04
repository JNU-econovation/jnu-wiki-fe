import React from "react";
import styled from 'styled-components';
import routes from "../../../routes";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faSquarePen } from "@fortawesome/free-solid-svg-icons";


const Container = styled.div`
    width : 325px;
    height : 734px;
    background-color : white;
    box-shadow:3px 5px 15px rgba(0, 0, 0, 0.25);
    position:absolute;
    top:100px;
    left:0;

    display:flex;
    flex-direction: column;
    align-items: center;
    
    `

const MenuList = styled.div`
    display:flex;
    list-style-type: none;
    background-color : white;
    color:rgba(95, 150, 107, 1);
    width : 277px;
    margin :8px;
    height:48px;
    border-radius:3px;
    font-size:16px;
    

    &:first-child {
        margin-top:32px;
    }


    &:hover{  
        background-color : rgba(222, 233, 224, 1);
        color :rgba(33, 109, 50, 1);
        font-size:16px;
        font-weight: 600;
      }

    `



function Sidebar() {
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <MenuList onClick={() => { navigate(routes.home); }}>
                    <FontAwesomeIcon icon={faHouse} size="30px" />
                    Home
                </MenuList>

                <MenuList onClick={() => { navigate(routes.addPosts); }}>
                    <FontAwesomeIcon icon={faSquarePen} />
                    Add Posts</MenuList>

                <MenuList onClick={() => { navigate(routes.mypage); }}>
                    <FontAwesomeIcon icon={faUser} />Mypage</MenuList>
            </Container>

        </>

    )
}

export default Sidebar;