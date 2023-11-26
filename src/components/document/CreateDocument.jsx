import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import DocumentInputGroup from "./DocumentInputGroup";
import DocumentLabel from "./DocumentLabel";
import SelectMenu from "./SelectMenu";
import Button from "@/components/common/layout/Button";
import { DOCS_INFO, ERROR_MSG } from "@/constant/document/create";
import { HELPER_MSG } from "@/constant/document/helpermsg";
import { create } from "@/services/document";
import { askAlert, cancelAlert, requestAlert } from "@/utils/alert";
import { nullTokenWrite, occurError } from "@/utils/toast";

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
          nullTokenWrite();
        } else {
          occurError();
          console.error(error);
        }
      },
    });
  };

  const handleRegisterAlert = () => {
    if (inputData.docsName && inputData.docsLocation.lat) {
      askAlert(inputData.docsName, address, inputData.docsCategory).then(
        (result) => {
          if (result.isConfirmed) {
            sendRequest();
          }
        }
      );
    }
  };

  const handleCancel = (e) => {
    if (inputData.docsName === "" || inputData.docsLocation === "") {
      e.preventDefault();
    } else {
      cancelAlert();
      handleClear();
    }
  };

  const handleSubmit = () => {
    if (!isLogin) nullTokenWrite();
    else {
      handleSetNameMsg("docsName", valueInit.docsName);
      handleSetLocationMsg("docsLocation", { lat: latitude, lng: longitude });
      handleRegisterAlert();
    }
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <DocumentInputGroup
          htmlFor="docsName"
          id="docsName"
          placeholder={HELPER_MSG.NAME}
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
          placeholder={HELPER_MSG.LOCATION}
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
