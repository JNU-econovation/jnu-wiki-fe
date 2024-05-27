import { toast } from "react-toastify";

export const nullTokenWrite = () => {
  return toast.warning("로그인 후 생성이 가능해요.", {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const nullTokenEdit = () => {
  return toast.warning("로그인 후 편집이 가능해요.", {
    position: toast.POSITION.TOP_CENTER,
    zIndex: 99999,
  });
};

export const occurError = () => {
  return toast.error("문서 생성에 실패했습니다. 관리자에게 문의하세요.", {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const successEdit = () => {
  return toast.success("내용이 수정되었어요!", {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const adminApproval = () => {
  return toast.info("관리자 승인 후 갱신됩니다.", {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const doubleCheck = (content) => {
  return toast.info(content, {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const doubleCheckError = (content) => {
  return toast.warning(content, {
    position: toast.POSITION.TOP_CENTER,
  });
};
