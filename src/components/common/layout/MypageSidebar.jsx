import styled from "styled-components";
import routes from "@/routes";
import { NavLink } from "react-router-dom";

const ListBox = styled.div`
  background-color: ${(props) =>
    props.isActive === true && "rgba(222, 233, 224, 0.27)"};
  position: relative;
  bottom: 0.5rem;
  @media screen and (max-width: 1023px) {
    background-color: transparent;
  }
`;
const MyList = styled(NavLink)`
  display: flex;
  align-items: center;
  list-style-type: none;

  font-weight: 300;
  color: rgba(83, 90, 97, 1);

  width: 10rem;
  margin: 0.5rem;
  margin-left: 0.7rem;
  height: 3rem;
  padding-left: 1.8rem;

  border-radius: 0.2rem;
  font-size: 0.9rem;

  text-decoration: none;

  &.active {
    color: #202020;
    font-size: 1rem;
    font-weight: 800;
  }
  &:hover {
    color: #202020;
    font-size: 1rem;
    font-weight: 800;
  }

  cursor: pointer;
`;
const MypageSidebar = ({ isActive }) => {
  return (
    <ListBox isActive={isActive}>
      <MyList to={routes.myPage}>- 회원정보 수정</MyList>
      <MyList to={routes.scrap} id={isActive && "active"}>
        - 스크랩
      </MyList>
    </ListBox>
  );
};

export default MypageSidebar;
