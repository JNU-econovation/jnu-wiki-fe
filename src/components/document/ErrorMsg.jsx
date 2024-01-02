import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";

const ErrorMsg = ({ errors, name }) => {
  return <ErrorMessage errors={errors} name={name} as={<StyledErrorMsg />} />;
};

const StyledErrorMsg = styled.p`
  margin-top: 0.5rem;

  color: #ff3838;

  font-size: 0.9rem;
  font-weight: 400;
`;

export default ErrorMsg;
