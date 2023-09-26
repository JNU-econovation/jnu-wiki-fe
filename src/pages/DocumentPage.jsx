import Document from "@/components/document/Document";
import Map from "@/components/common/layout/Map";
import MainLayout from "@/components/common/layout/MainLayout";
import { useLocation } from "react-router-dom";

const DocumentPage = () => {
  const location = useLocation();
  const receivedData = location.state;

  return (
    <>
      <MainLayout viewActive={true}>
        <Document id={receivedData?.docsId} />
      </MainLayout>
      <Map
        apiLat={
          receivedData?.docsLocation?.lat ||
          receivedData?.docsRequestLocation?.lat
        }
        apiLng={
          receivedData?.docsLocation?.lng ||
          receivedData?.docsRequestLocation?.lng
        }
      />
    </>
  );
};

export default DocumentPage;
