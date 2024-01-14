import styled from "styled-components";

const Icon = ({
  children,
  size,
  color,
  onClick,
  hoverColor,
  hoverBackColor,
  margin,
  className,
}) => {
  return (
    <IconCss
      size={size}
      color={color}
      onClick={onClick}
      hoverBackColor={hoverBackColor}
      hoverColor={hoverColor}
      margin={margin}
      className={className}
    >
      {children}
    </IconCss>
  );
};

const IconCss = styled.div`
  cursor: pointer;
  font-size: ${(props) => props.size || "26px"};
  color: ${(props) => props.color || "#000000"};
  &:hover {
    color: ${(props) => props.hoverColor};
    background-color: ${(props) => props.hoverBackColor};
  }
  margin: ${(props) => props.margin};
`;

export default Icon;
