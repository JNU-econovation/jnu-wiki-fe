import styled from "styled-components";
import "../assets/fonts/pretendard.css";

const SignUpBtn = styled.button`
  width: 6.5rem;
  height: 3rem;
  border-radius: 99999px;
  font-size: 1rem;
  margin: 0 0.5rem;
  cursor: pointer;

  color: ${(props) => props.color};
  border: ${(props) => props.border};
  background-color: ${(props) => props.backgroundColor};
`;

const Button = ({ name, color, border, backgroundColor }) => {
  return (
    <SignUpBtn
      type="button"
      color={color}
      border={border}
      backgroundColor={backgroundColor}
    >
      {name}
    </SignUpBtn>
  );
};

export default Button;
