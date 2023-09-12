import styled from "styled-components";
import Map from "../layout/Map";
import ScrapBtn from "../document/ScrapBtn";
const Container = styled.div`
  overflow: hidden;
  position: absolute;
  left: 20rem;
  overflow-x: hidden;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);

  width: 20rem;
`;

const Div = styled.div`
  padding-left: 1rem;
  display: flex;
  align-items: center;
  list-style-type: none;

  width: 20rem;
  height: 3rem;
  border-radius: 0.2rem;
  font-size: 1rem;

  background-color: rgba(222, 233, 224, 1);
  color: rgba(33, 109, 50, 1);
  font-weight: 600;

  &:first-child {
    margin-top: 2rem;
  }
  position: relative;
  right: 0.5rem;
  bottom: 2rem;
`;

const ScrabStyle = styled.div`
  color: #216d32;

  display: flex;
  flex-direction: column;

  min-width: 15rem;
  max-width: 22rem;

  cursor: pointer;

  .title {
    font-size: 1.1rem;
    font-weight: bold;

    margin-right: 0.8rem;
    margin-bottom: 1.3rem;

    display: flex;
    justify-content: space-between;
  }

  .category {
    font-size: 0.8rem;
  }
`;
const StyledHr = styled.hr`
  background-color: #8ea192;
  margin: 1.4rem 0;
`;
let nickname = "쿠키";

const MypageScrap = () => {
  return (
    <Container>
      <Div> {nickname}님이 스크랩한 장소입니다 :)</Div>

      <ScrabStyle>
        <div className="title">
          <div>예향정</div>
          <ScrapBtn />
        </div>
        <span className="category">카테고리</span>
      </ScrabStyle>
      <StyledHr />

      <Map />
    </Container>
  );
};

export default MypageScrap;
