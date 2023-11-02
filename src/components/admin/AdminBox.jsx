import styled from "styled-components";
import RequestContainerBox from "./RequestContainerBox";
import { basicInfoEditRequest, newInfoCreateRequest } from "@/services/user";
import routes from "@/routes";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";

const AdminBox = () => {
  const bottomObserver1 = useRef(null);
  const bottomObserver2 = useRef(null);

  const {
    data: data1,
    isLoading: isLoading1,
    fetchNextPage: fetchNextPage1,
    hasNextPage: hasNextPage1,
    error: error1,
    isError: isError1,
    isFetching: isFetching1,
  } = useInfiniteQuery(
    ["basicInfo"],

    ({ pageParam = 0 }) => basicInfoEditRequest(pageParam),

    {
      getNextPageParam: (currentPage, allPages) => {
        const nextPage = allPages.length;
        const totalPage = currentPage?.data?.response?.totalPages;
        return nextPage > totalPage || nextPage == totalPage ? null : nextPage;
      },

      retry: 0,
    }
  );

  const {
    data: data2,
    isLoading: isLoading2,
    fetchNextPage: fetchNextPage2,
    isFetchingNextPage: isFetchingNextPage2,
    hasNextPage: hasNextPage2,
    error: error2,
    isError: isError2,
    isFetching: isFetching2,
  } = useInfiniteQuery(
    ["newInfo"],

    ({ pageParam = 0 }) => newInfoCreateRequest(pageParam),

    {
      getNextPageParam: (currentPage, allPages) => {
        const nextPage = allPages.length;
        const totalPage = currentPage?.data?.response?.totalPages;
        return nextPage > totalPage || nextPage == totalPage ? null : nextPage;
      },

      retry: 0,
    }
  );

  useEffect(() => {
    const io1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading1 && hasNextPage1) {
            fetchNextPage1();
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    if (bottomObserver1.current) {
      io1.observe(bottomObserver1.current);
    }

    return () => {
      if (bottomObserver1.current) {
        io1.unobserve(bottomObserver1.current);
      }
    };
  }, [isLoading1, hasNextPage1, fetchNextPage1]);

  useEffect(() => {
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !isLoading2 &&
            hasNextPage2 &&
            !isFetchingNextPage2
          ) {
            fetchNextPage2();
          }
        });
      },
      { threshold: 0.7 }
    );

    if (bottomObserver2.current) {
      io2.observe(bottomObserver2.current);
    }

    return () => {
      if (bottomObserver2.current) {
        io2.unobserve(bottomObserver2.current);
      }
    };
  }, [isLoading2, hasNextPage2, fetchNextPage2]);

  const Data1 = data1?.pages.flatMap((x) => x.data.response);
  const Data2 = data2?.pages.flatMap((x) => x.data.response);
  const DataArr2 = Data2 || [];
  const DataArr1 = Data1 || [];
  return (
    <AdminBoxCss>
      <RequestContainerBox
        border=" 2px solid #F5F6FA;"
        title="정보 수정 요청"
        data={DataArr1}
        route={routes.basicInfoEditRequest}
        modi={true}
        isLoading={isLoading1}
        error={error1}
        ref={bottomObserver1}
        isError={isError1}
        isFetching={isFetching1}
      ></RequestContainerBox>
      <RequestContainerBox
        title="새 장소 신청 요청"
        data={DataArr2}
        route={routes.newDocsRequest}
        modi={false}
        isLoading={isLoading2}
        error={error2}
        ref={bottomObserver2}
        isError={isError2}
        isFetching={isFetching2}
      ></RequestContainerBox>
    </AdminBoxCss>
  );
};

const AdminBoxCss = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  /* grid-gap: 2rem; */
  margin: 1rem 0;
  width: 100%;
  max-width: inherit;

  height: "270px";
`;

export default AdminBox;
