import styled from "styled-components";

const LabelStyled = styled.label`
  color: #216d32;
`;

const DocumentLabel = ({ htmlFor, children }) => {
  return <LabelStyled htmlFor={htmlFor}>{children}</LabelStyled>;
};

export default DocumentLabel;
