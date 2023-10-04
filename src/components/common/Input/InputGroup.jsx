import Input from "./Input";
import Box from "@/components/register/Box";
import Label from "@/components/register/Label";
import AlertMessage from "@/components/register/AlertMessage";
import DoubleCheck from "@/components/register/DoubleCheck";
import styled from "styled-components";

const InputGroup = ({
  id,
  name,
  type,
  value,
  onChange,
  label,
  placeholder,
  para,
  mypage,
  margin,
  btn,
}) => {
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
        />
        {btn ? <button>변경</button> : null}
      </InputCss>

      <AlertMessage para={para}></AlertMessage>
    </Box>
  );
};
const InputCss = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;

  & > button {
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
