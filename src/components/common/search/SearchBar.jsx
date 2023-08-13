import styled from "styled-components";
import { forwardRef } from "react";

const StyledSearchBar = styled.input`
  width: 60rem;
  height: 3rem;
  padding: 1.3rem;
  margin-right: 7rem;

  border: 0.5px solid #71717118;
  border-radius: 10px;
  box-shadow: 0px 0px 1px 0px rgba(9, 30, 66, 0.31),
    0px 4px 4px 0px rgba(0, 0, 0, 0.2);

  &::-webkit-input-placeholder {
    background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png);
    background-size: contain;
    background-repeat: no-repeat;
    text-indent: 0;
  }
`;

const SearchBar = forwardRef(({ type, onFocus, onBlur }, ref) => {
  return (
    <StyledSearchBar
      type={type}
      placeholder="      검색"
      onFocus={onFocus}
      onBlur={onBlur}
      ref={ref}
    />
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
