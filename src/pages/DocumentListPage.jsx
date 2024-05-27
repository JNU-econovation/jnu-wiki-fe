import { useState, Suspense } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MainLayout from "@/components/common/layout/MainLayout";
import MainMap from "@/components/map/MainMap";
import Loader from "@/components/common/layout/Loader";
import { docsList } from "@/services/document";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import DocsList from "@/components/docsList/DocsList";
import ToggleBtn from "@/components/common/button/ToggleBtn";
import AddPostBtn from "@/components/common/button/AddPostBtn";

const DocumentListPage = () => {
  const [toggle, setToggle] = useState(true);

  const clickToggle = () => {
    setToggle((prev) => !prev);
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

  const docsData = data?.pages.flatMap((x) => x?.data?.response.docsList ?? []);

  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>
        {toggle && <DocsList docsData={docsData} />}
        {(docsData?.length > 4 || !toggle) && (
          <ToggleBtn toggle={toggle} onClick={clickToggle} isList={true} />
        )}
        <div ref={bottomObserver}></div>
      </Suspense>
      <AddPostBtn />
      {(isLoading || isError || !data) && <MainMap />}
      {data && (
        <MainMap mapInfo={docsData} centerMap={{ lat, lng }} mapLevel={level} />
      )}
    </MainLayout>
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

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export default DocumentListPage;
