import InputGroup from "@/components/common/Input/InputGroup";
import Container from "@/components/register/Container";
import Title from "@/components/register/Title";
import DoubleCheck from "@/components/register/DoubleCheck";
import { useState, useEffect } from "react";
import { getUserInfo, getChangeInfo } from "@/services/user";
import Swal from "sweetalert2";
import routes from "@/routes";
import { passwordCheck } from "@/utils/regex";
import MyBtn from "@/components/mypage/MyBtn";
import { styled } from "styled-components";
import { useQuery, useMutation } from "@tanstack/react-query";
import { nicknameDoubleCheck } from "@/services/user";
import { useNavigate } from "react-router-dom";

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
`;
const MyInfoEditForm = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(["mypage"], () => {
    return getUserInfo();
  });

  const { mutate } = useMutation({
    mutationFn: getChangeInfo,
  });
  const [Data, setData] = useState(data?.data?.response);
  //const Data= data?.data?.response?.member;

  const [Newnickname, setNewnickname] = useState(Data?.nickName);
  const [Isnewnickname, setIsnewnickname] = useState(true);
  const [Doublenewnickname, setDoublenewnickname] = useState(false);
  const [Newpassword, setNewpassword] = useState("");
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
  useEffect(() => {
    console.log(Newnickname, Newpassword);
    setNewnickname(Data?.nickName);
    //setNewpassword(Data?.password);
  }, [Data]);

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
    nicknameDoubleCheck(name)
      .then(() => {
        setDoublenewnickname(true);
        Swal.fire({
          icon: "success",
          text: "사용가능한 닉네임 입니다.",
        });
      })
      .catch(() => {
        setDoublenewnickname(false);
        Swal.fire({
          icon: "warning",
          text: "동일한 닉네임이 존재합니다.",
        });
        //setNewnickname('');
      });
  };

  const GoEdit = () => {
    console.log(Doublenewnickname, Isnewnickname, Isnewpassword);
    if (Doublenewnickname === false) {
      Swal.fire({
        icon: "warning",
        text: "닉네임 중복확인을 해주세요🥲",
        confirmButtonText: "예",
        confirmButtonColor: "#429f50",
      });
    }
    if (Doublenewnickname && Isnewnickname && Isnewpassword) {
      const updatePayload = { Newnickname, Newpassword };
      console.log(updatePayload);
      //payload 는 바디같은거//...!
      mutate(updatePayload, {
        onSuccess: (data) => {
          Swal.fire({
            icon: "success",
            title: "수정 완료🥰",
            confirmButtonColor: "#429f50",
          }).then((result) => {
            if (result.isConfirmed) {
              location.href = routes.myPage;
            }
          });
        },
        onError: (error) => {
          Swal.fire({
            icon: "warning",
            title: "수정실패....",
            confirmButtonColor: "#429f50",
          });
        },
      });
    }
  };
  const EnterEdit = (e) => {
    if (e.key === "Enter") {
      GoEdit(e);
    }
  };
  return (
    <>
      <Container onKeyPress={EnterEdit}>
        <Title fontSize="20px" margin="3rem 0">
          마이페이지
        </Title>
        <Title fontSize="30px" margin="0 0 4rem 0">
          회원정보 수정
        </Title>
        <InputGroup
          id="newNickname"
          type="text"
          placeholder="수정할 새 닉네임을 입력해주세요."
          label="닉네임"
          value={Newnickname}
          mypage={true}
          btn={true}
          onChange={(e) => {
            handleNicknameChange(e);
          }}
          para={Newnickname?.length > 0 ? null : "닉네임을 작성해주세요."}
          margin={false}
        ></InputGroup>
        <DoubleCheck
          left={true}
          active={Newnickname?.length > 0 ? "true" : "false"}
          onClick={(e) => {
            if (Isnewnickname === true && Newnickname?.length > 0) {
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
          mypage={true}
          onChange={(e) => {
            handlePasswordChange(e);
          }}
          para={
            Isnewpassword
              ? null
              : "비밀번호는 영문, 숫자, 특수문자가 포함된 8~20자로 구성되어야 합니다."
          }
          margin={false}
        ></InputGroup>
        <InputGroup
          id="newPassword"
          type="password"
          placeholder="비밀번호를 재입력해주세요."
          label="새 비밀번호 확인"
          value={Newpassword}
          mypage={true}
          btn={true}
          onChange={(e) => {
            handlePasswordChange(e);
          }}
          para={Isnewpassword ? null : "비밀번호가 다릅니다."}
          margin={false}
        ></InputGroup>
        <ButtonWrap>
          <MyBtn
            color="white"
            backgroundColor="#216D32"
            onClick={() => {
              navigate(routes.myPage);
            }}
          >
            완료
          </MyBtn>
        </ButtonWrap>

        {/* <Button margin='3rem 0 6rem 0' onClick=>수정완료</Button> */}
      </Container>
    </>
  );
};
//추후에 useInput 추가해서 수정하기
export default MyInfoEditForm;
