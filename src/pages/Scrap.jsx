import MainLayout from "@/components/common/layout/MainLayout";
import MypageScrap from "@/components/mypage/MypageScrap";
import routes from "@/routes.js";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const Scrap = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <MainLayout myPageClicked={true}>
        {user.isLogin ? (
          <MypageScrap />
        ) : (
          Swal.fire({
            icon: "info",
            title: "로그인 후 이용 가능합니다.",
            text: "로그인 하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "예", // confirm 버튼 텍스트 지정
            cancelButtonText: "아니오",
            confirmButtonColor: "#429f50",
            cancelButtonColor: "#d33",
          }).then((result) => {
            if (result.isConfirmed) {
              location.href = routes.login;
            } else if (result.isDismissed) {
              location.href = routes.home;
            }
          })
        )}
      </MainLayout>
    </>
  );
};

export default Scrap;
