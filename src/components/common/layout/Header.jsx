import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import mainLogo from "/main-logo.png";
import routes from "@/routes";
import SearchBar from "@/components/search/SearchBar";

const Header = ({ isDisplay }) => {
  const navigate = useNavigate();

  const reloadHome = () => {
    navigate(routes.home);
    location.reload();
  };

  return (
    <Container>
      <HeaderDiv>
        <LogoImg src={mainLogo} alt="jnu-wiki logo" onClick={reloadHome} />
        <SearchBar isDisplay={isDisplay} />
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

const LogoImg = styled.img`
  width: 8rem;
  margin: 1rem 5rem 1rem 1rem;
  cursor: pointer;

  @media screen and (max-width: 1023px) {
    width: 7rem;
    margin-right: 3rem;
  }

  @media screen and (max-width: 767px) {
    width: 6.5rem;
    margin: 0.5rem;
  }
`;

const Line = styled.hr`
  border: 0;
  margin: 0;
  background-color: #216d32;
  height: 0.7px;
`;

export default Header;
