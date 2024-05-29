import styled from "styled-components";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SearchItem from "./SearchItem";
import { HELPER_MSG } from "@/constant/document/helpermsg";
import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";
import { useHandleSearchBar } from "@/hooks/useHandleSearchBar";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import Loader from "../common/layout/Loader";

const SearchBar = ({ $isDisplay }) => {
  const {
    node: searchRef,
    clicked: clickedSearch,
    handleOnClick: handleClickedSearch,
  } = useHandleClickOutside();
  const { focusRef, onFocusSearchBar, onBlurSearchBar } = useHandleSearchBar();
  const { debouncedSearch, data, isLoading, isError } = useSearchQuery();
  const keyword = focusRef?.current?.value;

  return (
    <>
      <ToastContainer />
      <Container $isDisplay={$isDisplay} onClick={handleClickedSearch}>
        {clickedSearch && (
          <StyledSearchResult ref={searchRef}>
            {data?.length > 0 &&
              data.slice(0, 8).map((el) => (
                <SearchItem key={el.docsId}>
                  <Link to={`/document/${el.docsId}`}>{el.docsName}</Link>
                </SearchItem>
              ))}
            {isError && <p>{HELPER_MSG.NO_SEARCH}</p>}
            {keyword !== "" && isLoading && <StyledLoader />}
          </StyledSearchResult>
        )}
        <StyledSearchBar
          type="search"
          placeholder="      검색"
          ref={focusRef}
          onFocus={onFocusSearchBar}
          onBlur={onBlurSearchBar}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </Container>
    </>
  );
};

const Container = styled.section`
  position: relative;
  width: 40rem;
  display: ${(props) => props.$isDisplay === false && "none"};

  > * {
    border: 0.5px solid #71717118;
    border-radius: 8px;
    width: 100%;
  }

  @media screen and (max-width: 1272px) {
    width: 45%;
  }

  @media screen and (max-width: 1272px) {
    width: 50%;
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

  @media screen and (max-width: 767px) {
    box-shadow: none;
    border: 0;
  }
`;

const StyledSearchResult = styled.article`
  position: absolute;
  top: 2.5rem;
  height: 20rem;

  padding: 3rem 1.3rem;

  background-color: white;
  box-shadow: 0px 3px 13px -4px rgba(0, 0, 0, 0.206);

  box-sizing: border-box;
  overflow-y: scroll;

  @media screen and (max-width: 767px) {
    height: 15rem;
  }
`;

const StyledLoader = styled(Loader)`
  position: absolute;
  transform: scale(0.8);
`;

export default SearchBar;
