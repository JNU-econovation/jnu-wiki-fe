import styled from "styled-components";

const SpanWidth = styled.div`
  display: inline-block;
  width: 4rem;
`;

const LabelStyled = styled.label`
  color: #216d32;
`;

const DocumentLabel = ({ htmlFor, children }) => {
  return (
    <SpanWidth>
      <LabelStyled htmlFor={htmlFor}>{children}</LabelStyled>
    </SpanWidth>
  );
};

export default DocumentLabel;
