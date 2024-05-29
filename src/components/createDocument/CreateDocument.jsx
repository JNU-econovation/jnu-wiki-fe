import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import DocumentInputGroup from "./DocumentInputGroup";
import DocumentLabel from "@/components/document/DocumentLabel";
import SelectInput from "@/components/common/input/SelectInput";
import Button from "@/components/common/button/Button";
import BottomSheet from "@/components/common/layout/BottomSheet";
import { DOCS_INFO, ERROR_MSG, CATEGORY } from "@/constant/document/create";
import { HELPER_MSG } from "@/constant/document/helpermsg";
import { create } from "@/services/document";
import { askAlert, requestAlert } from "@/utils/alert";
import { nullTokenWrite, occurError } from "@/utils/toast";
import useHandleAddress from "@/hooks/useHandleAddress";
import { useBottomDisplay } from "@/hooks/useBottomDisplay";

const CreateDocument = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.address);
  const { isLogin } = useSelector((state) => state.user);

  const { $isDisplay, handleOnDisplay } = useBottomDisplay(true);

  const methods = useForm();
  const { reset, getValues, handleSubmit } = methods;
  const { isExistAddress, requestLocation } = useHandleAddress(
    methods,
    address
  );

  const { mutate: createDocument } = useMutation({
    mutationFn: create,
  });

  const handleClear = () => {
    reset();
    dispatch({ type: "clearAddress" });
  };

  const sendRequest = () => {
    createDocument(getValues(), {
      onSuccess: () => {
        requestAlert();
        handleClear();
      },
      onError: () => occurError(),
    });
  };

  const handleRegisterAlert = () => {
    askAlert(getValues("docsName"), address, getValues("docsCategory")).then(
      (result) => {
        if (result.isConfirmed) {
          sendRequest();
        }
      }
    );
  };

  const onSubmit = () => {
    if (!isLogin) return nullTokenWrite();
    isExistAddress();
    requestLocation();
    return handleRegisterAlert();
  };

  return (
    <FormProvider {...methods}>
      <Container onSubmit={handleSubmit(onSubmit)} display={$isDisplay}>
        <BottomSheet onClick={handleOnDisplay} />
        {/* TODO: 이전버튼 만들기 */}
        <Title>새 문서 작성</Title>
        <DocsInput
          name={DOCS_INFO.NAME}
          placeholder={HELPER_MSG.NAME}
          requiredMsg={ERROR_MSG.NAME}
          isLogin={isLogin}
          autoFocus
        >
          문서 제목
        </DocsInput>

        <DocsInput
          name={DOCS_INFO.LOCATION}
          placeholder={HELPER_MSG.LOCATION}
          value={address}
          disabled
        >
          위치
        </DocsInput>

        <DocumentLabel htmlFor={DOCS_INFO.CATEGORY}>카테고리</DocumentLabel>
        <SelectInput
          id={DOCS_INFO.CATEGORY}
          name={DOCS_INFO.CATEGORY}
          list={CATEGORY}
        />

        <StyledButton>
          <Button
            color="primary"
            border="1px solid"
            border-color="primary"
            $backgroundColor="white"
            type="reset"
            onClick={handleClear}
          >
            취소
          </Button>
          <Button type="submit" color="white" $backgroundColor="primary">
            등록
          </Button>
        </StyledButton>
      </Container>
    </FormProvider>
  );
};

export const Container = styled.form`
  width: 21rem;
  height: calc(100vh - 5.5rem);

  position: fixed;
  top: 5.5rem;
  padding: 3rem;
  padding-top: 3rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);

  #docsName,
  #docsLocation,
  #docsCategory {
    width: 100%;
    height: 2.5rem;
    margin-top: 0.8rem;
  }

  @media screen and (max-width: 1023px) {
    height: calc(100vh - 5.7rem);
    left: auto;
    top: 5.7rem;
    padding-top: 2rem;
  }

  @media screen and (max-width: 767px) {
    top: auto;
    bottom: 0;

    box-sizing: border-box;
    width: 100%;
    height: 35%;

    overflow-y: auto;
    max-height: auto;
    height: ${(props) => (props.display ? "300px" : "20px")};
    transition: height 0.2s ease-in-out;
  }
`;

export const StyledButton = styled.section`
  position: absolute;
  right: 1.5rem;
  bottom: 8rem;

  @media screen and (max-width: 767px) {
    bottom: auto;
    right: auto;

    margin-top: 3rem;
    position: static;

    display: flex;
    justify-content: center;
    gap: 1rem;

    > * {
      width: 10rem;
    }
  }
`;

const DocsInput = styled(DocumentInputGroup)`
  height: 6rem;
  margin-bottom: 2rem;
`;

const Title = styled.p`
  font-size: 1.5rem;
  color: #525252;
  margin-bottom: 3rem;
`;

export default CreateDocument;
