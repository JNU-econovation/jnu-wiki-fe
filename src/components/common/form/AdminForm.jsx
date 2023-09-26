import Title from "@/components/register/Title";
import Contain from "@/components/admin/Contain";
import AdminBox from "@/components/admin/AdminBox";

const AdminForm = () => {
  return (
    <>
      <Contain>
        <Title fontSize="33px" margin="0 0 2rem 1rem">
          관리자 페이지
        </Title>
        <AdminBox />
      </Contain>
    </>
  );
};

export default AdminForm;
