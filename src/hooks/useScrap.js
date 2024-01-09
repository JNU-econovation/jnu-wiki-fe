import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useDocsMutation from "./useDocsMutation";
import { scrapCreate, scrapDelete } from "@/services/scrap";

const useScrap = (isScraped, id) => {
  const [scraped, setScrap] = useState(isScraped);
  const { mutate: scrapDetailCreate } = useDocsMutation(scrapCreate);
  const { mutate: scrapDetailDelete } = useDocsMutation(scrapDelete);
  const { memberId } = useSelector((state) => state.user);

  useEffect(() => {
    setScrap(isScraped);
  }, [isScraped]);

  const handleOnScrapFill = () => {
    setScrap((prev) => !prev);
    if (!scraped) {
      scrapDetailCreate({ memberId, docsId: id });
    } else {
      scrapDetailDelete({ memberId, docsId: id });
    }
  };

  return { scraped, handleOnScrapFill };
};

export default useScrap;
