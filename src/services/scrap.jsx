import { Instance } from "./index";

export const scrapCreate = (data) => {
  const { memberId, docsId } = data;
  return Instance.post(`/scrap/`, {
    memberId,
    docsId,
  });
};

export const scrapDelete = (data) => {
  const { memberId, docsId } = data;
  return Instance.delete(`/scrap/`, {
    data: {
      memberId,
      docsId,
    },
  });
};
