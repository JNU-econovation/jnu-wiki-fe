import { instance } from "./index";
import { INIT_BOUND } from "@/constant/map";

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
  rightUpLa = INIT_BOUND.RIGHT_LA,
  rightUpMa = INIT_BOUND.RIGHT_MA,
  leftDownLa = INIT_BOUND.LEFT_LA,
  leftDownMa = INIT_BOUND.LEFT_MA,
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
