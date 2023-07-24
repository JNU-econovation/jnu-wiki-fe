import { instance } from "./index";

export const create = (data) => {
  const { docsName, docsCategory, docsLocation } = data;
  return instance.post("/requests/new", {
    docsCategory,
    docsName,
    docsLocation,
  });
};
