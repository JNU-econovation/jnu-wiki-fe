import styled from "styled-components";

const Subtitle = ({ children, fontSize, margin }) => {
  return (
    <SubtitleStyle fontSize={fontSize} margin={margin}>
      {children}
    </SubtitleStyle>
  );
};

const SubtitleStyle = styled.span`
  color: #216d32;
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
`;

export default Subtitle;
