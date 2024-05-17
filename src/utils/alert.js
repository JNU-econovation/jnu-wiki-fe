import Swal from "sweetalert2";
import routes from "@/routes";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: true,
});

export const askAlert = (name, address, category) => {
  return swalWithBootstrapButtons.fire({
    title: "문서를 등록하시겠습니까?",
    html: `문서제목: ${name}<br/>
      위치: ${address}<br/>
      카테고리: ${category}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "등록 요청",
    cancelButtonText: "취소",
    reverseButtons: true,
  });
};

export const cancelAlert = () => {
  return swalWithBootstrapButtons.fire(
    "취소 완료",
    "문서 등록 요청을 취소합니다.",
    "error"
  );
};

export const requestAlert = () => {
  return swalWithBootstrapButtons.fire(
    "문서 등록 요청 완료!",
    "관리자의 승인 후 등록이 완료됩니다.",
    "success"
  );
};

export const popUpLogout = () => {
  return Swal.fire({
    icon: "question",
    text: "로그아웃 하시겠습니까?",
    showCancelButton: true,
    confirmButtonText: "예",
    cancelButtonText: "아니오",
    confirmButtonColor: "#429f50",
    cancelButtonColor: "#d33",
  });
};

export const loginFailAlert = (text) => {
  return Swal.fire({
    icon: "warning",
    text: `${text}`,
    confirmButtonColor: "#2d790d",
  });
};

export const joinSuccessAlert = () => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: "회원가입 성공!",
    text: "로그인 페이지로 이동합니다.",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    location.href = routes.login;
  });
};

export const joinFailAlert = () => {
  return Swal.fire({
    icon: "error",
    title: "회원가입 실패",
  });
};

export const changeSuccessAlert = () => {
  return Swal.fire({
    icon: "success",
    text: "수정 완료🥰",
    confirmButtonColor: "#429f50",
  });
  // }).then((result) => {
  //   if (result.isConfirmed) {

  //   }
  // });
};

export const changeFailAlert = () => {
  return Swal.fire({
    icon: "warning",
    text: "수정실패....",
    confirmButtonColor: "#429f50",
  });
};

export const failLoginAlert = () => {
  return Swal.fire({
    icon: "warning",
    text: "이메일 또는 비밀번호를 확인해주세요.",
    confirmButtonColor: "#429f50",
  });
};
