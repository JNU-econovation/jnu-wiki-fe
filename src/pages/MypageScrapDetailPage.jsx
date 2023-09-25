import Map from "../components/common/layout/Map";
import MainLayout from "../components/common/layout/MainLayout";
import { useLocation } from "react-router-dom";
import MypageScrapDetail from "../components/common/mypage/MypageScrapDetail";

const MypageScrapDetailPage = () => {
  const location = useLocation();
  const receivedData = location.state;

  return (
    <>
      <MainLayout myActive={true}>
        <MypageScrapDetail id={receivedData?.docsId} />
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

export default MypageScrapDetailPage;
