import { instance } from "./index";

export const scrapCreate = (data) => {
  const { docs_id } = data;
  return instance.post(`/scrap/create`, {
    docsId: docs_id,
  });
};

export const scrapDelete = (data) => {
  const { docs_id } = data;
  return instance.delete(`/scrap`, {
    data: {
      docsId: docs_id,
    },
  });
};
