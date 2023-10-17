import styled from "styled-components";
import { NavLink } from "react-router-dom";
import MypageSidebar from "./MypageSidebar";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notClickState, onClickState } from "../../../store/sidebar";

export const MenuIcon = styled.div`
  font-size: 2rem;
  padding: 0 1rem;
`;

const MenuList = ({ name, icons, route, isActive, scrapActive }) => {
  const act = isActive;
  const dispatch = useDispatch();
  const click = useSelector((state) => state.sidebar.click);
  // const [click, setClick] = useState(false);
  const clickDown = (e) => {
    console.log(e.target);
    // setClick(!click);
    click ? dispatch(notClickState()) : dispatch(onClickState());

    console.log(click);
  };
  return (
    <>
      <NavStyle to={route} id={act ? "active" : null}>
        <MenuIcon>{icons}</MenuIcon>
        {name}
        {name === "마이페이지" ? (
          click ? (
            <BsFillCaretUpFill className="icon" onClick={(e) => clickDown(e)} />
          ) : (
            <BsFillCaretDownFill
              className="icon"
              onClick={(e) => clickDown(e)}
            />
          )
        ) : (
          <></>
        )}
      </NavStyle>
      {name === "마이페이지" && (
        <>
          {click && <MypageSidebar scrapActive={scrapActive}></MypageSidebar>}
          {/* {isActive ? (
            <MypageSidebar scrapActive={scrapActive}></MypageSidebar>
          ) : null} */}
        </>
      )}
    </>
  );
};

const NavStyle = styled(NavLink)`
  display: flex;
  align-items: center;
  list-style-type: none;

  font-weight: 300;
  background-color: white;
  color: rgba(95, 150, 107, 1);

  width: 13rem;
  margin: 0.5rem;
  height: 3rem;
  border-radius: 0.2rem;
  font-size: 1rem;

  cursor: pointer;

  &:first-child {
    margin-top: 2rem;
  }

  &:link {
    transition: 0.1s;
    text-decoration: none;
  }
  &.active {
    background-color: rgba(222, 233, 224, 1);
    color: rgba(33, 109, 50, 1);
    font-size: 1rem;
    font-weight: 600;
  }
  &:hover {
    background-color: rgba(222, 233, 224, 1);
    color: rgba(33, 109, 50, 1);
    font-size: 1rem;
    font-weight: 600;
  }
  &#active {
    background-color: rgba(222, 233, 224, 1);
    color: rgba(33, 109, 50, 1);
    font-size: 1rem;
    font-weight: 600;
  }
  .icon {
    margin-left: 2.5rem;
    font-size: 20px;
  }
  .icon:hover {
    background-color: #6767673d;
    border-radius: 5px;
  }
`;

export default MenuList;
