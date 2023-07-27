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

export const docsList = () => {
  return instance.get("/docs");
};

export const basicModify = (data) => {
  const { docsCategory, docsName, docsLocation } = data;
  return instance.post("/requests/update", {
    docsCategory,
    docsName,
    docsLocation,
  });
};

export const contentModify = (docs_id, updatedData) => {
  return instance.put(`/docs/${docs_id}`, updatedData);
};
