import styled from "styled-components";
import "/public/fonts/pretendard.css";
import jnuLogo from "/public/jnu-logo.svg";
import { useState } from "react";
import Button from "./Button";
import routes from "../../../routes";

const Header = () => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const placeholderText = focus ? "" : "      검색";

  return (
    <>
      <HeaderDiv>
        <LogoImg src={jnuLogo} alt="jnu-logo" />
        <LogoTitle>
          전대
          <br />
          위키
        </LogoTitle>
        <SearchBar
          type="search"
          placeholder={placeholderText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Button
          type="button"
          name="회원가입"
          color="primary"
          border="1px solid #216D32"
          backgroundColor="white"

        ></Button>
        <Button
          type="button"
          name="로그인"
          color="white"
          border="none"
          backgroundColor="primary"

        ></Button>
      </HeaderDiv>
    </>
  );
};

const HeaderDiv = styled.header`
  display: flex;
  align-items: center;

  margin: 1rem 3rem;
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

export default Header;
