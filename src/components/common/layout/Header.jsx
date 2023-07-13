import styled from "styled-components";
import "/public/fonts/pretendard.css";
import jnuLogo from "/public/jnu-logo.svg";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import routes from "../../../routes";

const Header = () => {
  const navigate = useNavigate();
  const focusRef = useRef(null);

  const onFocusSearchBar = () => {
    focusRef.current.placeholder = "";
  };

  const onBlurSearchBar = () => {
    focusRef.current.placeholder = "      검색";
  };

  return (
    <>
      <Container>
        <HeaderDiv>
          <LogoImg
            src={jnuLogo}
            alt="jnu-logo"
            onClick={() => navigate(routes.home)}
          />
          <LogoTitle onClick={() => navigate(routes.home)}>
            전대
            <br />
            위키
          </LogoTitle>
          <SearchBar
            type="search"
            placeholder="      검색"
            ref={focusRef}
            onFocus={onFocusSearchBar}
            onBlur={onBlurSearchBar}
          />
          <Button
            type="click"
            color="primary"
            border="1px solid #216D32"
            backgroundcolor="white"
            onClick={() => navigate(routes.join)}
          >
            회원가입
          </Button>
          <Button
            type="click"
            color="white"
            border="none"
            backgroundcolor="primary"
            onClick={() => navigate(routes.login)}
          >
            로그인
          </Button>
        </HeaderDiv>
        <Line />
      </Container>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 6rem;
  background-color: white;
  z-index: 3;
`;
const HeaderDiv = styled.header`
  display: flex;
  align-items: center;

  margin: 0.25rem 3rem;
`;

const LogoImg = styled.img`
  width: 3.2rem;
  cursor: pointer;
`;

const LogoTitle = styled.span`
  font-family: var(--font-pretendard-light);
  font-size: 25px;
  margin: 1rem;
  color: #3f8e49;
  width: 15rem;
  cursor: pointer;
`;

const SearchBar = styled.input`
  width: 60rem;
  height: 3rem;
  padding: 1.3rem;
  margin-right: 7rem;

  border: 0.5px solid #71717118;
  border-radius: 10px;
  box-shadow: 0px 0px 1px 0px rgba(9, 30, 66, 0.31),
    0px 4px 4px 0px rgba(0, 0, 0, 0.2);

  &::-webkit-input-placeholder {
    background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png);
    background-size: contain;
    background-repeat: no-repeat;
    text-indent: 0;
  }
`;

const Line = styled.hr`
  background-color: #216d32;
  height: 0.7px;
`;
export default Header;
