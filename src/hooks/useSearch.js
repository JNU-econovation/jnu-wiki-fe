import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { useState } from "react";
import { searchDocs } from "@/services/document";

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearchDocs = debounce(async (value) => {
    const datas = await searchDocs(value);
    setSearchResults(datas.data.response);
  }, 300);

  const throttledSearchDocs = throttle((value) => {
    searchDocs(value);
  }, 300);

  return {
    searchResults,
    debouncedSearchDocs,
    throttledSearchDocs,
  };
};
