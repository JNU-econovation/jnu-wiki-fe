import Map from "@/components/map/Map";
import ScrapList from "./ScrapList";
import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mypagescrap } from "@/services/mypage";
import Loader from "@/components/common/layout/Loader";
import { Suspense } from "react";
import { useState } from "react";
import MainLayout from "../common/layout/MainLayout";
import DocumentWrapper from "@/components/docsList/DocumentWrapper";

const MypageScrap = () => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const bottomObserver = useRef(null);

  const { data, isLoading, error, fetchNextPage, hasNextPage } =
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

  return (
    <>
      <MainLayout myPageClicked={true} onClick={handleShow} />
      {show && (
        <DocumentWrapper>
          <Suspense fallback={<Loader />}>
            <ScrapList datas={data} />
            <div style={{ height: "50px" }} ref={bottomObserver}></div>
          </Suspense>
        </DocumentWrapper>
      )}
      <Map />
    </>
  );
};
export default MypageScrap;
