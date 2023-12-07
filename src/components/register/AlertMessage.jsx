import styled from "styled-components";

const AlertStyle = styled.p`
  color: #ff1b1b;
  font-size: 12px;
  margin-bottom: 1rem;

  height: 1rem;

  display: flex;
  text-align: start;
`;

const AlertMessage = ({ children }) => {
  return <AlertStyle>{children}</AlertStyle>;
};

export default AlertMessage;
