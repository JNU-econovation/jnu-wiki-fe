import styled from "styled-components";
import ScrapBtn from "../document/ScrapBtn";
import DocsItem from "../document/DocsItem";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { scrapCreate, scrapDelete } from "../../../services/scrap";
import ScrapDocs from "./ScrapDocs";

const ScrapList = ({ datas }) => {
  const navigate = useNavigate();
  const gotoDetail = (data) => {
    navigate(routes.documentPage, { state: data });
  };

  const docsData = datas?.pages.flatMap((x) => x.data.response);
  const docsListArray = docsData || [];
  const [scrapList, setScrapList] = useState([]);

  const { mutate: createScrap } = useMutation({
    mutationFn: scrapCreate,
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: deleteScrap } = useMutation({
    mutationFn: scrapDelete,
    onError: (error) => {
      console.error(error);
    },
  });

  const handleOnScrap = (el, scrap) => {
    const isSelected = scrapList.find((option) => option.id === el.docsId);

    if (scrap) {
      setScrapList((prev) => [
        ...prev,
        {
          id: el.docsId,
          scrap: scrap,
        },
      ]);
      createScrap({ docsId: el.docsId });
    } else {
      setScrapList(scrapList.filter((x) => x !== isSelected));
      deleteScrap({ docsId: el.docsId });
    }
  };
  console.log(datas);
  return (
    <>
      {docsListArray?.map((data) => (
        <div key={data.docsId} onClick={() => gotoDetail(data)}>
          <ScrapDocs
            name={data.docsName}
            category={data.docsCategory}
            onScrapClick={(scrap) => handleOnScrap(data, scrap)}
          >
            {/* <div key={data.docsId} onClick={() => gotoDetail(data)}></div>
          <DocsItem
            name={data.docsId}
            category={data.docsCategory}
            onScrapClick={(scrap) => handleOnScrap(data, scrap)}
          /> */}
          </ScrapDocs>
        </div>
      ))}
    </>
  );
};

export default ScrapList;
