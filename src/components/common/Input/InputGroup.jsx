import Input from "./Input";
import Box from "@/components/register/Box";
import Label from "@/components/register/Label";
import AlertMessage from "@/components/register/AlertMessage";
import DoubleCheck from "@/components/register/DoubleCheck";
import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";

const InputGroup = ({
  id,
  type,
  label,
  placeholder,
  mypage,
  margin,
  btn,
  register,
  error,
  rules,
  // onChange,
  doubleCheck,
  value,
}) => {
  console.log(value);
  return (
    <Box>
      <Label htmlFor={id} child={label} margin={margin}></Label>
      <InputCss>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          mypage={mypage}
          btn={btn}
          register={register}
          rules={rules}
        />
        {doubleCheck && (
          <DoubleCheck
            active={value && !error}
            onClick={doubleCheck}
          ></DoubleCheck>
        )}
        {btn ? <button className="mypageBtn">변경</button> : null}
      </InputCss>

      {error?.type === "required" && (
        <AlertMessage>{error?.message}</AlertMessage>
      )}
      {error?.type === "pattern" && (
        <AlertMessage>{error?.message}</AlertMessage>
      )}
      {error?.type === "jnuEmail" && (
        <AlertMessage>{error?.message}</AlertMessage>
      )}
      {error?.type === "maxLength" && (
        <AlertMessage>{error?.message}</AlertMessage>
      )}
      {error?.type === "passwordReCheck" && (
        <AlertMessage>{error?.message}</AlertMessage>
      )}
    </Box>
  );
};
const InputCss = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  & .mypageBtn {
    width: 53px;
    height: 33px;
    margin-left: 1rem;

    background: #ffffff;
    border: 1px solid #216d32;
    border-radius: 8px;

    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    text-align: center;

    color: #216d32;
  }
`;

export default InputGroup;
