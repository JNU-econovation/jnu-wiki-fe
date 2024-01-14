import styled from "styled-components";

const BoxCss = styled.div`
  background-color: #ffffff;

  width: 423px;

  display: flex;
  flex-direction: column;

  position: relative;
  bottom: ${(props) => (props ? "0" : "2rem")};

  @media screen and (max-width: 767px) {
    width: 21rem;
  }
`;

const Box = ({ children, bottom }) => {
  return <BoxCss bottom={bottom}>{children}</BoxCss>;
};

export default Box;
