import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { useState } from "react";
import { searchDocs } from "@/services/document";

export const useSearchQuery = () => {
  const [keyword, setKeyword] = useState("");

  const debouncedSearch = debounce((value) => {
    setKeyword(value);
  }, 200);

  const { data, isLoading, isError } = useQuery(
    ["search_docs", keyword],
    () => searchDocs(keyword),
    {
      enabled: !!keyword,
      select: (data) => data?.data?.response,
      staleTime: 6 * 10 * 1000,
      cacheTime: 6 * 10 * 1000,
      retry: 0,
    }
  );

  return { debouncedSearch, data, isLoading, isError };
};
