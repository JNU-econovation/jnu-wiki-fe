import styled from "styled-components";
import "/public/fonts/pretendard.css";

const Btn = styled.button`
  width: 6.5rem;
  height: 3rem;
  border-radius: 99999px;
  font-size: 1rem;
  margin: 0 0.5rem;
  cursor: pointer;

  color: ${(props) => colors[props.color]};
  border: ${(props) => props.border};
  background-color: ${(props) => colors[props.backgroundcolor]};
`;

const colors = {
  primary: "#216D32",
  black: "#000000",
  white: "#ffffff",
};


const Button = ({
  children,
  type,
  color,
  border,
  backgroundcolor,
  onClick,
}) => {
  return (
    <Btn
      type={type}
      color={color}
      border={border}
      backgroundcolor={backgroundcolor}
      onClick={onClick}
    >

      {children}
    </Btn>
  );
};

export default Button;
