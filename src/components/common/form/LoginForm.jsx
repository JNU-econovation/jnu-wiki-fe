import Container from "@/components/register/Container";
import InputGroup from "@/components/common/Input/InputGroup";
import Button from "@/components/register/Button";
import useInput from "@/hooks/useInput";
import routes from "@/routes";
import { useNavigate } from "react-router-dom";
import Question from "@/components/register/Question";
import { useState, useEffect } from "react";
import { emailCheck, passwordCheck } from "@/utils/regex";
import Title from "@/components/register/Title";
import { login } from "@/services/user";
import Swal from "sweetalert2";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Icons } from "./RegisterForm";
import { useDispatch } from "react-redux";
import { loginState } from "@/store/userReducer";
import { setCookie } from "../../../utils/CookieFunc";

const LoginForm = ({ marginBottom }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { valueInit, handleOnChange } = useInput({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isEmail, setIsEmail] = useState(true);
  const [whatEmail, setWhatEmail] = useState(null);
  const [isPassword, setIsPassword] = useState(true);
  const [whatPassword, setWhatPassword] = useState(null);

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
        setWhatPassword(valueInit.password);
      }
    },
    [valueInit.password]
  );

  const GoLogin = (e) => {
    //e.preventDefault();
    if (isEmail && isPassword) {
      if (whatEmail === null || whatPassword === null) {
        Swal.fire({
          icon: "warning",
          text: "이메일과 비밀번호를 입력해주세요.",
          confirmButtonColor: "#429f50",
        });
      } else {
        login({
          email: valueInit.email,
          password: valueInit.password,
        })
          .then(
            (res) => {
              //로그인 성공시

              Swal.fire({
                icon: "success",
                title: "로그인 성공!",
                text: "홈 화면으로 이동합니다",
                confirmButtonColor: "#429f50",
              }).then((result) => {
                console.log(res.headers);
                if (result.isConfirmed) {
                  // localStorage.setItem(
                  //   "nickname",
                  //   res?.headers.response.name || ""
                  // );
                  // res.setHeader("Access-Control-Allow-Credentials", "true");
                  setCookie("refreshToken", res.data.headers.setCookie);
                  localStorage.setItem("token", res.data.headers.Authorization);
                  dispatch(
                    loginState({
                      nickname: "닉네임",
                      role: res.data.body.response.role,
                      isLogin: true,
                    })
                  );
                  navigate(routes.home);
                }
              });
            } //else
          )
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "warning",
              title: "회원정보가 없습니다",
              text: `이메일과 비밀번호를 확인해주세요`,
              confirmButtonColor: "#2d790d",
            });
          });
      } //if
    } else {
      Swal.fire({
        icon: "warning",
        text: "이메일, 비밀번호를 형식에 맞게 입력해주세요.",
        confirmButtonColor: "#429f50",
      });
    }
  };
  const EnterLogin = (e) => {
    if (e.key === "Enter") {
      GoLogin(e);
    }
  };

  const [pwVisible, setpwVisible] = useState({
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

  return (
    <>
      <Container onKeyPress={EnterLogin}>
        <Title fontSize="30px" margin="4.5rem 0 1rem 0">
          로그인
        </Title>
        <Title fontSize="15px" margin="0 0 3rem 0">
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
          type={pwVisible.type}
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
        <Icons onClick={handlePasswordType}>{pwVisible.icons}</Icons>

        <Button
          margin="1rem 0 3rem 0"
          onClick={GoLogin} //onClick5
        >
          로그인
        </Button>
        <Question
          para="계정이 없으신가요?"
          onClick={() => {
            navigate(routes.join);
          }}
        >
          회원가입
        </Question>
      </Container>
    </>
  );
};

export default LoginForm;
