import styled from "styled-components";

const SearchItem = ({ children, onClick }) => {
  return <Title onClick={onClick}>{children}</Title>;
};

const Title = styled.li`
  list-style: none;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  cursor: pointer;

  > * {
    text-decoration-line: none;
    color: #216d32;
  }
`;

export default SearchItem;
