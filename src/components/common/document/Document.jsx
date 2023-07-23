import InfoGroup from "./InfoGroup";
import DocumentHeading from "./DocumentHeading";
import Description from "./Description";
import styled from "styled-components";

const Container = styled.div`
  width: 22rem;
  height: 100vh;

  position: fixed;
  left: 20rem;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  overflow: hidden;
`;

const Box = styled.div`
  margin: 1rem 0 2.5rem 0;
`;

const Document = () => {
  return (
    <>
      <Container>
        <DocumentHeading>기본 정보</DocumentHeading>
        <Box>
          <InfoGroup htmlFor="title" label="시설 명칭">
            전남대 공과대학
          </InfoGroup>
          <InfoGroup htmlFor="category" label="카테고리">
            학교 건물
          </InfoGroup>
          <InfoGroup className="location" htmlFor="location" label="위치">
            전남대학교 북구 용봉로 77
          </InfoGroup>
        </Box>
        <DocumentHeading>내용</DocumentHeading>
        <Description>
          hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가hi여러분방가방가
        </Description>
      </Container>
    </>
  );
};

export default Document;
