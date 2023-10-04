import MyInfoEditForm from "@/components/common/form/MyInfoEditForm.jsx";
import MainLayout from "@/components/common/layout/MainLayout.jsx";

const MyInfoEdit = () => {
  return (
    <div>
      <MainLayout myActive={true}>
        <MyInfoEditForm />
      </MainLayout>
    </div>
  );
};

export default MyInfoEdit;
