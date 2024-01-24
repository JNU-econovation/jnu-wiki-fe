import { useQuery } from "@tanstack/react-query";
import { searchDocs } from "@/services/document";
import { useState } from "react";

export const useSearchQuery = () => {
  const [inputValue, setInputValue] = useState("");

  const { isSuccess } = useQuery(
    ["search_docs", inputValue],
    () => searchDocs(inputValue),
    {
      enabled: !!inputValue,
      staleTime: 10000,
      cacheTime: 6 * 10000,
    }
  );

  return { inputValue, setInputValue, isSuccess };
};
