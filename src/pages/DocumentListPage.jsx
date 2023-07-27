import MainLayout from "../components/common/layout/MainLayout";
import DocsList from "../components/common/search/DocsList";
import Map from "../components/common/layout/Map";

const DocumentListPage = () => {
  return (
    <MainLayout>
      <DocsList />
      <Map />
    </MainLayout>
  );
};

export default DocumentListPage;
