import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

import DocsItem from "@/components/docsList/DocsItem";
import { scrapCreate, scrapDelete } from "@/services/scrap";
import useDocsMutation from "@/hooks/useDocsMutation";
import { HELPER_MSG } from "@/constant/document/helpermsg";
import { Container } from "@/styles/DocsList";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useBottomDisplay } from "@/hooks/useBottomDisplay";
import BottomSheet from "@/components/common/layout/BottomSheet";

const ScrapList = ({ datas }) => {
  const navigate = useNavigate();

  const docsData = datas?.pages.flatMap((x) => x.data.response.scrapList) || [];
  const [scrapList, setScrapList] = useState([]);
  const { memberId, isLogin } = useSelector((state) => state.user);
  const nickName = useUserInfo(isLogin);

  const { isDisplay, handleOnDisplay } = useBottomDisplay(true);

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
  return (
    <Container display={isDisplay}>
      <BottomSheet onClick={handleOnDisplay} />
      {docsData.length ? (
        <>
          <NickNameScrap>{`${nickName}님이 스크랩한 문서이에요.`}</NickNameScrap>
          {docsData.map((el) => (
            <DocsItem
              key={el.docsId}
              name={el.docsName}
              category={el.docsCategory}
              onClick={() => navigate(`/document/${el.docsId}`)}
              isScraped={true}
              onScrapClick={(scrap) => handleOnScrap(el, scrap)}
            />
          ))}
        </>
      ) : (
        <DocsItem>{HELPER_MSG.NO_SCRAP}</DocsItem>
      )}
    </Container>
  );
};

const NickNameScrap = styled.div`
  margin-bottom: 2rem;
`;

export default ScrapList;
