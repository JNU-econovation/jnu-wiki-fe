import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";

const StyledErrorMsg = styled.p`
  margin: 0.5rem 0 -1.3rem 0;

  color: #ff3838;

  font-size: 0.8rem;
  font-weight: 400;
`;

const ErrorMsg = ({ errors, name }) => {
  return <ErrorMessage errors={errors} name={name} as={<StyledErrorMsg />} />;
};

export default ErrorMsg;
