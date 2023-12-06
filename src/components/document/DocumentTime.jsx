import styled from "styled-components";

const Container = styled.div`
  font-size: 0.7rem;
  color: #89b090;
  float: right;
  text-align: right;
  width: 12rem;
`;

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

export default DocumentTime;
