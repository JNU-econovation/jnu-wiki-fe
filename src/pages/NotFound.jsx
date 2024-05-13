import Button from "@/components/common/button/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>404</Title>
      <SubTitle>원하시는 페이지를 찾을 수 없어요.</SubTitle>
      <ButtonGroup>
        <GoPrev onClick={() => navigate(-1)}>이전으로</GoPrev>
        <GoHome onClick={() => navigate("/")}>홈으로</GoHome>
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 8rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 767px) {
    font-size: 5rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.5rem;

  @media screen and (max-width: 767px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.section`
  display: flex;
  margin-top: 3rem;
  > * {
    width: 8rem;
  }
`;

const GoPrev = styled(Button)`
  border: 1px solid;
  border-color: #216d32;
  color: #216d32;
`;

const GoHome = styled(Button)`
  background-color: #216d32;
  color: white;
`;

export default NotFound;
