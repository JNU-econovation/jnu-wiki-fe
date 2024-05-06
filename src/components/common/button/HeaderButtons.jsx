import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "@/components/common/button/Button";
import routes from "@/routes";
import Profile from "@/components/common/layout/Profile";

const HeaderButtons = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <ButtonGroup>
      {isLogin ? (
        <Profile />
      ) : (
        <BeforeLoginGroup>
          <JoinBtn onClick={() => navigate(routes.join)}>회원가입</JoinBtn>
          <LoginBtn onClick={() => navigate(routes.login)}>로그인</LoginBtn>
        </BeforeLoginGroup>
      )}
    </ButtonGroup>
  );
};

const BeforeLoginGroup = styled.section`
  > * {
    color: #4f4f4f;
    font-size: 1.1rem;
    width: 5rem;

    &:hover {
      color: #216d32;
      font-weight: bold;
    }
  }
`;

const JoinBtn = styled(Button)`
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const LoginBtn = styled(Button)`
  @media screen and (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const ButtonGroup = styled.section`
  position: absolute;
  right: 0;
`;

export default HeaderButtons;
