import MainLayout from "@/components/common/layout/MainLayout";
import CreateDocument from "@/components/createDocument/CreateDocument";
import DocumentWrapper from "@/components/docsList/DocumentWrapper";
import MapWithClickEvent from "@/components/Map/MapWithClickEvent";
import { useState } from "react";

const AddPost = () => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <MainLayout onClick={handleShow} />
      {show && (
        <DocumentWrapper>
          <CreateDocument />
        </DocumentWrapper>
      )}
      <MapWithClickEvent />
    </>
  );
};

export default AddPost;
