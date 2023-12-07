import Container from "@/components/register/Container";
import InputGroup from "@/components/common/input/InputGroup";
import Button from "@/components/register/Button";
import styled from "styled-components";
import routes from "@/routes";
import { useNavigate } from "react-router-dom";
import Question from "@/components/register/Question";
import { useState } from "react";
import Title from "@/components/register/Title";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  emailRule,
  nicknameRule,
  passwordRule,
  repasswordRule,
} from "@/utils/registerRules";
import { join } from "@/services/user";
import { doubleCheckError } from "@/utils/toast";
import { joinSuccessAlert } from "@/utils/alert";
import { JOIN_DOUBLE_CHECK } from "@/constant/document/auth";
import { joinFailAlert } from "@/utils/alert";
import { NameDoubleCheck, emailDoubleCheck } from "../user/DoubleCheck";
const { DOUBLED } = JOIN_DOUBLE_CHECK;

const RegisterForm = () => {
  const navigate = useNavigate();

  const [doubleName, setDoubleName] = useState(false);
  const [doubleEmail, setDoubleEmail] = useState(false);

  const joinMutation = useMutation({
    mutationFn: (data) => join(data),
    onSuccess: () => {
      joinSuccessAlert();
    },
    onError: (err) => {
      console.log(err);
      joinFailAlert();
    },
  });

  const goJoin = (email, password, username) => {
    if (doubleEmail === false) {
      doubleCheckError(DOUBLED.EMAIL);
    } else if (doubleName === false) {
      doubleCheckError(DOUBLED.NICKNAME);
    }
    if (doubleName && doubleEmail && !errors.length) {
      const uploadPayload = {
        email: email,
        nickName: username,
        password: password,
      };
      joinMutation.mutate(uploadPayload);
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = () => {
    goJoin(getValues("email"), getValues("password"), getValues("nickname"));
  };

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Title fontSize="30px" margin="4.5rem 0 1rem 0">
          회원가입
        </Title>

        <Title fontSize="15px" margin="0 0 3rem 0">
          {" "}
          반가워요! 전남대학교에 대한 정보를 공유해봐요 :)
        </Title>

        <InputGroup
          id="email"
          placeholder="전남대학교 이메일을 입력해주세요."
          label="이메일"
          margin={true}
          register={register}
          doubleCheck={() => {
            emailDoubleCheck(getValues("email"), setDoubleEmail);
          }}
          error={errors.email}
          rules={emailRule}
          value={watch("email")}
        />

        <InputGroup
          id="nickname"
          placeholder="닉네임을 입력해주세요."
          label="닉네임"
          margin={true}
          register={register}
          doubleCheck={() =>
            NameDoubleCheck(getValues("nickname"), setDoubleName)
          }
          error={errors.nickname}
          rules={nicknameRule}
          value={watch("nickname")}
        />
        <InputGroup
          id="password"
          placeholder="비밀번호를 입력해주세요."
          label="비밀번호"
          margin={true}
          register={register}
          error={errors.password}
          rules={passwordRule}
          value={watch("password")}
        />

        <InputGroup
          id="repassword"
          placeholder="비밀번호를 입력해주세요."
          label="비밀번호 확인"
          margin={true}
          register={register}
          error={errors.repassword}
          rules={repasswordRule(getValues("password"))}
          value={watch("repassword")}
        />

        <Button margin="1rem 0 3rem 0" onClick={handleSubmit(onSubmit)}>
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

export const Icons = styled.div`
  position: relative;
  left: 23.5rem;
  bottom: 4.2rem;
  font-size: 1.5rem;
  color: #123e1cb8;
`;

export default RegisterForm;
