import styled from "styled-components";

const AlertStyle = styled.p`
  color: #ff1b1b;
  font-size: 12px;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;

  height: 1rem;

  display: flex;
  text-align: start;
`;

const AlertMessage = ({ children }) => {
  return <AlertStyle>{children}</AlertStyle>;
};

export default AlertMessage;
