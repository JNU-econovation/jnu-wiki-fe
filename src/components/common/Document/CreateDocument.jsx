import styled from "styled-components";
import DocumentInputGroup from "./DocumentInputGroup";
import DocumentLabel from "./DocumentLabel";
import SelectMenu from "./SelectMenu";
import Button from "../layout/Button";
import { helperMsg } from "../../../utils/helpermsg";
import useInput from "../../../hooks/useInput";
import useValidation from "../../../hooks/useValidation";
import { create } from "../../../services/document";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export const Container = styled.div`
  width: 22rem;
  height: 100vh;

  position: fixed;
  left: 20rem;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
`;

export const StyledButton = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 12rem;
`;

const CreateDocument = () => {
  const { latitude, longitude } = useSelector((state) => state.latLng);
  const address = useSelector((state) => state.address.address);
  const category = useSelector((state) => state.category.category);

  const inputName = useRef(null);
  const inputLocation = useRef(null);

  const { valueInit, handleOnChange } = useInput({
    docsName: "",
    docsCategory: category,
    docsLocation: { lat: latitude, lng: longitude },
    docsContent: null,
    docsCreateBy: "cookie",
  });

  const data = {
    docsName: valueInit.docsName,
    docsCategory: category || "카페",
    docsLocation: { lat: latitude, lng: longitude },
    docsContent: null,
    docsCreatedBy: "cookie",
  };

  let { msg: nameMsg, handleSetMsg: handleSetNameMsg } = useValidation("");
  let { msg: locationMsg, handleSetMsg: handleSetLocationMsg } =
    useValidation("");

  const handleCancel = () => {};

  const handleValidation = () => {
    handleSetNameMsg("docsName", valueInit.docsName);
    handleSetLocationMsg("docsLocation", { lat: latitude, lng: longitude });
  };

  const handleSubmit = () => {
    handleValidation();
    if (data.docsName != "" && data.docsLocation != "") {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });

      swalWithBootstrapButtons
        .fire({
          title: "문서를 등록하시겠습니까?",
          html: `문서제목: ${data.docsName}<br/>
          위치: ${address}<br/>
          카테고리: ${data.docsCategory}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "등록 요청",
          cancelButtonText: "취소",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              "문서 등록 요청 완료!",
              "관리자의 승인 후 등록이 완료됩니다.",
              "success"
            );
            handleRequest();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "취소 완료",
              "문서 등록 요청을 취소합니다.",
              "error"
            );
          }
        });
    }
  };

  const handleRequest = () => {
    create(data)
      .then((response) => {
        if (response.status === 200) {
          alert("문서가 생성되었습니다.");
          console.log(data);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Container>
        <DocumentInputGroup
          htmlFor="docsName"
          id="docsName"
          placeholder={helperMsg.title}
          value={valueInit.docsName}
          ref={inputName}
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
          ref={inputLocation}
          disabled
          onChange={(e) => {
            handleOnChange(e);
            console.log(e.target.value);
          }}
          helperMsg={locationMsg}
        >
          위치
        </DocumentInputGroup>
        <DocumentLabel>카테고리</DocumentLabel>
        <SelectMenu
          id="docsCategory"
          value={valueInit.docsCategory}
          onChange={handleOnChange}
        />
        <StyledButton>
          <Button
            type="click"
            color="primary"
            border="1px solid #216D32"
            backgroundcolor="white"
            onClick={handleCancel}
          >
            등록 취소
          </Button>
          <Button
            type="submit"
            color="white"
            border="none"
            backgroundcolor="primary"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            등록 요청
          </Button>
        </StyledButton>
      </Container>
    </>
  );
};



export default CreateDocument;
