import MainMap from "@/components/map/MainMap";
import ScrapList from "./ScrapList";
import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mypagescrap } from "@/services/mypage";
import Loader from "@/components/common/layout/Loader";
import { Suspense } from "react";
import DocumentWrapper from "@/components/docsList/DocumentWrapper";
import { useSelector } from "react-redux";

const MypageScrap = () => {
  const bottomObserver = useRef(null);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["mypage_list"],
      ({ pageParam = 0 }) => mypagescrap(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return lastPage.currentPage < lastPage.totalPages
            ? nextPage
            : undefined;
        },
      }
    );
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (bottomObserver.current) {
      io.observe(bottomObserver.current);
    }

    return () => {
      if (bottomObserver.current) {
        io.unobserve(bottomObserver.current);
      }
    };
  }, [isLoading, hasNextPage, fetchNextPage]);

  const { center, level } = useSelector((state) => state.SwNe) || {};
  const { lat, lng } = center || {};

  const mapInfo = data?.pages.flatMap((x) => x.data.response.scrapList);

  return (
    <>
      <DocumentWrapper>
        <Suspense fallback={<Loader />}>
          <ScrapList datas={data} />
          <div style={{ height: "50px" }} ref={bottomObserver}></div>
        </Suspense>
      </DocumentWrapper>
      {(isLoading || isError) && <MainMap />}
      {data && (
        <MainMap mapInfo={mapInfo} centerMap={{ lat, lng }} mapLevel={level} />
      )}
    </>
  );
};
export default MypageScrap;
