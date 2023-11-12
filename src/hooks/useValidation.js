import { useState } from "react";
import { ERROR_MSG } from "@/constant/helpermsg";

const useValidation = (initialValue) => {
  const [msg, setMsg] = useState(initialValue);

  const docsNameCheck = (docsName) => {
    return docsName === "" && ERROR_MSG.NAME;
  };
  const docsLocation = (docsLocation) => {
    return !docsLocation.lat && ERROR_MSG.LOCATION;
  };
  const docsCategory = (docsCategory) => {
    return docsCategory === "" && ERROR_MSG.CATEGORY;
  };

  const handleSetMsg = (id, value) => {
    let newMsg = "";
    if (id === "docsName") {
      newMsg = docsNameCheck(value);
    } else if (id === "docsLocation") {
      newMsg = docsLocation(value);
    } else {
      newMsg = docsCategory(value);
    }
    setMsg(newMsg);
  };

  const clearMsg = () => {
    setMsg("");
  };

  return { msg, handleSetMsg, clearMsg };
};

export default useValidation;
