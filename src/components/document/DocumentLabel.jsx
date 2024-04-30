import styled from "styled-components";

const DocumentLabel = ({ htmlFor, children }) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

const StyledLabel = styled.label`
  color: #216d32;
  font-size: 1.2rem;
  width: 7rem;

  @media screen and (max-width: 1023px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 767px) {
    width: 9rem;
  }
`;

export default DocumentLabel;
