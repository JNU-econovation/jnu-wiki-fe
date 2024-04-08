import styled from "styled-components";

const Box = ({ children, bottom }) => {
  return <BoxCss bottom={bottom}>{children}</BoxCss>;
};

const BoxCss = styled.div`
  background-color: #ffffff;

  width: 423px;
  margin-top: 1.2rem;

  position: relative;
  bottom: ${(props) => (props ? "0" : "2rem")};

  @media screen and (max-width: 767px) {
    width: 21rem;
  }
`;

export default Box;
