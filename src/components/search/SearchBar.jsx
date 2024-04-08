import styled from "styled-components";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SearchItem from "./SearchItem";
import { HELPER_MSG } from "@/constant/document/helpermsg";
import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";
import { useHandleSearchBar } from "@/hooks/useHandleSearchBar";
import { useSearch } from "@/hooks/useSearch";
import { useSearchQuery } from "@/hooks/useSearchQuery";

const SearchBar = ({ isDisplay }) => {
  const {
    node: searchRef,
    clicked: clickedSearch,
    handleOnClick: handleClickedSearch,
  } = useHandleClickOutside();

  const { focusRef, onFocusSearchBar, onBlurSearchBar } = useHandleSearchBar();

  const { searchResults, debouncedSearchDocs, throttledSearchDocs } =
    useSearch();

  const { inputValue, setInputValue, isSuccess } = useSearchQuery();

  return (
    <>
      <ToastContainer />
      <Container isDisplay={isDisplay} onClick={handleClickedSearch}>
        {clickedSearch && inputValue && (
          <StyledSearchResult ref={searchRef}>
            {isSuccess ? (
              searchResults.slice(0, 8).map((el) => (
                <SearchItem key={el.docsId}>
                  <Link to={`/document/${el.docsId}`}>{el.docsName}</Link>
                </SearchItem>
              ))
            ) : (
              <p>{HELPER_MSG.NO_SEARCH}</p>
            )}
          </StyledSearchResult>
        )}
        <StyledSearchBar
          type="search"
          placeholder="      검색"
          ref={focusRef}
          onFocus={onFocusSearchBar}
          onBlur={onBlurSearchBar}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            debouncedSearchDocs(e.target.value);
            throttledSearchDocs(e.target.value);
          }}
        />
      </Container>
    </>
  );
};

const Container = styled.section`
  position: relative;
  top: 0;
  left: 0;
  width: 40rem;
  display: ${(props) => props.isDisplay === false && "none"};

  > * {
    border: 0.5px solid #71717118;
    border-radius: 10px;
    width: 100%;
  }

  @media screen and (max-width: 1272px) {
    width: 45%;
  }

  @media screen and (max-width: 767px) {
    position: absolute;
    top: 5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
  }
`;

const StyledSearchBar = styled.input`
  position: relative;
  height: 3rem;
  padding: 1.3rem;
  z-index: 999;

  font-size: 1rem;
  box-shadow: 0px 0px 1px 0px rgba(9, 30, 66, 0.31),
    0px 4px 4px 0px rgba(0, 0, 0, 0.2);

  &::-webkit-input-placeholder {
    background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png);
    background-size: contain;
    background-repeat: no-repeat;
    text-indent: 0;
  }
`;

const StyledSearchResult = styled.article`
  position: absolute;
  top: 2rem;
  height: 20rem;

  padding: 3rem 1.3rem;

  background-color: white;
  box-sizing: border-box;

  @media screen and (max-width: 767px) {
    height: 15rem;
    overflow-y: scroll;
  }
`;

export default SearchBar;
