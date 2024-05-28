import LoginForm from "@/components/common/form/LoginForm";
import MainLayout from "@/components/common/layout/MainLayout";

const Login = () => {
  return (
    <MainLayout $isDisplay={false}>
      <LoginForm />
    </MainLayout>
  );
};

export default Login;
