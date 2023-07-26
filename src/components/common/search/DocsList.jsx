import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DocsItem from "./DocsItem";
import DocumentPage from "../../../pages/DocumentPage";
import Loader from "../layout/Loader";
import { Container } from "../document/CreateDocument";
import { docsList } from "../../../services/document";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";

const DocsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(["docs_list"], docsList, {
    onSuccess: (data) => {
      console.log(data);
    },
    staleTime: 10000,
  });
  const docsData = data?.data;
  const docsListArray = docsData || [];

  const [selectedDocs, setSelectedDocs] = useState([]);

  const handleOnClick = (el) => {
    setSelectedDocs((prev) => [
      ...prev,
      {
        id: el.id,
        docsLocation: {
          lat: el.docsLocation.lat,
          lng: el.docsLocation.lng,
        },
      },
    ]);
    selectedDocs.length > 0 && navigate(routes.documentPage);
  };

  console.log(selectedDocs);

  return (
    <>
      <Container>
        {isLoading && <Loader />}
        {isError && <div>error</div>}
        {docsListArray.map((el) => (
          // <List key={el.id} to={`docs/${el.id}`}>
          <DocsItem
            key={el.id}
            name={el.docsName}
            category={el.docsCategory}
            onClick={() => handleOnClick(el)}
          />
          // </List>
        ))}
        {selectedDocs.length > 0 && (
          <DocumentPage
            id={selectedDocs[0].id}
            apiLat={selectedDocs[0].docsLocation.lat}
            apiLng={selectedDocs[0].docsLocation.lng}
          />
        )}
      </Container>
    </>
  );
};

export default DocsList;
