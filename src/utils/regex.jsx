export const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
export const passwordRegEx =
  /^(?=.*[a-zA-Z])(?=.*[?!@#$%^~*+=-])(?=.*[0-9]).{8,20}$/;

//8에서 20자 이내
//영문, 숫자, 특수문자가 포함되어야하고 공백이 포함될 수 없습니다
