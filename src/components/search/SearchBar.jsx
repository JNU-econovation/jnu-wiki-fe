import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchDocs } from "@/services/document";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import SearchItem from "./SearchItem";
import { ToastContainer } from "react-toastify";
import { HELPER_MSG } from "@/constant/helpermsg";

const StyledSearchBar = styled.input`
  width: 40rem;
  height: 3rem;
  padding: 1.3rem;
  z-index: 100000;
  position: relative;
  top: 0;
  left: 0;

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

const Container = styled.div`
  position: absolute;
  top: 3rem;

  width: 37.3rem;
  height: 20rem;

  padding: 3rem 1.3rem;

  background-color: white;
  border: 0.5px solid #71717118;
  border-radius: 10px;
`;

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
      staleTime: 6 * 10 * 1000,
      cacheTime: 6 * 10 * 1000,
    }
  );

  const handleOnClick = (el) => {
    navigate(`/document/${el}`);
    setClickedSearch(false);
  };

  return (
    <>
      <ToastContainer />
      <div>
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
        {isSuccess
          ? clickedSearch &&
            inputValue && (
              <Container ref={searchRef}>
                {searchResults &&
                  searchResults
                    .slice(0, 8)
                    .map((el) => (
                      <SearchItem
                        key={el.docsId}
                        name={el.docsName}
                        onClick={() => handleOnClick(el.docsId)}
                      />
                    ))}
              </Container>
            )
          : clickedSearch &&
            inputValue && (
              <Container ref={searchRef}>{HELPER_MSG.NO_SEARCH}</Container>
            )}
      </div>
    </>
  );
};

export default SearchBar;
