import styled from "styled-components";

const SearchItem = ({ name, onClick }) => {
  return <Title onClick={onClick}>{name}</Title>;
};

const Title = styled.div`
  color: #216d32;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

export default SearchItem;
