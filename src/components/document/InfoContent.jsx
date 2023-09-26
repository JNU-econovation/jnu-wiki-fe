import styled from "styled-components";

const StyledSpan = styled.span`
  margin-left: 1rem;
`;

const InfoContent = ({ children }) => {
  return <StyledSpan>{children}</StyledSpan>;
};

export default InfoContent;
