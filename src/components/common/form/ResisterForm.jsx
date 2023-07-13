import Container from "../ResisterCompo/Container";
import InputGroup from "../ResisterCompo/InputGroup";
import Button from "../ResisterCompo/Button";
import useInput from "../../../hooks/useInput";
import styled from "styled-components";
import routes from "../../../routes";
import { useNavigate } from "react-router-dom";
// import { register, doubleCheck } from "../../../services/api";
import Question from "../ResisterCompo/Question";
import { useState, useEffect } from "react";
import DoubleCheck from "../ResisterCompo/DoubleCheck";
import {
  emailCheck,
  passwordCheck,
  passwordReCheck,
} from "../../../services/regex";

import Title from "../ResisterCompo/Title";
const ResisterForm = () => {
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

  const emailDoubleCheck = (email) => {
    doubleCheckEmail(email)
      .then((e) => {
        setDoubleEmail(true);
        alert("사용가능한 이메일 입니다.");
      })
      .catch((e) => {
        setDoubleEmail(false);
        alert("동일한 이메일이 존재합니다.");
      });
  };
  const NameDoubleCheck = (name) => {
    doubleCheckNickName(name)
      .then((e) => {
        setDoubleName(true);
        alert("사용가능한 닉네임 입니다.");
      })
      .catch((e) => {
        setDoubleName(false);
        alert("동일한 닉네임이 존재합니다.");
      });
  };

  useEffect(
    (e) => {
      if (valueInit.username.length > 0) {
        setIsName(true);
        setWhatName(valueInit.name);
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

  return (
    <>
      <Container>
        <Title fontSize="30px">회원가입</Title>
        <Title fontSize="15px">
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
          onClick={(e) => {
            if (isEmail === true && whatEmail.length > 0) {
              e.preventDefault();
              console.log(whatEmail);
              emailDoubleCheck(whatEmail);
            }
          }}
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
          onClick={(e) => {
            if (isName === true && whatName.length > 0) {
              e.preventDefault();
              console.log(whatName);
              emailDoubleCheck(whatName);
            }
          }}
        ></DoubleCheck>

        <InputGroup
          id="password"
          type="password"
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
        <InputGroup
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인."
          label="비밀번호 확인"
          value={valueInit.passwordConfirm}
          onChange={(e) => {
            handleOnChange(e);
          }}
          para={isPasswordConfirm ? null : "비밀번호가 다릅니다."}
          margin={false}
        />

        <Button
          onClick={() => {
            if (doubleEmail === false) {
              alert("이메일 중복확인을 해주세요");
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
              console.log(
                valueInit.email,
                valueInit.password,
                valueInit.username
              );
              // register({
              //     "email": valueInit.email,
              //     "password": valueInit.password,
              //     "username": valueInit.username
              // })
              alert("회원가입 성공!");
              navigate(routes.logIn);
            }
          }}
        >
          회원가입
        </Button>
        <Question
          para="이미 계정이 있으신가요?"
          children="로그인"
          onClick={() => {
            navigate(routes.login);
          }}
        ></Question>
      </Container>
    </>
  );
};

const Strong = styled.a`
  font-weight: 700;
`;

export default ResisterForm;
