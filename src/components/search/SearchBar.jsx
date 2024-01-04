import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { ToastContainer } from "react-toastify";

import { searchDocs } from "@/services/document";
import SearchItem from "./SearchItem";
import { HELPER_MSG } from "@/constant/document/helpermsg";

const SearchBar = () => {
  const focusRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [clickedSearch, setClickedSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleOnClickedSearch = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setClickedSearch(false);
      } else {
        setClickedSearch(true);
      }
    };

    document.addEventListener("mousedown", handleOnClickedSearch);
    return () => {
      document.removeEventListener("mousedown", handleOnClickedSearch);
    };
  }, [searchRef]);

  const onFocusSearchBar = () => {
    focusRef.current.placeholder = "";
  };

  const onBlurSearchBar = () => {
    focusRef.current.placeholder = "      검색";
  };

  const debouncedSearchDocs = debounce(async (value) => {
    const datas = await searchDocs(value);
    setSearchResults(datas.data.response);
  }, 300);

  const throttledSearchDocs = throttle((value) => {
    searchDocs(value);
  }, 300);

  const { isSuccess } = useQuery(
    ["search_docs", inputValue],
    () => searchDocs(inputValue),
    {
      enabled: !!inputValue,
      staleTime: 10000,
      cacheTime: 6 * 10000,
    }
  );

  const handleOnClick = (el) => {
    navigate(`/document/${el}`);
    setClickedSearch(false);
  };

  return (
    <>
      <ToastContainer />
      <Container>
        {clickedSearch && inputValue && (
          <StyledSearchResult ref={searchRef}>
            {isSuccess &&
              searchResults &&
              searchResults
                .slice(0, 8)
                .map((el) => (
                  <SearchItem
                    key={el.docsId}
                    name={el.docsName}
                    onClick={() => handleOnClick(el.docsId)}
                  />
                ))}
            {!isSuccess && HELPER_MSG.NO_SEARCH}
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

const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 40rem;

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
    top: 7rem;
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

  font-size: 1.1rem;
  box-shadow: 0px 0px 1px 0px rgba(9, 30, 66, 0.31),
    0px 4px 4px 0px rgba(0, 0, 0, 0.2);

  &::-webkit-input-placeholder {
    background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png);
    background-size: contain;
    background-repeat: no-repeat;
    text-indent: 0;
  }
`;

const StyledSearchResult = styled.div`
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
