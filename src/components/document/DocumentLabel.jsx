import styled from "styled-components";

const SpanWidth = styled.div`
  display: inline-block;
  width: 4.5rem;
`;

const LabelStyled = styled.label`
  color: #216d32;
  font-size: 1.1rem;
`;

const DocumentLabel = ({ htmlFor, children, className }) => {
  return (
    <SpanWidth className={className}>
      <LabelStyled htmlFor={htmlFor}>{children}</LabelStyled>
    </SpanWidth>
  );
};

export default DocumentLabel;
