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
  rightUpLa,
  rightUpMa,
  leftDownLa,
  leftDownMa,
}) => {
  return instance.get(
    `/docs?rightUp[lat]=${rightUpLa}&rightUp[lng]=${rightUpMa}&leftDown[lat]=${leftDownLa}&leftDown[lng]=${leftDownMa}&page=${pageParam}`
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
