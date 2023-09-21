import MainLayout from "../components/common/layout/MainLayout";
import MypageScrap from "../components/common/mypage/MypageScrap.jsx";

const Scrap = () => {
  return (
    <>
      <MainLayout myActive={true}>
        <MypageScrap />
      </MainLayout>
    </>
  );
};

export default Scrap;
