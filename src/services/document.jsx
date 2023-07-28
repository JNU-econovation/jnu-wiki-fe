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

export const docsList = (page = 0) => {
  return instance.get("/docs" + "?page=" + page);
};

export const basicModify = (data) => {
  const { docsId, docsCategory, docsName, docsLocation } = data;
  return instance.post("/requests/update", {
    docsId,
    docsCategory,
    docsName,
    docsLocation,
  });
};

export const contentModify = (data) => {
  const { docs_id, docsContent } = data;
  return instance.put(`/docs/${docs_id}`, {
    docsContent,
  });
};
