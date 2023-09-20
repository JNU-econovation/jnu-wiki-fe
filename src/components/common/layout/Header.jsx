import styled from "styled-components";
import "/public/fonts/pretendard.css";
import mainLogo from "/public/main-logo.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import routes from "../../../routes";
import Swal from "sweetalert2";
import { SlLogout } from "react-icons/Sl";
import SearchBar from "../../search/SearchBar";

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
            src={mainLogo}
            alt="jnu-logo"
            onClick={() => {
              navigate(routes.home);
              location.reload();
            }}
          />
          <SearchBar />
          {!JWT ? (
            <ButtonGroup>
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
            </ButtonGroup>
          ) : (
            <ButtonGroup>
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
                      window.location.reload();
                    }
                  });
                }}
              >
                <SlLogout size={"21px"} />
              </button>
            </ButtonGroup>
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
  margin: 0.7rem;
  width: 8rem;
  margin: 1rem 8rem 0.7rem 0.5rem;
  cursor: pointer;
`;

const Line = styled.hr`
  background-color: #216d32;
  height: 0.7px;
  margin: 0;
`;

const ButtonGroup = styled.div`
  position: fixed;
  right: 5rem;
`;
export default Header;
