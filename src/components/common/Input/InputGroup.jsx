import Input from "./Input";
import Box from "@/components/register/Box";
import Label from "@/components/register/Label";
import AlertMessage from "@/components/register/AlertMessage";
import DoubleCheck from "@/components/register/DoubleCheck";
import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";

const InputGroup = ({
  id,
  name,
  type,
  value,
  onChange,
  label,
  placeholder,
  mypage,
  margin,
  btn,
  onClick,
  register,
  error,
  rules,
  doubleCheck,
}) => {
  console.log(error);
  return (
    <Box>
      <Label htmlFor={id} child={label} margin={margin}></Label>
      <InputCss>
        <Input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          mypage={mypage}
          btn={btn}
          register={register}
          rules={rules}
        />
        {/* <DoubleCheck active={!error} onClick={doubleCheck}></DoubleCheck> */}
        {btn ? (
          <button className="mypageBtn" onClick={(e) => onClick(e)}>
            변경
          </button>
        ) : null}
        {/* <ErrorMessage
          errors={error}
          name={id}
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <AlertMessage key={type}>{message}</AlertMessage>
            ))
          }
        /> */}
      </InputCss>

      {/* {error?.type === "required" && (
        <AlertMessage>{error?.message}</AlertMessage>
      )}
      {error?.type === "pattern" && (
        <AlertMessage>{error?.message}</AlertMessage>
      )} */}
    </Box>
  );
};
const InputCss = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;

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
