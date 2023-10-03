import MainLayout from "@/components/common/layout/MainLayout.jsx";
import AdminForm from "@/components/common/form/AdminForm.jsx";
import Swal from "sweetalert2";
import routes from "@/routes.js";
import { useSelector } from "react-redux";
const Admin = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <MainLayout>
        {user.role === "ADMIN" ? (
          <AdminForm></AdminForm>
        ) : (
          Swal.fire({
            icon: "error",
            title: "관리자 권한이 없습니다😡",
            text: "정상 경로로 들어와주세요...",
            confirmButtonColor: "#429f50",
          }).then((result) => {
            if (result.isConfirmed) {
              location.href = routes.home;
            }
          })
        )}
      </MainLayout>
    </>
  );
};

export default Admin;
