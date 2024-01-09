import styled from "styled-components";

export const Container = styled.div`
  color: #216d32;
  font-size: 1.2rem;

  display: flex;
  flex-direction: column;

  width: 16rem;

  cursor: pointer;

  .title {
    font-size: 1.2rem;
    font-weight: bold;

    margin-bottom: 0.9rem;

    display: flex;
    justify-content: space-between;
  }

  .category {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 1023px) {
    .title {
      font-size: 1.1rem;
    }
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    box-sizing: border-box;
    .title {
      font-size: 1rem;
      margin-bottom: 0.7rem;
    }
  }
`;

export const StyledHr = styled.hr`
  background-color: #c7c7c6;
  border: 0;
  width: 100%;
  height: 1px;
  margin: 1.5rem 0;
`;
