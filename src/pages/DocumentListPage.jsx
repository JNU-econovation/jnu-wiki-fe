import { useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MainLayout from "@/components/common/layout/MainLayout";
import MainMap from "@/components/map/MainMap";
import Loader from "@/components/common/layout/Loader";
import DocumentWrapper from "@/components/docsList/DocumentWrapper";
import { docsList } from "@/services/document";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { delayForDocs } from "@/utils/delayForDocs";

const DocsList = lazy(() =>
  delayForDocs(import("@/components/docsList/DocsList"))
);

const DocumentListPage = () => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const { neLatlng, swLatlng, center, level } =
    useSelector((state) => state.SwNe) || {};
  const { La: rightUpLa, Ma: rightUpMa } = neLatlng || {};
  const { La: leftDownLa, Ma: leftDownMa } = swLatlng || {};
  const { lat, lng } = center || {};

  const { data, isLoading, isError, bottomObserver } = useInfiniteScroll(
    "docs_list",
    docsList,
    { rightUpLa, rightUpMa, leftDownLa, leftDownMa }
  );

  const mapInfo = data?.pages.flatMap((x) => x.data.response.docsList);

  return (
    <>
      <MainLayout onClick={handleShow} />
      {show && (
        <Suspense fallback={<Loading />}>
          <DocumentWrapper>
            <DocsList data={data} />
            <div ref={bottomObserver}></div>
          </DocumentWrapper>
        </Suspense>
      )}

      {(isLoading || isError) && <MainMap />}
      {data && (
        <MainMap mapInfo={mapInfo} centerMap={{ lat, lng }} mapLevel={level} />
      )}
    </>
  );
};

const Loading = styled(Loader)`
  position: absolute;
  left: 15rem;
  top: 6rem;
  padding: 1rem 3rem;
  height: 3rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  border-radius: 0 0 10px 0;
`;

export default DocumentListPage;
