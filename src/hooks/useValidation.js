import { useState } from "react";

const useValidation = (initialValue) => {
  const [msg, setMsg] = useState(initialValue);

  const docsNameCheck = (docsName) => {
    return docsName === "" ? "문서 제목을 입력해주세요." : "";
  };
  const docsLocation = (docsLocation) => {
    return docsLocation.lat === undefined || docsLocation.lng === undefined
      ? "위치를 지도에서 클릭해주세요"
      : "";
  };
  const docsCategory = (docsCategory) => {
    return docsCategory === "" ? "카테고리를 입력해주세요." : "";
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

  return { msg, handleSetMsg };
};

export default useValidation;
