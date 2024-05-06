import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useBottomDisplay = () => {
  const { isDisplay } = useSelector((state) => state.display);
  const dispatch = useDispatch();

  const handleOnDisplay = () => {
    isDisplay
      ? dispatch({ type: "disableDisplay" })
      : dispatch({ type: "enableDisplay" });
  };

  return { isDisplay, handleOnDisplay };
};
