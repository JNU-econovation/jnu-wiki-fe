import { instance } from "./index";

export const scrapCreate = (data) => {
  const { memberId, docsId } = data;
  return instance.post(`/scrap/create`, {
    memberId,
    docsId,
  });
};

export const scrapDelete = (data) => {
  const { memberId, docsId } = data;
  return instance.delete(`/scrap`, {
    data: {
      memberId,
      docsId,
    },
  });
};
