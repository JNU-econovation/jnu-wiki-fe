import { instance } from "./index";

export const create = (data) => {
  const { docsName, docsCategory, docsLocation } = data;
  return instance.post("/requests/new", {
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

  return instance.get("/docs/" + id);
};

export const mapDocument = () => {
  return instance.get("/docs");
};

export const docsList = ({
  pageParam,
  rightUpLa = 126.92732024258463,
  rightUpMa = 35.18296634520686,
  leftDownLa = 126.89218416518544,
  leftDownMa = 35.16927559740505,
}) => {
  return instance.get(
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
  return instance.post("/requests/update", {
    docsId,
    docsRequestType,
    docsRequestCategory,
    docsRequestName,
    docsRequestLocation,
  });
};

export const contentModify = (data) => {
  const { docs_id, docsContent } = data;
  return instance.put(`/docs/${docs_id}`, {
    docsContent,
  });
};

export const searchDocs = (text) => {
  return instance.get("/docs/search" + "?search=" + text);
};
