import MyInputGroup from "@/components/mypage/MyInfoGroup";
import Container from "@/components/register/Container";
import Title from "@/components/register/Title";
import styled from "styled-components";
import MyBtn from "@/components/mypage/MyBtn";
import { getUserInfo } from "@/services/mypage";
import routes from "@/routes";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/common/layout/Loader";
import { useNavigate } from "react-router-dom";

const MypageForm = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(["mypage"], () => {
    return getUserInfo();
  });

  return (
    <>
      <Container top={true}>
        <Title fontSize="20px" margin="3rem 0 1.5rem 0">
          마이페이지
        </Title>
        <Title fontSize="30px" margin="0 0 3rem 0">
          회원정보
        </Title>
        <InfoStyle>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <MyInputGroup data={data?.data.response?.nickName}>
                닉네임
              </MyInputGroup>
              <MyInputGroup data="*******">비밀번호</MyInputGroup>
            </>
          )}

          <MyBtn
            color="white"
            backgroundColor="#216D32"
            onClick={() => {
              navigate(routes.myInfoEdit);
            }}
          >
            정보수정
          </MyBtn>
        </InfoStyle>
      </Container>
    </>
  );
};

const InfoStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default MypageForm;
