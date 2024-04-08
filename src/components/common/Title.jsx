import styled from "styled-components";

const Title = ({ children, fontSize, margin }) => {
  return (
    <TitleStyle fontSize={fontSize} margin={margin}>
      {children}
    </TitleStyle>
  );
};

const TitleStyle = styled.h3`
  color: #216d32;
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
`;

export default Title;
