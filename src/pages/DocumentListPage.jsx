import MainLayout from "../components/common/layout/MainLayout";
import DocsList from "../components/common/document/DocsList";
import Map from "../components/common/layout/Map";
import DocumentWrapper from "../components/common/document/DocumentWrapper";
import { useState } from "react";

const DocumentListPage = () => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <MainLayout onClick={handleShow} />
      {show ? (
        <DocumentWrapper>
          <DocsList />
        </DocumentWrapper>
      ) : undefined}
      <Map />
    </>
  );
};

export default DocumentListPage;
