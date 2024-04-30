import { useState } from "react";
import { useSelector } from "react-redux";

import useDocsMutation from "./useDocsMutation";
import { scrapCreate, scrapDelete } from "@/services/scrap";

const useScrap = (isScraped, docsId) => {
  const [scraped, setScrap] = useState(isScraped);
  const { mutate: scrapDetailCreate } = useDocsMutation(scrapCreate);
  const { mutate: scrapDetailDelete } = useDocsMutation(scrapDelete);
  const { memberId } = useSelector((state) => state.user);

  const handleOnScrapFill = () => {
    setScrap((prev) => !prev);

    if (scraped) return scrapDetailDelete({ memberId, docsId });
    return scrapDetailCreate({ memberId, docsId });
  };

  return { handleOnScrapFill };
};

export default useScrap;
