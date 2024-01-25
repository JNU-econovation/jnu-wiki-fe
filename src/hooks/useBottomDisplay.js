import { useState } from "react";

export const useBottomDisplay = () => {
  const [display, setDisplay] = useState(true);

  const handleOnDisplay = () => {
    setDisplay((prop) => !prop);
  };

  return { display, handleOnDisplay };
};
