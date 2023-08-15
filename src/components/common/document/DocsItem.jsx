import styled from "styled-components";

const Container = styled.div`
  color: #216d32;

  display: flex;
  flex-direction: column;

  min-width: 15rem;
  max-width: 22rem;

  cursor: pointer;

  span:nth-child(1) {
    font-size: 1.1rem;
    font-weight: bold;
    margin-right: 0.8rem;
    margin-bottom: 1.3rem;
  }

  span:nth-child(2) {
    font-size: 0.8rem;
  }
`;

const StyledHr = styled.hr`
  background-color: #8ea192;
  margin: 1.4rem 0;
`;

const DocsItem = ({ name, category, onClick }) => {
  return (
    <>
      <Container onClick={onClick}>
        <span>{name}</span>
        <span>{category}</span>
      </Container>
      <StyledHr />
    </>
  );
};

export default DocsItem;
