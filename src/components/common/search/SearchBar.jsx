import styled from "styled-components";
import { forwardRef, useEffect, useState, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchDocs } from "../../../services/document";
import Loader from "../layout/Loader";
import DocsItem from "../document/DocsItem";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

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

const Container = styled.div`
  overflow: hidden;
  position: absolute;
  left: 20rem;
  overflow-x: hidden;
  top: 6rem;
  padding: 2rem 2rem 0 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
`;

const SearchBar = () => {
  const focusRef = useRef(null);

  const onFocusSearchBar = () => {
    focusRef.current.placeholder = "";
  };

  const onBlurSearchBar = () => {
    focusRef.current.placeholder = "      검색";
  };
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const debouncedSearchDocs = debounce(async (value) => {
    const datas = await searchDocs(value);
    setSearchResults(datas.data.response);
  }, 300);

  const throttledSearchDocs = throttle((value) => {
    searchDocs(value);
  }, 300);

  const bottomObserver = useRef(null);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(["search", inputValue], () => searchDocs(inputValue), {
      getNextPageParam: (currentPage, allPages) => {
        const nextPage = allPages.length;
        return nextPage > 3 ? null : nextPage;
      },
    });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      {
        threshold: 1.0,
      }
    );

    if (bottomObserver.current) {
      io.observe(bottomObserver.current);
    }

    return () => {
      if (bottomObserver.current) {
        io.unobserve(bottomObserver.current);
      }
    };
  }, [isLoading, hasNextPage, fetchNextPage]);

  const docsData = data?.pages.flatMap((x) => x.data.response);
  const docsListArray = docsData || [];
  const [selectedDocs, setSelectedDocs] = useState([]);

  const handleOnClick = (el) => {
    setSelectedDocs((prev) => [
      ...prev,
      {
        id: el.docsId,
        docsLocation: {
          lat: el.docsLocation.lat,
          lng: el.docsLocation.lng,
        },
      },
    ]);
    selectedDocs.length > 0 &&
      navigate(routes.documentPage, { state: selectedDocs[0] });
  };

  return (
    <>
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

      {inputValue && hasNextPage && (
        <Container>
          {isLoading && <Loader />}
          {/* {isError && <div>error</div>} */}
          {searchResults &&
            searchResults.map((el) => (
              <DocsItem
                key={el.docsId}
                name={el.docsName}
                category={el.docsCategory}
                onClick={() => handleOnClick(el)}
              />
            ))}
          <div ref={bottomObserver}></div>
          {isLoading && !hasNextPage && <Loader />}
        </Container>
      )}
    </>
  );
};

SearchBar.displayName = "SearchBar";

export default SearchBar;
