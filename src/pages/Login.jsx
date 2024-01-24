import Sidebar from "@/components/common/layout/Sidebar.jsx";
import Header from "@/components/common/layout/Header.jsx";
import LoginForm from "@/components/common/form/LoginForm.jsx";

const Login = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <Header isDisplay={false}></Header>
      <LoginForm></LoginForm>
    </>
  );
};

export default Login;
