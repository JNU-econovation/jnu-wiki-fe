import Container from "@/components/register/Container";
import InputGroup from "@/components/common/Input/InputGroup";
import Button from "@/components/register/Button";
import useInput from "@/hooks/useInput";
import styled from "styled-components";
import routes from "@/routes";
import { useNavigate } from "react-router-dom";
import Question from "@/components/register/Question";
import { useState, useEffect } from "react";
import DoubleCheck from "@/components/register/DoubleCheck";
import { register } from "@/services/user";

import Swal from "sweetalert2";
import { nicknameDoubleCheck } from "@/services/user";
import { emailDBCheck } from "@/services/user";
import Title from "@/components/register/Title";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

import {
  emailRule,
  nicknameRule,
  passwordRule,
  repasswordRule,
} from "../../../utils/registerRules";

export const Icons = styled.div`
  position: relative;

  left: 23.5rem;

  bottom: 4.2rem;

  font-size: 1.5rem;

  color: #123e1cb8;
`;

const RegisterForm = () => {
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

  const [passwordConfirm, setPasswordConfirm] = useState(true);

  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const emailDoubleCheck = (whatEmail) => {
    if (!errors.email) {
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
        setIsPasswordConfirm(valueInit.passwordConfirm);

        setPasswordConfirm();
        // passwordReCheck(valueInit.password, valueInit.passwordConfirm)
      }
    },

    [valueInit.passwordConfirm, valueInit.password]
  );

  const GoJoin = (e) => {
    // e.preventDefault();
    // if (doubleEmail === false) {
    // Swal.fire({
    // icon: "warning",
    // text: "이메일 중복확인을 해주세요🥲",
    // confirmButtonText: "예",
    // confirmButtonColor: "#429f50",
    // });
    // } else if (doubleName === false) {
    // Swal.fire({
    // icon: "warning",
    // text: "닉네임 중복확인을 해주세요🥲",
    // confirmButtonText: "예",
    // confirmButtonColor: "#429f50",
    // });
    // }
    // if (!isPassword) {
    // setIsPassword(false);
    // }
    // if (!isPasswordConfirm) {
    // setPasswordConfirm(false);
    // }
    // if (
    // doubleName &&
    // doubleEmail &&
    // isName &&
    // isEmail &&
    // passwordConfirm &&
    // isPasswordConfirm
    // ) {
    // //회원가입 요청
    // register({
    // email: valueInit.email,
    // password: valueInit.password,
    // nickName: valueInit.username,
    // });
    // Swal.fire({
    // icon: "success",
    // title: "회원가입 성공!",
    // text: "로그인 페이지로 이동하시겠습니까?",
    // confirmButtonText: "예",
    // cancelButtonText: "아니오",
    // confirmButtonColor: "#429f50",
    // cancelButtonColor: "#d33",
    // }).then((result) => {
    // if (result.isConfirmed) {
    // location.href = routes.login;
    // } else if (result.isDismissed) {
    // location.href = routes.home;
    // }
    // });
    // }
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

  const {
    register,

    handleSubmit,

    watch,

    getValues,

    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => console.log(data);

  console.log(watch("email"));

  return (
    <>
      <Container onKeyPress={EnterJoin} onSubmit={handleSubmit(onSubmit)}>
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
          placeholder="전남대학교 이메일을 입력해주세요."
          label="이메일"
          margin={true}
          register={register}
          doubleCheck={() => emailDoubleCheck(getValues("email"))}
          error={errors.email}
          rules={emailRule}
          value={getValues("email")}
        />

        <InputGroup
          id="nickname"
          placeholder="닉네임을 입력해주세요."
          label="닉네임"
          margin={true}
          register={register}
          doubleCheck={() => nicknameDoubleCheck(getValues("nickname"))}
          error={errors.nickname}
          rules={nicknameRule}
          value={getValues("nickname")}
        />
        <InputGroup
          id="password"
          placeholder="비밀번호를 입력해주세요."
          label="비밀번호"
          margin={true}
          register={register}
          error={errors.password}
          rules={passwordRule}
          value={getValues("password")}
        />
        <InputGroup
          id="repassword"
          placeholder="비밀번호를 입력해주세요."
          label="비밀번호 확인"
          margin={true}
          register={register}
          error={errors.repassword}
          rules={repasswordRule(getValues("password"), getValues("repassword"))}
          value={getValues("repassword")}
        />

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

export default RegisterForm;
