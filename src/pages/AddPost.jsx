import MainLayout from "@/components/common/layout/MainLayout";
import Map from "@/components/map/Map";
import CreateDocument from "@/components/createDocument/CreateDocument";
import DocumentWrapper from "@/components/docsList/DocumentWrapper";
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
      <Map />
    </>
  );
};

export default AddPost;
