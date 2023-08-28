import styled from "styled-components";
import "/public/fonts/pretendard.css";
import jnuLogo from "/public/jnu-logo.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import routes from "../../../routes";
import Swal from "sweetalert2";
import { SlLogout } from "react-icons/Sl";
import SearchBar from "../search/SearchBar";

const token = localStorage.getItem("token");

const Header = () => {
  const navigate = useNavigate();

  const [JWT, setJWT] = useState(token);
  useEffect(() => {
    setJWT(localStorage.getItem("token"));
  }, [JWT]);

  return (
    <>
      <Container>
        <HeaderDiv>
          <LogoImg
            src={jnuLogo}
            alt="jnu-logo"
            onClick={() => {
              navigate(routes.home);
              location.reload();
            }}
          />
          <LogoTitle
            onClick={() => {
              navigate(routes.home);
              location.reload();
            }}
          >
            전대
            <br />
            위키
          </LogoTitle>
          <SearchBar />
          {!JWT ? (
            <>
              {" "}
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
            </>
          ) : (
            <>
              <div>{name}</div>
              <button
                type="click"
                onClick={() => {
                  Swal.fire({
                    icon: "question",
                    text: "로그아웃 하시겠습니까?",
                    showCancelButton: true,
                    confirmButtonText: "예",
                    cancelButtonText: "아니오",
                    confirmButtonColor: "#429f50",
                    cancelButtonColor: "#d33",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      localStorage.removeItem("token");
                      localStorage.removeItem("role");
                      setJWT(null);
                    }
                  });
                }}
              >
                <SlLogout size={"21px"} />
              </button>
            </>
          )}
        </HeaderDiv>
        <Line />
      </Container>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: white;
  z-index: 3;
  box-sizing: border-box;
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

const Line = styled.hr`
  background-color: #216d32;
  height: 0.7px;
  margin: 0;
`;
export default Header;
