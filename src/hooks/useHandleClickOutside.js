import { useState, useRef, useEffect } from "react";

export const useHandleClickOutside = () => {
  const [clicked, setClicked] = useState(false);

  const handleOnClick = () => {
    setClicked((prev) => !prev);
  };

  const node = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      if (clicked && node.current && !node.current.contains(e.target)) {
        setClicked(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [clicked]);

  return { node, clicked, setClicked, handleOnClick };
};
