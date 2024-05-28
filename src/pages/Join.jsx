import RegisterForm from "@/components/common/form/RegisterForm";
import MainLayout from "@/components/common/layout/MainLayout";

const Join = () => {
  return (
    <MainLayout $isDisplay={false}>
      <RegisterForm />
    </MainLayout>
  );
};

export default Join;
