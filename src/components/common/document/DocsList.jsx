import { useState } from "react";
import DocsItem from "./DocsItem";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";
import styled from "styled-components";

const Container = styled.div`
  overflow: hidden;
  position: absolute;
  left: 20rem;
  overflow-x: hidden;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
`;

const DocsList = ({ data }) => {
  const navigate = useNavigate();

  const docsData = data?.pages.flatMap((x) => x.data.response);
  const docsListArray = docsData || [];
  const [selectedDocs, setSelectedDocs] = useState([]);

  const handleOnClick = (el) => {
    setSelectedDocs((prev) => [
      ...prev,
      {
        id: el.docsId,
        docsLocation: {
          lat: el.docsLocation.lat,
          lng: el.docsLocation.lng,
        },
      },
    ]);
    selectedDocs.length > 0 &&
      navigate(routes.documentPage, { state: selectedDocs[0] });
  };

  if (data && data.pages && Array.isArray(data.pages)) {
    return (
      <>
        <Container>
          {docsListArray.map((el) => (
            <DocsItem
              key={el.docsId}
              name={el.docsName}
              category={el.docsCategory}
              onClick={() => handleOnClick(el)}
            />
          ))}
        </Container>
      </>
    );
  } else {
    return null;
  }
};
export default DocsList;
