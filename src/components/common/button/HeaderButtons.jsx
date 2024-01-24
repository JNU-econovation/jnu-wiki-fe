import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";

import Button from "@/components/common/button/Button";
import routes from "@/routes";
import Profile from "@/components/common/layout/Profile";

const HeaderButtons = ({ isMenu, onClick }) => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <ButtonGroup>
      {!isMenu && <RxHamburgerMenu className="menu" onClick={onClick} />}
      {isLogin ? (
        <Profile isMenu={isMenu} />
      ) : (
        <>
          <JoinBtn onClick={() => navigate(routes.join)}>회원가입</JoinBtn>
          <LoginBtn onClick={() => navigate(routes.login)} isMenu={isMenu}>
            <p className="login-btn">로그인</p>
          </LoginBtn>
        </>
      )}
    </ButtonGroup>
  );
};

const JoinBtn = styled(Button)`
  color: #216d32;
  border: 1px solid;
  border-color: #216d32;

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const LoginBtn = styled(Button)`
  color: white;
  background-color: #216d32;

  @media screen and (max-width: 1023px) {
    display: ${(props) => (props.isMenu ? "block" : "none")};
    background-color: transparent;
    margin-right: 4.5rem;

    .login-btn {
      color: #808080;
    }
  }
`;

const ButtonGroup = styled.div`
  position: fixed;
  z-index: 10;
  top: 2rem;
  right: 3.8rem;

  .menu {
    display: none;
  }

  @media screen and (max-width: 1023px) {
    right: 2rem;

    .menu {
      display: block;
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 767px) {
    top: 1.5rem;
  }
`;

export default HeaderButtons;
