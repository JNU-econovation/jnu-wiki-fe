import MypageForm from "../components/common/form/MypageForm.jsx";
import Swal from "sweetalert2";
import routes from "@/routes.js";
import MainLayout from "@/components/common/layout/MainLayout.jsx";
import { useSelector } from "react-redux";
const MyPage = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <MainLayout myPageClicked={true}>
        {localStorage.getItem("token") && user.isLogin ? (
          <MypageForm></MypageForm>
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

export default MyPage;
