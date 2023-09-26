import styled from "styled-components";
export const Container = styled.div`
  position: absolute;
  left: 15rem;
  overflow-x: hidden;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);

  /* width: 20rem; */
  height: 80%;
`;

export const Title = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  list-style-type: none;

  /* width: 20rem; */
  height: 3rem;
  border-radius: 0.2rem;
  font-size: 1rem;

  background-color: rgba(222, 233, 224, 1);
  color: rgba(33, 109, 50, 1);
  font-weight: 600;

  &:first-child {
    margin-top: 2rem;
  }
  position: relative;
  right: 0.5rem;
  bottom: 2rem;
`;
