import { useQuery } from "@tanstack/react-query";
import DocsItem from "./DocsItem";
import Loader from "../layout/Loader";
import { Container } from "../document/CreateDocument";
import { docsList } from "../../../services/document";

const DocsList = () => {
  const { data, isLoading, isError } = useQuery(["docs_list"], docsList, {
    onSuccess: (data) => {
      console.log(data);
    },
    staleTime: 10000,
  });
  const docsData = data?.data;
  const docsListArray = docsData || [];
  return (
    <>
      <Container>
        {isLoading && <Loader />}
        {isError && <div>error</div>}
        {docsListArray.map((el) => (
          <DocsItem key={el.id} name={el.docsName} category={el.docsCategory} />
        ))}
      </Container>
    </>
  );
};

export default DocsList;
