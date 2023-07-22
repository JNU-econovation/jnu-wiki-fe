import { instance } from "./index";

export const create = (data) => {
  const { docsName, docsCategory, docsLocation, docsContent, docsCreatedBy } =
    data;
  return instance.post("/docs", {
    docsName,
    docsCategory,
    docsLocation,
    docsContent,
    docsCreatedBy,
  });
};
