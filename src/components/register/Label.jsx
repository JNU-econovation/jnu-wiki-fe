import styled from "styled-components";

const LabelCss = styled.label`
  text-align: start;
  color: #216d32;

  margin: 0.8rem 0;
`;

const Label = ({ htmlFor, child }) => {
  return <LabelCss htmlFor={htmlFor}>{child}</LabelCss>;
};

export default Label;
