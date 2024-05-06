import styled from "styled-components";
import routes from "@/routes";
import { NavLink } from "react-router-dom";
import Logout from "../Logout";

const MyPageSidebar = ({ isActive, className }) => {
  return (
    <ListBox isActive={isActive} className={className}>
      <MyList to={routes.myPage}>회원정보 수정</MyList>
      <MyList to={routes.scrap} id={isActive && "active"}>
        스크랩
      </MyList>
      <Logout />
    </ListBox>
  );
};

const ListBox = styled.section`
  position: absolute;
  top: 2rem;

  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0px 10px 20px -4px rgba(0, 0, 0, 0.106);
`;

const MyList = styled(NavLink)`
  display: flex;
  align-items: center;

  width: 10rem;
  height: 2rem;

  padding-left: 1rem;
  margin: 1rem 0.5rem;

  font-size: 1rem;
  color: rgba(83, 90, 97, 1);
  text-decoration: none;

  cursor: pointer;

  &.active,
  &:hover {
    color: #202020;
    font-weight: 800;
  }

  @media screen and (max-width: 767px) {
    font-size: 0.9rem;

    width: 8rem;
    height: 1rem;
  }
`;

export default MyPageSidebar;
