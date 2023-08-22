import MainLayout from "../components/common/layout/MainLayout";
import Map from "../components/common/layout/Map";
import { useQuery } from "@tanstack/react-query";
import { mapDocument } from "../services/document";

const Home = () => {
  const { data, isLoading, isError } = useQuery(["valid_pin"], mapDocument);

  const latitude = data?.data?.response.map((x) => x.docsLocation.lat);
  const longitude = data?.data?.response.map((x) => x.docsLocation.lng);

  return (
    <>
      <MainLayout>
        {!isLoading && !isError && <Map apiLat={latitude} apiLng={longitude} />}
      </MainLayout>
    </>
  );
};

export default Home;
