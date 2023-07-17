import styled from "styled-components";
import DocumentInputGroup from "./DocumentInputGroup";
import { helperMsg } from "../../../utils/helpermsg";

const Container = styled.div`
  width: 22rem;
  height: 45rem;

  position: fixed;
  left: 20rem;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
`;

const CreateDocument = () => {
  return (
    <>
      <Container className="go">
        <DocumentInputGroup
          htmlFor="title"
          id="title"
          placeholder={helperMsg.title}
        >
          문서 제목
        </DocumentInputGroup>
        <DocumentInputGroup
          htmlFor="location"
          id="location"
          placeholder={helperMsg.location}
        >
          위치
        </DocumentInputGroup>
        <DocumentInputGroup
          htmlFor="category"
          id="category"
          placeholder={helperMsg.category}
        >
          카테고리
        </DocumentInputGroup>
      </Container>
    </>
  );
};

export default CreateDocument;
