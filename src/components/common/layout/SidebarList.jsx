import styled from "styled-components";
import { NavLink } from "react-router-dom";
import MypageSidebar from "./MypageSidebar";

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
  &:hover {
    background-color: rgba(222, 233, 224, 1);
    color: rgba(33, 109, 50, 1);
    font-weight: 600;
  }
  &.active {
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
`;

export const MenuIcon = styled.div`
  font-size: 2rem;
  padding: 0 1rem;
`;
const Ic = styled.div`
  position: absolute;
  right: 15%;
  color: ${(props) => props.color};
`;

const MenuList = ({ name, icons, route, isActive, onClick }) => {
  const act = isActive;
  return (
    <>
      <NavStyle
        to={route}
        // onClick={}
        id={act ? "active" : null}
        onClick={onClick}
      >
        <MenuIcon>{icons}</MenuIcon>
        {name}
      </NavStyle>
      {name === "마이페이지" ? (
        <>{isActive ? <MypageSidebar></MypageSidebar> : null}</>
      ) : null}
    </>
  );
};

export default MenuList;
