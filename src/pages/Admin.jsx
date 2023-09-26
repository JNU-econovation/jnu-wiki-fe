import MainLayout from "@/components/common/layout/MainLayout.jsx";
import AdminForm from "@/components/common/form/AdminForm.jsx";
import Swal from "sweetalert2";
import routes from "@/routes.js";
// window.localStorage.removeItem('role');
//근데 이렇게 하면 로컬에 role =admin만 수정하면 관리자 페이지 입장 가능하지 않나?
// window.localStorage.setItem('role', 'admin');
const Admin = () => {
  return (
    <>
      <MainLayout>
        {window.localStorage.getItem("role") === "ADMIN" ? (
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
