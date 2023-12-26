import styled from "styled-components";

const Label = ({ htmlFor, child }) => {
  return <LabelCss htmlFor={htmlFor}>{child}</LabelCss>;
};

const LabelCss = styled.label`
  text-align: start;
  color: #216d32;

  margin: 0.8rem 0;
`;

export default Label;
