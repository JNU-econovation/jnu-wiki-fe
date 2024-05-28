import styled from "styled-components";

const Btn = styled.button`
  width: 6rem;
  height: 2.5rem;
  border-radius: 10px;
  font-size: 1rem;
  margin: 0 0.5rem;
  cursor: pointer;

  color: ${(props) => colors[props.color]};
  border: ${(props) => props.border};
  background-color: ${(props) => colors[props.$backgroundColor]};
`;

const colors = {
  primary: "#216D32",
  black: "#000000",
  white: "#ffffff",
};

const Button = ({
  children,
  color,
  border,
  $backgroundColor,
  onClick,
  className,
  type = "click",
}) => {
  return (
    <Btn
      type={type}
      color={color}
      border={border}
      $backgroundColor={$backgroundColor}
      onClick={onClick}
      className={className}
    >
      {children}
    </Btn>
  );
};

export default Button;
