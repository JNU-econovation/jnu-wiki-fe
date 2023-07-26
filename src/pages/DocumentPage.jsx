import Document from "../components/common/document/Document";
import Map from "../components/common/layout/Map";

const DocumentPage = ({ id, apiLat, apiLng }) => {
  return (
    <>
      <Document id={id} />
      <Map apiLat={apiLat} apiLng={apiLng} />
    </>
  );
};

export default DocumentPage;
