import styled from "styled-components";

export const StyledElement = styled.div`
  box-sizing: border-box;
  padding: 0.5rem 0.8rem;
  font-size: 0.9rem;

  width: 16rem;
  border-radius: 8px;
  border: 1.5px solid #6b6b6b;

  &:focus {
    outline: 1.5px solid #216d32;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
