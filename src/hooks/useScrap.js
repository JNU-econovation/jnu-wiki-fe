import { useSelector } from "react-redux";

import useDocsMutation from "./useDocsMutation";
import { scrapCreate, scrapDelete } from "@/services/scrap";

const useScrap = () => {
  const { mutate: scrapDetailCreate } = useDocsMutation(scrapCreate);
  const { mutate: scrapDetailDelete } = useDocsMutation(scrapDelete);
  const { memberId } = useSelector((state) => state.user);

  const handleOnScrapFill = (isScraped, docsId) => {
    if (isScraped) return scrapDetailDelete({ memberId, docsId });
    return scrapDetailCreate({ memberId, docsId });
  };

  return { handleOnScrapFill };
};

export default useScrap;
