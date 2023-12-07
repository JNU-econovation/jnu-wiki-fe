import Container from "@/components/register/Container";
import InputGroup from "@/components/common/Input/InputGroup";
import Button from "@/components/register/Button";
import routes from "@/routes";
import { useNavigate } from "react-router-dom";
import Question from "@/components/register/Question";
import Title from "@/components/register/Title";
import { login } from "@/services/user";
import { useDispatch } from "react-redux";
import { loginState } from "@/store/userReducer";
import { loginFailAlert } from "@/utils/alert";
import { useForm } from "react-hook-form";
import { emailRule, passwordRule } from "@/utils/registerRules";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logInMutation = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (res) => {
      loginSuccess(res);
    },
    onError: (err) => {
      console.log(err);
      loginFailAlert("회원 정보가 없습니다.");
    },
  });

  const loginSuccess = (res) => {
    localStorage.setItem("token", res.headers.authorization);
    localStorage.setItem(
      "accessExpiredTime",
      parseInt(res.data.response.accessTokenExpiration)
    );
    localStorage.setItem(
      "refreshExpiredTime",
      parseInt(res.data.response.refreshTokenExpiration)
    );
    dispatch(
      loginState({
        role: res.data.response.role,
        memberId: res.data.response.id,
        isLogin: true,
      })
    );
    navigate(routes.home);
    location.reload();
  };

  const goLogin = (email, password) => {
    if (email && password && !errors.password && !errors.email) {
      const uploadPayload = {
        email: email,
        password: password,
      };
      logInMutation.mutate(uploadPayload);
    } else {
      loginFailAlert("이메일, 비밀번호를 형식에 맞게 입력해주세요.");
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
    goLogin(getValues("email"), getValues("password"));
  };

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Title fontSize="30px" margin="4.5rem 0 1rem 0">
          로그인
        </Title>
        <Title fontSize="15px" margin="0 0 3rem 0">
          {" "}
          환영해요! 오늘도 전남대 정보들, 잘 부탁해요 :)
        </Title>
        <InputGroup
          id="email"
          placeholder="전남대학교 이메일을 입력해주세요."
          label="이메일"
          margin={true}
          register={register}
          error={errors.email}
          rules={emailRule}
          value={watch("email")}
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

        <Button margin="1rem 0 3rem 0" onClick={handleSubmit(onSubmit)}>
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
