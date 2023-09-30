import DocumentLabel from "./DocumentLabel";
import InfoContent from "./InfoContent";

const InfoGroup = ({ htmlFor, children, label }) => {
  return (
    <>
      <DocumentLabel htmlFor={htmlFor}>{label}</DocumentLabel>
      <InfoContent>{children}</InfoContent>
    </>
  );
};

export default InfoGroup;
