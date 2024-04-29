import { useEffect } from "react";
import { DOCS_INFO, ERROR_MSG } from "@/constant/document/create";
import { useSelector } from "react-redux";

const useHandleAddress = (methods, address) => {
  const { latitude, longitude } = useSelector((state) => state.latLng);

  useEffect(() => {
    address && methods.clearErrors(DOCS_INFO.LOCATION);
  }, [address, methods]);

  const isExistAddress = () => {
    if (!address) {
      return methods.setError(DOCS_INFO.LOCATION, {
        message: ERROR_MSG.LOCATION,
      });
    }
  };

  const requestLocation = () => {
    methods.setValue(DOCS_INFO.LOCATION, {
      lat: latitude,
      lng: longitude,
    });
  };

  return { isExistAddress, requestLocation };
};

export default useHandleAddress;
