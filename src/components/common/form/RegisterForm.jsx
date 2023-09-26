import Container from "@/components/register/Container";
import InputGroup from "@/components/common/Input/InputGroup";
import Button from "@/components/register/Button";
import useInput from "@/hooks/useInput";
import styled from "styled-components";
import routes from "@/routes";
import { useNavigate } from "react-router-dom";
// import { register, doubleCheck } from "@/services/api";
import Question from "@/components/register/Question";
import { useState, useEffect } from "react";
import DoubleCheck from "@/components/register/DoubleCheck";
import { register } from "@/services/user";
import { emailCheck, passwordCheck, passwordReCheck } from "@/utils/regex";
import Swal from "sweetalert2";
import { nicknameDoubleCheck } from "@/services/user";
import { emailDBCheck } from "@/services/user";
import Title from "@/components/register/Title";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export const Icons = styled.div`
  position: relative;
  left: 23.5rem;
  bottom: 4.2rem;
  font-size: 1.5rem;
  color: #123e1cb8;
`;

const ResisterForm = () => {
  //registerform 으로 바꾸기...ㅎ

  const navigate = useNavigate();
  const { valueInit, handleOnChange } = useInput({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isName, setIsName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [whatEmail, setWhatEmail] = useState("");
  const [whatName, setWhatName] = useState("");
  const [doubleName, setDoubleName] = useState(false);
  const [doubleEmail, setDoubleEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);

  const emailDoubleCheck = (whatEmail) => {
    if (isEmail === true && whatEmail.length > 0) {
      emailDBCheck(whatEmail)
        .then((e) => {
          setDoubleEmail(true);
          Swal.fire({
            icon: "success",
            text: "사용가능한 이메일 입니다.",
          });
        })
        .catch((e) => {
          setDoubleEmail(false);
          console.log(e);
          Swal.fire({
            icon: "warning",
            text: "동일한 이메일이 존재합니다.",
          });
        });
    }
  };
  const NameDoubleCheck = (name) => {
    if (isName === true && name?.length > 0) {
      nicknameDoubleCheck(name)
        .then((e) => {
          setDoubleName(true);
          Swal.fire({
            icon: "success",
            text: "사용가능한 닉네임 입니다.",
          });
        })
        .catch((e) => {
          setDoubleName(false);
          Swal.fire({
            icon: "warning",
            text: "동일한 닉네임이 존재합니다.",
          });
        });
    }
  };

  useEffect(
    (e) => {
      setWhatName(valueInit.username);
      if (valueInit.username.length > 0) {
        setIsName(true);
      }
    },
    [valueInit.username]
  );

  useEffect(
    (e) => {
      if (valueInit.email.length > 0) {
        setIsEmail(emailCheck(valueInit.email));
        setWhatEmail(valueInit.email);
      }
    },
    [valueInit.email]
  );

  useEffect(
    (e) => {
      if (valueInit.password.length > 0) {
        setIsPassword(passwordCheck(valueInit.password));
      }
    },
    [valueInit.password]
  );
  useEffect(
    (e) => {
      if (valueInit.passwordConfirm.length > 0) {
        setIsPasswordConfirm(
          passwordReCheck(valueInit.password, valueInit.passwordConfirm)
        );
      }
    },
    [valueInit.passwordConfirm]
  );
  const GoJoin = (e) => {
    e.preventDefault();
    if (doubleEmail === false) {
      Swal.fire({
        icon: "warning",
        text: "이메일 중복확인을 해주세요🥲",
        confirmButtonText: "예",
        confirmButtonColor: "#429f50",
      });
    } else if (doubleName === false) {
      Swal.fire({
        icon: "warning",
        text: "닉네임 중복확인을 해주세요🥲",
        confirmButtonText: "예",
        confirmButtonColor: "#429f50",
      });
    }

    //회원가입 요청
    if (
      doubleName &&
      doubleEmail &&
      isName &&
      isEmail &&
      isPassword &&
      isPasswordConfirm
    ) {
      register({
        email: valueInit.email,
        password: valueInit.password,
        nickName: valueInit.username,
      });
      Swal.fire({
        icon: "success",
        title: "회원가입 성공!",
        text: "로그인 페이지로 이동하시겠습니까?",
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        confirmButtonColor: "#429f50",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = routes.login;
        } else if (result.isDismissed) {
          location.href = routes.home;
        }
        //resister .then 으로 위에 모달창 넣어주기.
      });
    }
  };
  const EnterJoin = (e) => {
    if (e.key === "Enter") {
      GoJoin(e);
    }
  };

  const [pwVisible, setpwVisible] = useState({
    type: "password",
    visible: false,
    icons: <AiFillEyeInvisible />,
  });
  const [pwVisible2, setpwVisible2] = useState({
    type: "password",
    visible: false,
    icons: <AiFillEyeInvisible />,
  });

  const handlePasswordType = (e) => {
    setpwVisible(() => {
      if (pwVisible.visible) {
        return {
          type: "password",
          visible: false,
          icons: <AiFillEyeInvisible />,
        };
      } else {
        return { type: "text", visible: true, icons: <AiFillEye /> };
      }
    });
  };
  const handlePasswordType2 = (e) => {
    setpwVisible2(() => {
      if (pwVisible2.visible) {
        return {
          type: "password",
          visible: false,
          icons: <AiFillEyeInvisible />,
        };
      } else {
        return { type: "text", visible: true, icons: <AiFillEye /> };
      }
    });
  };
  //이것도 훅으로 만들기......
  return (
    <>
      <Container onKeyPress={EnterJoin}>
        <Title fontSize="30px" margin="4.5rem 0 1rem 0">
          회원가입
        </Title>
        <Title fontSize="15px" margin="0 0 3rem 0">
          {" "}
          반가워요! 회원가입 후 <Strong>10</Strong>일이 지나면 글작성이 가능해요
          :)
        </Title>
        <InputGroup
          id="email"
          type="email"
          placeholder="전남대학교 이메일을 입력해주세요."
          label="이메일"
          value={valueInit.email}
          onChange={(e) => {
            handleOnChange(e);
          }}
          para={isEmail ? null : "이메일 형식으로 작성해주세요. "}
          margin={true}
        />
        <DoubleCheck
          active={isEmail && whatEmail.length > 0 ? "true" : "false"}
          onClick={() => emailDoubleCheck(whatEmail)}
        ></DoubleCheck>
        <InputGroup
          id="username"
          type="text"
          placeholder="닉네임을 입력하세요."
          label="닉네임"
          value={valueInit.username}
          onChange={handleOnChange}
          para={isName ? null : "필수 입력사항 입니다."}
          margin={true}
        ></InputGroup>
        <DoubleCheck
          active={isName && whatName.length > 0 ? "true" : "false"}
          onClick={(e) => NameDoubleCheck(whatName)}
        ></DoubleCheck>
        <InputGroup
          id="password"
          type={pwVisible.type}
          placeholder="비밀번호를 입력하세요."
          label="비밀번호"
          value={valueInit.password}
          onChange={(e) => {
            handleOnChange(e);
          }}
          para={
            isPassword
              ? null
              : "비밀번호는 영문, 숫자, 특수문자가 포함된 8~20자로 구성되어야 합니다."
          }
          margin={false}
        />
        <Icons onClick={handlePasswordType}>{pwVisible.icons}</Icons>
        <InputGroup
          id="passwordConfirm"
          type={pwVisible2.type}
          placeholder="비밀번호 확인."
          label="비밀번호 확인"
          value={valueInit.passwordConfirm}
          onChange={(e) => {
            handleOnChange(e);
          }}
          para={isPasswordConfirm ? null : "비밀번호가 다릅니다."}
          margin={false}
        />
        <Icons onClick={handlePasswordType2}>{pwVisible2.icons}</Icons>
        <Button margin="1rem 0 3rem 0" onClick={GoJoin}>
          회원가입
        </Button>
        <Question
          para="이미 계정이 있으신가요?"
          onClick={() => {
            navigate(routes.login);
          }}
        >
          로그인
        </Question>
      </Container>
    </>
  );
};

const Strong = styled.a`
  font-weight: 700;
`;

export default ResisterForm;
