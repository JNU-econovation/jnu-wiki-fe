import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  left: 15rem;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  border-radius: 0 0 10px 0;

  overflow-y: auto;
  max-height: calc(100vh - 6rem - 2 * 2rem);

  @media screen and (max-width: 1023px) {
    left: 0;
    bottom: 3.4rem;
  }

  @media screen and (max-width: 767px) {
    left: auto;
    top: auto;

    height: 30%;
    width: 100%;

    box-sizing: border-box;
    border-radius: 10px 10px 0 0;
    box-shadow: 0px -10px 10px 0px rgba(0, 0, 0, 0.106);
  }
`;
