import { instance } from "./index";

export const create = (data) => {
  const { docsName, docsCategory, docsLocation } = data;
  return instance.post("/requests/new", {
    docsCategory,
    docsName,
    docsLocation,
  });
};

export const detailDocument = (id = 0) => {
  if (!id) {
    throw Error("id가 없습니다.");
  }

  return instance.get(
    // "/docs/" + id
    "https://a1384822-b40b-4a9e-ae44-598dc20b6ad1.mock.pstmn.io//docs/%7Bdocs_id%7D"
  );
};

export const basicModify = (data) => {
  const { docsCategory, docsName, docsLocation } = data;
  return instance.post("/requests/update", {
    docsCategory,
    docsName,
    docsLocation,
  });
};
