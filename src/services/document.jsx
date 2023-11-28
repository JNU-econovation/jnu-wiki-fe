import { Instance } from "./index";

export const create = (data) => {
  const { docsName, docsCategory, docsLocation } = data;
  return Instance.post("/requests/new", {
    docsRequestType: "CREATED",
    docsRequestCategory: docsCategory,
    docsRequestName: docsName,
    docsRequestLocation: docsLocation,
  });
};

export const detailDocument = (id = 1) => {
  if (!id) {
    throw Error("id가 없습니다.");
  }

  return Instance.get("/docs/" + id);
};

export const mapDocument = () => {
  return Instance.get("/docs");
};

export const docsList = ({
  pageParam,
  rightUpLa = 126.92732024258463,
  rightUpMa = 35.18296634520686,
  leftDownLa = 126.89218416518544,
  leftDownMa = 35.16927559740505,
}) => {
  return Instance.get(
    `/docs?rightLat=${rightUpMa}&rightLng=${rightUpLa}&leftLat=${leftDownMa}&leftLng=${leftDownLa}&page=${pageParam}`
  );
};

export const basicModify = (data) => {
  const {
    docsId,
    docsRequestType,
    docsRequestCategory,
    docsRequestName,
    docsRequestLocation,
  } = data;
  return Instance.post("/requests/update", {
    docsId,
    docsRequestType,
    docsRequestCategory,
    docsRequestName,
    docsRequestLocation,
  });
};

export const contentModify = (data) => {
  const { docs_id, docsContent } = data;
  return Instance.put(`/docs/${docs_id}`, {
    docsContent,
  });
};

export const searchDocs = (text) => {
  return Instance.get("/docs/search" + "?search=" + text);
};
