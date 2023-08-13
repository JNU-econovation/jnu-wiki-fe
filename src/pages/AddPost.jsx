import Sidebar from "../components/common/layout/Sidebar";
import Header from "../components/common/layout/Header";
import Map from "../components/common/layout/Map";
import CreateDocument from "../components/common/document/CreateDocument";
import { useState } from "react";
import styled from "styled-components";

const DocumentWrapper = styled.div`
  -webkit-animation: fade-in 1s;

  @-webkit-keyframes fade-in {
    0% {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;

const AddPost = () => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <Sidebar onClick={handleShow} />
      <Header />
      <DocumentWrapper>{show ? <CreateDocument /> : undefined}</DocumentWrapper>
      <Map />
    </>
  );
};

export default AddPost;
