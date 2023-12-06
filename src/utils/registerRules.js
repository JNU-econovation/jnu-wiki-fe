export const emailRule = {
  required: "이메일은 필수 입력 사항 입니다.",
  validate: {
    jnuEmail: (value) =>
      value.includes("@jnu.ac.kr") || "전남대학교 이메일을 입력해주세요.",
    // pattern: {
    //   value: emailRegEx,
    //   message: "이메일 형식에 맞게 입력해주세요.",
    // },
  },
};

export const nicknameRule = {
  required: "닉네임은 필수 입력 사항 입니다.",
  maxLength: { value: 15, message: "닉네임은 15자 이내로 입력해주세요." },
};
