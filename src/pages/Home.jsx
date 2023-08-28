import MainLayout from "../components/common/layout/MainLayout";
import Map from "../components/common/layout/Map";
import { useQuery } from "@tanstack/react-query";
import { mapDocument } from "../services/document";

const Home = () => {
  const { data, isLoading, isError } = useQuery(["valid_pin"], mapDocument);

  const title = data?.data?.response.map((x) => x.docsName);
  const latitude = data?.data?.response.map((x) => x.docsLocation.lat);
  const longitude = data?.data?.response.map((x) => x.docsLocation.lng);

  return (
    <>
      <MainLayout>
        {data && !isLoading && !isError ? (
          <Map title={title} apiLat={latitude} apiLng={longitude} />
        ) : (
          <Map />
        )}
      </MainLayout>
    </>
  );
};

export default Home;
