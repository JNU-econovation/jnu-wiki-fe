import styled from "styled-components";
import DocumentInputGroup from "./DocumentInputGroup";
import DocumentLabel from "./DocumentLabel";
import SelectMenu from "./SelectMenu";
import Button from "@/components/common/layout/Button";
import { helperMsg } from "@/constant/helpermsg";
import useInput from "@/hooks/useInput";
import useValidation from "@/hooks/useValidation";
import { create } from "@/services/document";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { askAlert, cancelAlert, requestAlert } from "@/utils/alert";

export const Container = styled.div`
  width: 20rem;
  height: 100vh;

  position: fixed;
  left: 15rem;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);

  #docsName,
  #docsLocation,
  #docsCategory {
    width: 20rem;
    height: 2.4rem;
    margin-top: 0.7rem;
  }
`;

export const StyledButton = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 12rem;
`;

const CreateDocument = () => {
  let { latitude, longitude } = useSelector((state) => state.latLng);
  const address = useSelector((state) => state.address.address);
  const category = useSelector((state) => state.category.category);
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();

  const { valueInit, handleOnChange, reset } = useInput({
    docsCategory: "",
    docsName: "",
    docsLocation: "",
  });

  const inputData = {
    docsCategory: category || "카페",
    docsName: valueInit.docsName,
    docsLocation: { lat: latitude, lng: longitude },
  };

  const { msg: nameMsg, handleSetMsg: handleSetNameMsg } = useValidation("");
  const { msg: locationMsg, handleSetMsg: handleSetLocationMsg } =
    useValidation("");

  const { mutate } = useMutation({
    mutationFn: create,
  });

  const handleClear = () => {
    reset();
    dispatch({ type: "clearAddress" });
  };

  const sendRequest = () => {
    mutate(inputData, {
      onSuccess: () => {
        requestAlert();
        handleClear();
      },
      onError: (error) => {
        if (!isLogin) {
          alert("로그인 후 이용 가능합니다.");
        } else {
          alert("문서 생성에 실패했습니다. 관리자에게 문의하세요.");
          console.error(error);
        }
      },
    });
  };

  const handleRegisterAlert = () => {
    if (inputData.docsName !== "" && inputData.docsLocation.lat !== "") {
      askAlert(inputData.docsName, address, inputData.docsCategory).then(
        (result) => {
          if (result.isConfirmed) {
            sendRequest();
          }
        }
      );
    }
  };

  const handleCancel = () => {
    if (!isLogin) handleDisabled();
    if (!inputData.docsName && !inputData.docsLocation) handleDisabled();
    else {
      cancelAlert();
      handleClear();
    }
  };

  const handleSubmit = () => {
    if (!isLogin) handleNullToken();
    else {
      handleSetNameMsg("docsName", valueInit.docsName);
      handleSetLocationMsg("docsLocation", { lat: latitude, lng: longitude });
      handleRegisterAlert();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Container>
        <DocumentInputGroup
          htmlFor="docsName"
          id="docsName"
          placeholder={helperMsg.title}
          value={valueInit.docsName}
          onChange={(e) => {
            handleOnChange(e);
            handleSetNameMsg(e.target.id, e.target.value);
          }}
          helperMsg={nameMsg}
        >
          문서 제목
        </DocumentInputGroup>
        <DocumentInputGroup
          htmlFor="docsLocation"
          id="docsLocation"
          placeholder={helperMsg.location}
          value={address}
          disabled
          onChange={handleOnChange}
          helperMsg={locationMsg}
        >
          위치
        </DocumentInputGroup>
        <DocumentLabel htmlFor="docsCategory">카테고리</DocumentLabel>
        <SelectMenu
          id="docsCategory"
          value={inputData.docsCategory}
          onChange={handleOnChange}
        />
        <StyledButton>
          <Button
            color="primary"
            border="1px solid"
            border-color="primary"
            backgroundcolor="white"
            onClick={handleCancel}
          >
            등록 취소
          </Button>
          <Button
            type="submit"
            color="white"
            backgroundcolor="primary"
            onClick={handleSubmit}
          >
            등록 요청
          </Button>
        </StyledButton>
      </Container>
    </>
  );
};

export default CreateDocument;
