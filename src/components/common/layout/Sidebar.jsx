import { useEffect, useState } from "react";
import styled from "styled-components";
import routes from "../../../routes";
import MenuList from "./SidebarList";
import CreateDocument from "../document/CreateDocument";
import DocsList from "../search/DocsList";
import { GoHomeFill } from "react-icons/go";
import { FaPenSquare } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiTwotoneSetting } from "react-icons/ai";
import { SlDocs } from "react-icons/Sl";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 20rem;
  height: 100vh;
  background-color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 6rem;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 3;
`;

const DocumentWrapper = styled.div`
  animation: fade-in 0.4s;
  -webkit-animation: fade-in 0.4s;

  @-webkit-keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

function Sidebar() {
  const location = useLocation();
  const [addShow, setAddShow] = useState(false);
  const [viewShow, setViewShow] = useState(false);

  const handleClick = (type) => {
    if (type === "addPost") {
      setAddShow((addShow) => !addShow);
      setViewShow(false);
    } else if (type === "viewPost") {
      setViewShow((viewShow) => !viewShow);
      if (location.pathname !== "/") window.location.replace("/");
      setAddShow(false);
    } else {
      setAddShow(false);
      setViewShow(false);
    }
  };

  const [role, setRole] = useState(window.localStorage.getItem("role"));
  useEffect(() => {
    setRole(window.localStorage.getItem("role"));
  }, []);
  //회원정보 가져오기, 이때 회원정보 중

  return (
    <>
      <Container>
        <MenuList
          onClick={() => handleClick("home")}
          name="Home"
          icons={<GoHomeFill />}
          route={routes.home}
        ></MenuList>

        <MenuList
          onClick={() => {
            handleClick("addPost");
          }}
          name="Add Posts"
          icons={<FaPenSquare />}
          // route={routes.addPost}
        ></MenuList>

        <MenuList
          onClick={() => {
            handleClick("viewPost");
          }}
          name="View Posts"
          icons={<SlDocs />}
          // route={routes.documentList}
        ></MenuList>
        <MenuList
          name="Mypage"
          icons={<HiMiniUserGroup />}
          route={routes.myPage}
        ></MenuList>
        {role === "admin" ? (
          <MenuList
            name="Admin"
            icons={<AiTwotoneSetting />}
            route={routes.admin}
          ></MenuList>
        ) : null}
      </Container>

      <DocumentWrapper>
        {addShow ? <CreateDocument /> : undefined}
        {viewShow ? <DocsList /> : undefined}
      </DocumentWrapper>
    </>
  );
}

export default Sidebar;
