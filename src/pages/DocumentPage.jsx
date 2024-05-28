import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import Document from "@/components/document/Document";
import MainLayout from "@/components/common/layout/MainLayout";
import { detailDocument } from "@/services/document";
import ToggleBtn from "@/components/common/button/ToggleBtn";
import MapWithClickEvent from "@/components/map/MapWithClickEvent";
import { useSelector } from "react-redux";

const DocumentPage = () => {
  const { id } = useParams();
  const { data } = useQuery(["detail_document", id], () => detailDocument(id), {
    staleTime: 10000,
    cacheTime: 5 * 60000,
    select: (data) => data?.data?.response,
  });

  const [toggle, setToggle] = useState(true);
  const { isEdit } = useSelector((state) => state.edit);

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
        <MapWithClickEvent location={data?.docsLocation} isEdit={isEdit} />
      )}
    </>
  );
};

export default DocumentPage;
