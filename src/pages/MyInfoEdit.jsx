import MyInfoEditForm from "@/components/common/form/MyInfoEditForm.jsx";
import MainLayout from "@/components/common/layout/MainLayout.jsx";

const MyInfoEdit = () => {
  return (
    <MainLayout myPageClicked={true} $isDisplay={false}>
      <MyInfoEditForm />
    </MainLayout>
  );
};

export default MyInfoEdit;
