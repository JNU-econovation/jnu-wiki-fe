import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";

const useInfiniteScroll = (queryKey, queryFn, ...parameters) => {
  const bottomObserver = useRef(null);
  parameters = parameters[0];

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      [queryKey, parameters],
      ({ pageParam = 0 }) => queryFn({ pageParam, ...parameters }),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return lastPage.currentPage < lastPage.totalPages
            ? nextPage
            : undefined;
        },
        refetchOnWindowFocus: true,
        //TODO: staleTime, cacheTime 설정
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

  return { data, isLoading, isError, bottomObserver };
};

export default useInfiniteScroll;
