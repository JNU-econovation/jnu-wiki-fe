import styled from "styled-components";
import mainLogo from "/public/main-logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import routes from "@/routes";
import Swal from "sweetalert2";
import { SlLogout } from "react-icons/Sl";
import SearchBar from "@/components/search/SearchBar";
import { getUserInfo } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

const token = localStorage.getItem("token");

const Header = () => {
  const navigate = useNavigate();
  const [JWT, setJWT] = useState(token);
  const { data } = useQuery(["member_info"], getUserInfo);
  const nickName = data?.data?.response.nickName;

  const popUpLogout = () => {
    return Swal.fire({
      icon: "question",
      text: "로그아웃 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      confirmButtonColor: "#429f50",
      cancelButtonColor: "#d33",
    });
  };

  const logOutUser = () => {
    localStorage.clear();
    setJWT(null);
    location.reload();
  };

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
              <Button
                color="primary"
                border="1px solid"
                border-color="primary"
                onClick={() => navigate(routes.join)}
              >
                회원가입
              </Button>
              <Button
                color="white"
                backgroundcolor="primary"
                onClick={() => navigate(routes.login)}
              >
                로그인
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup>
              <NameInfo>
                <div>{nickName}</div>
                <button
                  className="logout-btn"
                  onClick={() => {
                    popUpLogout().then((result) => {
                      if (result.isConfirmed) {
                        logOutUser();
                      }
                    });
                  }}
                >
                  <SlLogout size={"21px"} />
                </button>
              </NameInfo>
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
  width: 8rem;
  margin: 1rem 8rem 1rem 1rem;
  cursor: pointer;
`;

const Line = styled.hr`
  background-color: #216d32;
  height: 0.7px;
  margin: 0;
`;

const ButtonGroup = styled.div`
  position: fixed;
  right: 4rem;
`;

const NameInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .logout-btn {
    margin-left: 2rem;
  }
`;

export default Header;
