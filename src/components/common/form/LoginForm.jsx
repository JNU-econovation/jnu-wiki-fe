import Container from "../ResisterCompo/Container";
import InputGroup from "../ResisterCompo/InputGroup";
import Button from "../ResisterCompo/Button";
import useInput from "../../../hooks/useInput";
import styled from "styled-components";
import routes from "../../../routes";
import { useNavigate } from "react-router-dom";
import Question from "../ResisterCompo/Question";
import { useState, useEffect } from "react";
import { emailCheck, passwordCheck } from "../../../services/regex";
import Title from "../ResisterCompo/Title";

const LoginForm = ({ marginBottom }) => {
  const navigate = useNavigate();
  const { valueInit, handleOnChange } = useInput({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isEmail, setIsEmail] = useState(true);
  const [whatEmail, setWhatEmail] = useState("");
  const [isPassword, setIsPassword] = useState(true);

  // const loginCheck = (data) => {
  //     login(data).then((res) => {
  //         localStorage.setItem('jwt', res.headers.get("Authorization"));
  //         alert("로그인 성공!");
  //         navigate(routes.home);
  //     })
  //         .catch((e) => {
  //             alert("인증되지 않았습니다.");
  //         });
  // };

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

  return (
    <>
      <Container>
        <Title fontSize="30px">로그인</Title>
        <Title fontSize="15px">
          {" "}
          환영해요! 오늘도 전남대 정보들, 잘 부탁해요 :)
        </Title>
        <InputGroup
          id="email"
          type="email"
          placeholder="이메일(아이디)를 입력해주세요"
          label="이메일"
          value={valueInit.email}
          onChange={handleOnChange}
          para={isEmail ? null : "이메일 형식으로 작성해주세요. "}
        />
        <InputGroup
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          label="비밀번호"
          value={valueInit.password}
          onChange={handleOnChange}
          para={
            isPassword
              ? null
              : "비밀번호는 영문, 숫자, 특수문자가 포함된 8~20자로 구성되어야 합니다."
          }
        />

        <Button
          onClick={(e) => {
            //e.preventDefault();
            if (isEmail && isPassword) {
              console.log(valueInit.email);
              console.log(valueInit.password);

              loginCheck({
                email: valueInit.email,
                password: valueInit.password,
              });
            }
          }}
        >
          로그인
        </Button>
        <Question
          para="계정이 없으신가요?"
          children="회원가입"
          onClick={() => {
            navigate(routes.join);
          }}
        ></Question>
      </Container>
    </>
  );
};

export default LoginForm;
