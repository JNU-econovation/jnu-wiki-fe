import { useState, useEffect } from "react";

const useInput = (initialValue) => {
  const [valueInit, setValue] = useState(initialValue);
  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setValue({ ...valueInit, [id]: value });
  };
  useEffect(
    (e) => {
      // console.log(valueInit.password);
    },
    [valueInit]
  );

  const reset = () => {
    setValue(initialValue);
  };

  return { valueInit, handleOnChange, reset };
};

export default useInput;
