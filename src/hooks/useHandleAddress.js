import { useEffect, useState } from "react";
import { DOCS_INFO, ERROR_MSG } from "@/constant/document/create";

const useHandleAddress = (methods, address, lat, lng) => {
  const [inputAddress, setInputAddress] = useState(address);

  useEffect(() => {
    setInputAddress(address);
  }, [address, lat]);

  const clearAddress = () => {
    setInputAddress("");
  };

  useEffect(() => {
    inputAddress && methods.clearErrors(DOCS_INFO.LOCATION);
  }, [inputAddress, methods]);

  const isAddress = () => {
    if (!inputAddress) {
      return methods.setError(DOCS_INFO.LOCATION, {
        message: ERROR_MSG.LOCATION,
      });
    }
  };

  !!inputAddress &&
    methods.setValue(DOCS_INFO.LOCATION, {
      lat,
      lng,
    });

  return { inputAddress, clearAddress, isAddress };
};

export default useHandleAddress;
