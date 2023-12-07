import Input from "./Input";
import Box from "@/components/register/Box";
import Label from "@/components/register/Label";
import AlertMessage from "@/components/register/AlertMessage";
import DoubleCheck from "@/components/register/DoubleCheck";
import styled from "styled-components";
import { DoubleCheckStyle } from "../../register/DoubleCheck";
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
  inputValue,
}) => {
  return (
    <Box>
      <Label htmlFor={id} child={label} margin={margin}></Label>
      <InputCss>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          mypage={mypage}
          register={register}
          rules={rules}
          inputValue={inputValue}
        />
        {doubleCheck && (
          <DoubleCheck
            active={value && !error}
            onClick={doubleCheck}
          ></DoubleCheck>
        )}
        {btn && !doubleCheck && (
          <ChangeButton className="mypageBtn">변경</ChangeButton>
        )}
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
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const ChangeButton = styled(DoubleCheckStyle)`
  background-color: #ebebeb;
  color: #216d32;
  border: 1px solid #216d32;
`;

export default InputGroup;
