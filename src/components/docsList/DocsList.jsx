import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DocsItem from "./DocsItem";
import { scrapCreate, scrapDelete } from "@/services/scrap";
import useDocsMutation from "@/hooks/useDocsMutation";
import { Container } from "@/styles/DocsList";
import { useBottomDisplay } from "@/hooks/useBottomDisplay";
import BottomSheet from "@/components/common/layout/BottomSheet";

const DocsList = ({ data }) => {
  const navigate = useNavigate();
  const docsData = data?.pages.flatMap((x) => x.data.response.docsList);
  const { memberId } = useSelector((state) => state.user);
  const [scrapList, setScrapList] = useState([]);
  const { display, handleOnDisplay } = useBottomDisplay(true);

  const { mutate: createScrap } = useDocsMutation(scrapCreate);
  const { mutate: deleteScrap } = useDocsMutation(scrapDelete);

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
      createScrap({ memberId, docsId: el.docsId });
    } else {
      setScrapList(scrapList.filter((x) => x !== isSelected));
      deleteScrap({ memberId, docsId: el.docsId });
    }
  };

  const handleOnClick = (el) => {
    navigate(`/document/${el}`);
  };

  return (
    <Container display={display}>
      <BottomSheet onClick={handleOnDisplay} />

      {docsData && docsData.length > 0 ? (
        docsData.map((el) => (
          <DocsItem
            key={el.docsId}
            name={el.docsName}
            category={el.docsCategory}
            onClick={() => handleOnClick(el.docsId)}
            isScraped={el.scrap}
            onScrapClick={(scrap) => handleOnScrap(el, scrap)}
          />
        ))
      ) : (
        <DocsItem>현재 영역과 일치하는 문서가 없습니다.</DocsItem>
      )}
    </Container>
  );
};

export default DocsList;
