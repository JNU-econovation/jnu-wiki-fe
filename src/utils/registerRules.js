import { passwordRegEx } from "./regex";

export const emailRule = {
  required: "이메일은 필수 입력 사항 입니다.",
  validate: {
    jnuEmail: (value) =>
      value.includes("@jnu.ac.kr") || "전남대학교 이메일을 입력해주세요.",
  },
};

export const nicknameRule = {
  required: "닉네임은 필수 입력 사항 입니다.",
  maxLength: { value: 8, message: "닉네임은 8자 이내로 입력해주세요." },
};

export const passwordRule = {
  required: "비밀번호는 필수 입력 사항 입니다.",
  pattern: {
    value: passwordRegEx,
    message:
      "비밀번호는 영문, 숫자, 특수문자가 포함된 8~20자로 구성되어야 합니다.",
  },
};

export const repasswordRule = (password) => {
  return {
    required: "비밀번호 재 확인을 해주세요.",
    validate: {
      passwordReCheck: (value) =>
        value === password || "비밀번호가 일치하지 않습니다.",
    },
  };
};
