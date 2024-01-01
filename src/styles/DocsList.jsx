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
`;
