import InputGroup from "../Input/InputGroup";
import Button from "../Resister/Button";
import Container from "../Resister/Container";
import Title from "../Resister/Title";
import DoubleCheck from "../Resister/DoubleCheck";
import { useState, useEffect } from "react";
import { getUserInfo, getChangeInfo } from "../../../services/user";
import Swal from "sweetalert2";
import routes from "../../../routes";
import {
    passwordCheck,
} from "../../../services/regex";
import MyBtn from "../mypage/MyBtn";
import { styled } from "styled-components";
import { mypageTestData } from "./MypageTestData";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../constant/Loader";

const ButtonWrap = styled.div`
    display: flex;
    justify-content: space-around;
    margin:2rem 0;
`
const MyInfoEditForm = () => {
   
    
    //나중에 동일한 닉네임입니다 이런거 추가하기
    const {
        data,
        isLoading,
        isError,
        error,
        } = useQuery(['mypage'],()=>{
            return getUserInfo()})  
    const [Data,setData]=useState(data?.data?.response?.member);
    //const Data= data?.data?.response?.member;
    const [Newnickname, setNewnickname] = useState(Data?.nickname);
    const [Isnewnickname, setIsnewnickname] = useState(true);
    const [Doublenewnickname, setDoublenewnickname] = useState(false);
    const [Newpassword, setNewpassword] = useState(Data?.password);
    const [Isnewpassword, setIsnewpassword] = useState(true);

    const handleNicknameChange = (e) => {
        setNewnickname(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setNewpassword(e.target.value);
        if (Newpassword) {
            setIsnewpassword(passwordCheck(Newpassword));
        }
    };
    useEffect(
        () => {
            console.log(Newnickname,Newpassword)
            setNewnickname(Data?.nickname);
            setNewpassword(Data?.password);
        },[Data]);

    useEffect(
        (e) => {
          if (Newpassword) {
            setIsnewpassword(passwordCheck(Newpassword));
            setNewpassword(Newpassword);
          }
        },
        [Newpassword]
      );

    const NameDoubleCheck = (name) => {
        doubleCheckNickName(name)
            .then((e) => {
                setDoublenewnickname(true);
                Swal.fire({
                    icon: 'success',
                    text: '사용가능한 닉네임 입니다.'
                });
            })
            .catch((e) => {
                setDoublenewnickname(false);
                Swal.fire({
                    icon: 'warning',
                    text: '동일한 닉네임이 존재합니다.'
                });
                setNewnickname('');
            });
    };

    //중복확인 파일 따로 만들기...

    return (
        <>
            <Container>
                <Title fontSize="20px" margin='3rem 0'>마이페이지</Title>
                <Title fontSize="30px" margin='0 0 4rem 0'>회원정보 수정</Title>
                <InputGroup
                    id="newNickname"
                    type="text"
                    placeholder="수정할 새 닉네임을 입력해주세요."
                    label="닉네임"
                    value={Newnickname}
                    onChange={(e) => {
                        handleNicknameChange(e);
                    }}
                    margin={false}
                ></InputGroup>
                <DoubleCheck
                    onClick={(e) => {
                        if (Isnewnickname === true && Newnickname.length > 0) {
                            e.preventDefault();
                            NameDoubleCheck(Newnickname);
                        }
                    }}
                ></DoubleCheck>
                <InputGroup
                    id="newPassword"
                    type="password"
                    placeholder="새 비밀번호를 입력해주세요."
                    label="새 비밀번호"
                    value={Newpassword}
                    onChange={(e) => {
                        handlePasswordChange(e)
                    }}
                    para={
                        Isnewpassword
                            ? null
                            : "비밀번호는 영문, 숫자, 특수문자가 포함된 8~20자로 구성되어야 합니다."
                    }
                    margin={false}
                ></InputGroup>
                <ButtonWrap>
                    <MyBtn color='white' backgroundColor='#216D32' onClick={() => {
                        if (Doublenewnickname === false) {
                            Swal.fire({
                                icon: 'warning',
                                text: '닉네임 중복확인을 해주세요🥲',
                                confirmButtonText: '예',
                                confirmButtonColor: '#429f50',
                            })
                        }
                        if (
                            Doublenewnickname && Isnewnickname && Isnewpassword
                        ) {
                            getChangeInfo({ Isnewnickname, Isnewpassword })
                            Swal.fire({
                                icon: 'success',
                                title: '수정 완료🥰',
                                confirmButtonColor: '#429f50',
                            }).then(result => {
                                if (result.isConfirmed) {
                                    location.href = routes.myPage
                                }
                            })

                        }

                    }}>수정완료</MyBtn>
                    <MyBtn color='#216D32 ' backgroundColor='white' border='1px solid #216D32'
                        route={routes.myPage}
                    >취소</MyBtn>
                </ButtonWrap>

                {/* <Button margin='3rem 0 6rem 0' onClick=>수정완료</Button> */}
            </Container>

        </>
    );
};
//추후에 useInput 추가해서 수정하기
export default MyInfoEditForm;