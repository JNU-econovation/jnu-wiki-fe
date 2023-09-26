import styled from "styled-components";

const StyledDescription = styled.div`
  padding: 1.5rem 0;
`;

const Description = ({ children }) => {
  return <StyledDescription>{children}</StyledDescription>;
};

export default Description;
