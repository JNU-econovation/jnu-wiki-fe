import InputGroup from "@/components/common/input/InputGroup";
import Container from "@/components/register/Container";
import Title from "@/components/common/Title";
import { useState } from "react";
import { getChangeNickname, getChangePassword } from "@/services/mypage";
import routes from "@/routes";
import MyBtn from "@/components/mypage/MyBtn";
import { styled } from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/user";
import { useForm } from "react-hook-form";
import {
  nicknameRule,
  passwordRule,
  repasswordRule,
} from "@/utils/registerRules";
import { NameDoubleCheck } from "../user/DoubleCheck";

import {
  changeFailAlert,
  changeSuccessAlert,
  failLoginAlert,
} from "@/utils/alert";

const MyInfoEditForm = () => {
  const navigate = useNavigate();

  const { mutate: changeNickname } = useMutation({
    mutationFn: getChangeNickname,

    onSuccess: () => {
      changeSuccessAlert();
    },
    onError: (error) => {
      changeFailAlert();
      console.error(error);
    },
  });
  const { mutate: changePassword } = useMutation({
    mutationFn: getChangePassword,
    onSuccess: () => {
      changeSuccessAlert();
    },
    onError: (error) => {
      changeFailAlert();
      console.error(error);
    },
  });

  const [doubleNewNickname, setDoubleNewNickname] = useState(false);

  const GoEditPassword = (e) => {
    e.preventDefault();

    if (!errors.newPassword && !errors.reNewPassword) {
      const email = prompt("이메일을 입력해주세요.");
      const password = prompt("비밀번호를 입력해주세요.");
      login({ email: email, password: password })
        .then(() => {
          const updatePayload = getValues("newPassword");
          changePassword(updatePayload);
        })
        .catch((error) => {
          failLoginAlert();
          console.error(error);
        });
    }
  };

  const GoEditNickname = (e) => {
    e.preventDefault();
    if (doubleNewNickname && watch("newNickname")) {
      const updatePayload = getValues("newNickname");

      changeNickname(updatePayload);
    }
  };

  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  return (
    <>
      <Container>
        <Title fontSize="20px" margin="3rem 0 1rem 0">
          마이페이지
        </Title>
        <Title fontSize="30px" margin="0 0 2rem 0">
          회원정보 수정
        </Title>
        <InputGroup
          id="newNickname"
          placeholder="수정할 새 닉네임을 입력해주세요."
          label="닉네임"
          margin={true}
          mypage={true}
          onClick={GoEditNickname}
          register={register}
          doubleCheck={() => {
            NameDoubleCheck(getValues("newNickname"), setDoubleNewNickname);
          }}
          doubleNewNickname={doubleNewNickname}
          error={errors.newNickname}
          rules={nicknameRule}
          value={watch("newNickname")}
          btn={true}
        />
        <InputGroup
          id="newPassword"
          placeholder="수정할 새 비밀번호를 입력해주세요."
          label="비밀번호"
          margin={true}
          register={register}
          error={errors.newPassword}
          rules={passwordRule}
          value={watch("newPassword")}
        />
        <InputGroup
          id="reNewPassword"
          placeholder="비밀번호를 다시 입력해주세요."
          label="비밀번호 확인"
          margin={true}
          onClick={GoEditPassword}
          register={register}
          error={errors.reNewPassword}
          rules={repasswordRule(watch("newPassword"))}
          value={watch("newPassword")}
          btn={true}
        />

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
      </Container>
    </>
  );
};

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
`;
export default MyInfoEditForm;
