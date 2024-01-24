import { useRef } from "react";

export const useHandleSearchBar = () => {
  const focusRef = useRef(null);

  const onFocusSearchBar = () => {
    focusRef.current.placeholder = "";
  };

  const onBlurSearchBar = () => {
    focusRef.current.placeholder = "      검색";
  };

  return { focusRef, onFocusSearchBar, onBlurSearchBar };
};
