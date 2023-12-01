import styled from "styled-components";

const Container = ({ children, marginBottom, onKeyPress, onSubmit }) => {
  return (
    <ContainerCss
      onKeyPress={onKeyPress}
      marginBottom={marginBottom}
      onSubmit={onSubmit}
    >
      {children}
    </ContainerCss>
  );
};

const ContainerCss = styled.form`
  background-color: #ffffff;
  border: 0.5px solid #878787;
  border-radius: 0.5rem;
  //밖그림자
  box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.05);

  width: 26rem;
  padding: 0 3rem 0 3rem;

  position: relative;
  left: 37%;
  top: 15rem;
  z-index: 1;
  margin-bottom: 30rem;
`;

export default Container;
