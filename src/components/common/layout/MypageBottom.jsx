import { Container } from "@/styles/DocsList";
import { styled } from "styled-components";
import { IoRemoveOutline } from "react-icons/io5";
import Icon from "../Icon";
import routes from "@/routes";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logout from "../Logout";

const MypageBottom = () => {
  const [display, setDisplay] = useState(false);
  return (
    <BottomStyle display={display}>
      <Icon
        color="rgba(170, 170, 170, 0.69)"
        size="3rem"
        className="icon"
        margin="0"
        hoverColor="#949494"
      >
        <IoRemoveOutline onClick={() => setDisplay((prop) => !prop)} />
      </Icon>

      <ul className="mypageSidebar">
        <MyList to={routes.myPage}>- 회원정보 수정</MyList>
        <MyList to={routes.scrap}>- 스크랩 한 문서</MyList>
        <Logout className="logout" />
      </ul>
    </BottomStyle>
  );
};

const BottomStyle = styled(Container)`
  height: ${(props) => (props.display ? "260px" : "20px")};
  transition: height 0.2s ease-in-out;
  overflow: hidden;

  .icon {
    position: relative;
    bottom: 2.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mypageSidebar {
    font-size: 1.1rem;
    margin: 0 0 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .logout {
    position: relative;
    right: -136px;
  }
`;

const MyList = styled(NavLink)`
  font-weight: 300;
  color: rgba(83, 90, 97, 1);
  padding-bottom: 1rem;
  margin-bottom: 1.2rem;
  cursor: pointer;
  border-bottom: 1px solid #e5e5e5;
  text-decoration: none;
  &:hover {
    font-weight: 900;
  }
  &.active {
    color: #202020;
    font-weight: 800;
  }
`;

export default MypageBottom;
