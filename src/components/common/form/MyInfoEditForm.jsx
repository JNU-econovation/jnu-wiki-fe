import InputGroup from "@/components/common/Input/InputGroup";
import Container from "@/components/register/Container";
import Title from "@/components/register/Title";
import DoubleCheck from "@/components/register/DoubleCheck";
import { useState, useEffect } from "react";
import { getUserInfo } from "@/services/mypage";
import { getChangeNickname, getChangePassword } from "@/services/mypage";
import Swal from "sweetalert2";
import routes from "@/routes";
// import { passwordCheck, passwordReCheck } from "@/utils/regex";
import MyBtn from "@/components/mypage/MyBtn";
import { styled } from "styled-components";
import { useQuery, useMutation } from "@tanstack/react-query";
import { nicknameDoubleCheck } from "@/services/user";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/user";

const MyInfoEditForm = () => {
  const navigate = useNavigate();

  const { data } = useQuery(["mypage"], () => {
    return getUserInfo();
  });
  const { mutate: changeNickname } = useMutation({
    mutationFn: getChangeNickname,
    onError: (error) => {
      console.error(error);
    },
  });
  const { mutate: changePassword } = useMutation({
    mutationFn: getChangePassword,
    onError: (error) => {
      console.error(error);
    },
  });

  const [newNickname, setNewNickname] = useState(data?.data.response.nickName);
  const [isNewNickname, setIsNewNickname] = useState(true);
  const [doubleNewNickname, setDoubleNewNickname] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isNewPassword, setIsNewPassword] = useState(true);
  const [reNewPassword, setReNewPassword] = useState("");
  const [isReNewPassword, setReIsNewPassword] = useState(true);

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (newPassword) {
      setIsNewPassword(passwordCheck(newPassword));
    }
  };
  const handleRePasswordChange = (e) => {
    setReNewPassword(e.target.value);
    if (reNewPassword) {
      setReIsNewPassword(passwordReCheck(reNewPassword, newPassword));
    }
  };

  useEffect(() => {
    setNewNickname(data?.data.response.nickName);
  }, [data]);

  useEffect(
    (e) => {
      if (newPassword) {
        setIsNewPassword(passwordCheck(newPassword));
        setNewPassword(newPassword);
      }
    },
    [newPassword]
  );
  useEffect(
    (e) => {
      if (reNewPassword) {
        setReIsNewPassword(passwordReCheck(reNewPassword, newPassword));
        setReNewPassword(reNewPassword);
      }
    },
    [reNewPassword, newPassword]
  );

  const NameDoubleCheck = (name) => {
    nicknameDoubleCheck(name)
      .then(() => {
        setDoubleNewNickname(true);
        Swal.fire({
          icon: "success",
          text: "사용가능한 닉네임 입니다.",
        });
      })
      .catch(() => {
        setDoubleNewNickname(false);
        Swal.fire({
          icon: "warning",
          text: "동일한 닉네임이 존재합니다.",
        });
        //setNewnickname('');
      });
  };

  const GoEditPassword = (e) => {
    e.preventDefault();

    if (isNewPassword) {
      const email = prompt("이메일을 입력해주세요.");
      const password = prompt("비밀번호를 입력해주세요.");
      login({ email: email, password: password })
        .then((res) => {
          const updatePayload = newPassword;
          changePassword(updatePayload, {
            onSuccess: (data) => {
              Swal.fire({
                icon: "success",
                title: "수정 완료🥰",
                confirmButtonColor: "#429f50",
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
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
        })
        .catch((err) => {
          Swal.fire({
            icon: "warning",
            text: `비밀번호, 혹은 이메일이 틀렸어용...`,
            confirmButtonColor: "#2d790d",
          });
        });
    }
  };
  const GoEditNickname = (e) => {
    e.preventDefault();
    if (doubleNewNickname === false) {
      Swal.fire({
        icon: "warning",
        text: "닉네임 중복확인을 해주세요🥲",
        confirmButtonText: "예",
        confirmButtonColor: "#429f50",
      });
    }
    if (doubleNewNickname && isNewNickname) {
      const updatePayload = newNickname;

      //payload 는 바디같은거//...!
      changeNickname(updatePayload, {
        onSuccess: (data) => {
          Swal.fire({
            icon: "success",
            title: "수정 완료🥰",
            confirmButtonColor: "#429f50",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
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

  return (
    <>
      <Container>
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
          value={newNickname}
          mypage={true}
          btn={true}
          onChange={(e) => {
            handleNicknameChange(e);
          }}
          para={newNickname?.length > 0 ? null : "닉네임을 작성해주세요."}
          margin={false}
          onClick={GoEditNickname}
        ></InputGroup>
        <DoubleCheck
          left={true}
          active={newNickname?.length > 0 ? "true" : "false"}
          onClick={(e) => {
            if (isNewNickname === true && newNickname?.length > 0) {
              NameDoubleCheck(newNickname);
            }
          }}
        ></DoubleCheck>
        <InputGroup
          id="newPassword"
          type="password"
          placeholder="새 비밀번호를 입력해주세요."
          label="새 비밀번호"
          value={newPassword}
          mypage={true}
          onChange={(e) => {
            handlePasswordChange(e);
          }}
          para={
            isNewPassword
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
          value={reNewPassword}
          mypage={true}
          btn={true}
          onChange={(e) => {
            handleRePasswordChange(e);
          }}
          para={isReNewPassword ? null : "비밀번호가 다릅니다."}
          margin={false}
          onClick={GoEditPassword}
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

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
`;
//추후에 useInput 추가해서 수정하기
export default MyInfoEditForm;
