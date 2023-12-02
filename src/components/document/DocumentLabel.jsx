import styled from "styled-components";

const DocumentLabel = ({ htmlFor, children, className }) => {
  return (
    <SpanWidth className={className}>
      <LabelStyled htmlFor={htmlFor}>{children}</LabelStyled>
    </SpanWidth>
  );
};

const SpanWidth = styled.div`
  display: inline-block;
  width: 4.5rem;
`;

const LabelStyled = styled.label`
  color: #216d32;
  font-size: 1.1rem;
`;

export default DocumentLabel;
