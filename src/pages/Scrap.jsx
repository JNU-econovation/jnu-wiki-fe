import Swal from "sweetalert2";
import routes from "../routes.js";
import MainLayout from "../components/common/layout/MainLayout";
import MypageScrap from "../components/common/mypage/MypageScrap.jsx";
import { useState } from "react";
const Scrap = () => {
  return (
    <>
      <MainLayout myActive={true}>
        <MypageScrap />
      </MainLayout>
    </>
  );
};

export default Scrap;
