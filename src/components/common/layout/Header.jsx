import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import jnuwikiLogo from "/jnu-logo.png";
import jnuwiki from "/jnuwiki.png";
import routes from "@/routes";
import SearchBar from "@/components/search/SearchBar";
import HeaderButtons from "../button/HeaderButtons";

const Header = ({ isDisplay }) => {
  const navigate = useNavigate();

  const reloadHome = () => {
    navigate(routes.home);
    location.reload();
  };

  return (
    <Container>
      <HeaderDiv>
        <LogoImg onClick={reloadHome}>
          <img src={jnuwikiLogo} alt="jnu-wiki logo" />
          <img src={jnuwiki} alt="jnu logo" />
        </LogoImg>
        <SearchBar isDisplay={isDisplay} />
        <HeaderButtons />
      </HeaderDiv>
      <Line />
    </Container>
  );
};

const Container = styled.section`
  position: fixed;
  width: 100vw;
  background-color: white;
  z-index: 2;
  box-sizing: border-box;
`;

const HeaderDiv = styled.header`
  position: relative;
  display: flex;
  align-items: center;

  margin: 0.25rem 3rem;

  @media screen and (max-width: 1023px) {
    margin: 0.25rem 1rem;
  }

  @media screen and (max-width: 767px) {
    margin: 0.25rem;
  }
`;

const LogoImg = styled.section`
  display: flex;
  align-items: center;
  margin: 1rem 5rem 1rem 1rem;
  cursor: pointer;

  img {
    width: 3rem;
    height: 3rem;

    &:first-child {
      width: 3.5rem;
      height: 3.5rem;
      margin-right: 1rem;
    }
  }

  @media screen and (max-width: 1023px) {
    margin-right: 3rem;
  }

  @media screen and (max-width: 767px) {
    margin: 0.5rem;
    margin-left: 1rem;

    img {
      &:first-child {
        width: 3rem;
        height: 3rem;
      }

      &:last-child {
        display: none;
      }
    }
  }
`;

const Line = styled.hr`
  border: 0;
  margin: 0;
  background-color: #216d32;
  height: 0.7px;
`;

export default Header;
