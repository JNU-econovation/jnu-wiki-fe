import styled from "styled-components";
import { NavLink } from "react-router-dom";
import MypageSidebar from "./MypageSidebar";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import MypageBottom from "./MypageBottom";
const MenuList = ({ name, icons, route, isActive, myPageClicked, onClick }) => {
  const [clicked, setClicked] = useState(myPageClicked);
  const [act, setAct] = useState(isActive);

  //resize 할때마다 렌더링 되게 수정
  const ipad = matchMedia("screen and (max-width: 1023px)");

  const handleOnClick = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev);
  };

  useEffect(() => {
    if (clicked) {
      setAct(true);
    }
  }, []);

  return (
    <>
      <NavStyle to={route} id={act ? "active" : null} onClick={onClick}>
        <MenuIcon>{icons}</MenuIcon>
        {name}
        {name === "마이페이지" &&
          (clicked ? (
            <BsFillCaretUpFill className="icon" onClick={handleOnClick} />
          ) : (
            <BsFillCaretDownFill className="icon" onClick={handleOnClick} />
          ))}
      </NavStyle>
      {clicked && !ipad.matches && <MypageSidebar isActive={act} />}
      {clicked && ipad.matches && <MypageBottom></MypageBottom>}
    </>
  );
};

export const MenuIcon = styled.div`
  font-size: 2rem;
  padding: 0 1rem;

  @media screen and (max-width: 1023px) {
    font-size: 1.3rem;
  }
`;

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

  @media screen and (max-width: 1023px) {
    justify-content: center;
    flex-direction: column;
    margin: 0;
    height: 3.4rem;

    &:first-child {
      margin: 0;
    }

    .icon {
      display: none;
    }
  }
`;

export default MenuList;
