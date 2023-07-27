import Document from "../components/common/document/Document";
import Map from "../components/common/layout/Map";

const DocumentPage = ({ docs }) => {
  const { id, docsLocation } = docs;
  return (
    <>
      <Document id={id} />
      <Map apiLat={docsLocation.lat} apiLng={docsLocation.lng} />
    </>
  );
};

export default DocumentPage;
