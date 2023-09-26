import MainLayout from "@/components/common/layout/MainLayout";
import Map from "@/components/common/layout/Map";
import CreateDocument from "@/components/document/CreateDocument";
import DocumentWrapper from "@/components/document/DocumentWrapper";
import { useState } from "react";

const AddPost = () => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <MainLayout onClick={handleShow} />
      {show ? (
        <DocumentWrapper>
          <CreateDocument />
        </DocumentWrapper>
      ) : undefined}
      <Map />
    </>
  );
};

export default AddPost;
