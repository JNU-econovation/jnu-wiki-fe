import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import Document from "@/components/document/Document";
import Map from "@/components/map/Map";
import MainLayout from "@/components/common/layout/MainLayout";
import { detailDocument } from "@/services/document";
import ToggleBtn from "@/components/common/button/ToggleBtn";

const DocumentPage = () => {
  const { id } = useParams();
  const { data } = useQuery(["detail_document", id], () => detailDocument(id), {
    refetchOnWindowFocus: true,
    select: (data) => data?.data?.response,
  });

  const [toggle, setToggle] = useState(true);

  const clickToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <MainLayout isActive={true}>
        {toggle && <Document data={data} />}
        <ToggleBtn toggle={toggle} onClick={clickToggle} />
      </MainLayout>

      {data && (
        <Map apiLat={data?.docsLocation.lat} apiLng={data?.docsLocation.lng} />
      )}
    </>
  );
};

export default DocumentPage;
