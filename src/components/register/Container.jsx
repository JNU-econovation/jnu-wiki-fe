import styled from "styled-components";

const Container = ({ children, marginBottom, onSubmit }) => {
  const goEnter = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <ContainerCss
      onKeyPress={goEnter}
      marginBottom={marginBottom}
      onSubmit={onSubmit}
    >
      <div>{children}</div>
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
  padding: 4rem 4rem 3rem 4rem;

  position: relative;
  left: 37%;
  top: 15rem;
  z-index: 1;
  margin-bottom: 30rem;
  box-sizing: content-box;

  @media screen and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    top: 8rem;
    left: auto;

    margin: 0 auto;
    padding: 0;

    box-shadow: initial;
    border: initial;
    margin-bottom: 0;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export default Container;
