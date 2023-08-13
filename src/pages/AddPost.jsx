import MainLayout from "../components/common/layout/MainLayout";
import Map from "../components/common/layout/Map";
import CreateDocument from "../components/common/document/CreateDocument";

const AddPost = () => {
  return (
    <>
      <MainLayout>
        <CreateDocument />
        <Map />
      </MainLayout>
    </>
  );
};

export default AddPost;
