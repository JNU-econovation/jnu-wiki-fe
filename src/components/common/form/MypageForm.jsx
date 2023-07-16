import MyInputGroup from "../mypage/MyInfoGroup";
import Container from "../Resister/Container";
import Title from "../Resister/Title";
import styled from "styled-components";
import MyBtn from "../mypage/MyBtn";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../../services/user";
import routes from "../../../routes";

//데이터 받아아오기
//react query 사용을 할까



const MypageForm = () => {
    const [Data, setInputData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserInfo();
                setInputData(response.response.member);
                //response.data.response.map((data) => { setInputData(data); })

            } catch (error) {
                alert(error.status + ', 데이터를 찾을 수 없습니다.');
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Container>
                <Title fontSize="20px" margin='3rem 0'>마이페이지</Title>
                <Title fontSize="30px" margin='0 0 4rem 0'>회원정보</Title>
                <InfoStyle>
                    <MyInputGroup data={Data.nickname}>닉네임</MyInputGroup>
                    <MyInputGroup data={Data.password}>비밀번호</MyInputGroup>
                    <MyBtn route={routes.myInfoEdit}>정보수정</MyBtn>
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

`
export default MypageForm;





