import Document from "@/components/document/Document";
import Map from "@/components/common/layout/Map";
import MainLayout from "@/components/common/layout/MainLayout";
import { useParams } from "react-router-dom";
import { detailDocument } from "@/services/document";
import { useQuery } from "@tanstack/react-query";

const DocumentPage = () => {
  const { id } = useParams();
  const { data } = useQuery(["detail_document", id], () => detailDocument(id), {
    select: (data) => data?.data?.response,
  });

  return (
    <>
      <MainLayout viewActive={true}>
        <Document data={data} />
      </MainLayout>
      {data && (
        <Map
          apiLat={data?.docsLocation.lat || data?.docsRequestLocation?.lat}
          apiLng={data?.docsLocation.lng || data?.docsRequestLocation?.lng}
        />
      )}
    </>
  );
};

export default DocumentPage;
