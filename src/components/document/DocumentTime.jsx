import styled from "styled-components";

const DocumentTime = ({ children }) => {
  return (
    <>
      <Container>
        <span>
          마지막 편집 시간
          <br />
        </span>
        <span>{children}</span>
      </Container>
    </>
  );
};

const Container = styled.div`
  font-size: 0.7rem;
  color: #89b090;
  float: right;
  text-align: right;
  width: 12rem;
`;

export default DocumentTime;
