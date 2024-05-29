import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

import DocsItem from "@/components/docsList/DocsItem";
import { HELPER_MSG } from "@/constant/document/helpermsg";
import { Container } from "@/styles/DocsList";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useBottomDisplay } from "@/hooks/useBottomDisplay";
import BottomSheet from "@/components/common/layout/BottomSheet";
import useScrap from "@/hooks/useScrap";

const ScrapList = ({ scrapList }) => {
  const navigate = useNavigate();
  const { $isDisplay, handleOnDisplay } = useBottomDisplay(true);
  const { handleOnScrapFill } = useScrap();

  const { isLogin } = useSelector((state) => state.user);
  const nickName = useUserInfo(isLogin);

  return (
    <Container display={$isDisplay}>
      <BottomSheet onClick={handleOnDisplay} />
      {scrapList?.length ? (
        <>
          <NickNameScrap>{`${nickName}님이 스크랩한 문서예요.`}</NickNameScrap>
          {scrapList.map((el) => (
            <DocsItem
              key={el.docsId}
              name={el.docsName}
              category={el.docsCategory}
              onClick={() => navigate(`/document/${el.docsId}`)}
              isScraped={true}
              onScrapClick={() => handleOnScrapFill(true, el.docsId)}
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
