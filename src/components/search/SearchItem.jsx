import styled from "styled-components";

const Title = styled.div`
  color: #216d32;
  margin-bottom: 2rem;
  cursor: pointer;
`;
const SearchItem = ({ name, onClick }) => {
  return <Title onClick={onClick}>{name}</Title>;
};

export default SearchItem;
