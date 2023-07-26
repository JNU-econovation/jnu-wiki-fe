import MyInputGroup from "../mypage/MyInfoGroup";
import Container from "../Resister/Container";
import Title from "../Resister/Title";
import styled from "styled-components";
import MyBtn from "../mypage/MyBtn";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../../services/user";
import routes from "../../../routes";
import { mypageTestData } from "./MypageTestData";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../constant/Loader";

//데이터 받아아오기
const MypageForm = () => {
    //const [Data, setInputData] = useState({});
    const {
        data,
        isLoading,
        isError,
        error,
        } = useQuery(['mypage'],()=>{
            return getUserInfo()})  
 
    return (
        <>
            <Container>
                <Title fontSize="20px" margin='3rem 0'>마이페이지</Title>
                <Title fontSize="30px" margin='0 0 4rem 0'>회원정보</Title>
                <InfoStyle>
                    {isLoading ? <LoadBox><Loader/></LoadBox>:
                    <>
                     <MyInputGroup data={data?.data?.response?.member?.nickname}>닉네임</MyInputGroup>
                    <MyInputGroup data={data?.data?.response?.member?.password}>비밀번호</MyInputGroup></>
                   
                    }
                    
                    <MyBtn color='white' backgroundColor='#216D32' route={routes.myInfoEdit}>정보수정</MyBtn>
                </InfoStyle>
            </Container>
        </>
    );
    }

const InfoStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`
const LoadBox = styled.div`
    margin: 3.7rem 0;

`
export default MypageForm;





