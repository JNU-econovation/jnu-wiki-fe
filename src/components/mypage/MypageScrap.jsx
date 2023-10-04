import Map from "@/components/common/layout/Map";
import ScrapList from "./ScrapList";
import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mypagescrap } from "@/services/mypage";
import Loader from "@/components/common/layout/Loader";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import MainLayout from "../common/layout/MainLayout";
import DocumentWrapper from "../document/DocumentWrapper";
import DocsList from "../document/DocsList";

const MypageScrap = () => {
  /** 무한스크롤 */
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  const bottomObserver = useRef(null);

  const { La: rightUpLa, Ma: rightUpMa } =
    useSelector((state) => state.SwNe.neLatlng) || {};
  const { La: leftDownLa, Ma: leftDownMa } =
    useSelector((state) => state.SwNe.swLatlng) || {};

  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["mypage_list", rightUpLa, rightUpMa, leftDownLa, leftDownMa],
      ({ pageParam = 0 }) =>
        mypagescrap({
          pageParam,
          rightUpLa,
          rightUpMa,
          leftDownLa,
          leftDownMa,
        }),
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

  const title = data?.pages
    .flatMap((x) => x.data.response.docsList)
    .map((x) => x.docsName);

  const latitude = data?.pages
    .flatMap((x) => x.data.response.docsList)
    .map((x) => x.docsLocation.lat);

  const longitude = data?.pages
    .flatMap((x) => x.data.response.docsList)
    .map((x) => x.docsLocation.lng);

  return (
    <>
      <MainLayout onClick={handleShow} />
      {show && (
        <DocumentWrapper>
          <Suspense fallback={<Loader />}>
            {title?.length && <DocsList data={data} />}
            <div style={{ height: "50px" }} ref={bottomObserver}></div>
          </Suspense>
        </DocumentWrapper>
      )}
      {isLoading || error || !data ? (
        <Map />
      ) : (
        data && <Map title={title} apiLat={latitude} apiLng={longitude} />
      )}
    </>
  );
};
export default MypageScrap;
