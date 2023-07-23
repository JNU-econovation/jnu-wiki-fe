import styled from "styled-components";
import DocumentInputGroup from "./DocumentInputGroup";
import Button from "../layout/Button";
import { helperMsg } from "../../../utils/helpermsg";
import useInput from "../../../hooks/useInput";
import useValidation from "../../../hooks/useValidation";
import { create } from "../../../services/document";
import { useSelector } from "react-redux";

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

const StyledButton = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 12rem;
`;

const CreateDocument = () => {
  const { latitude, longitude } = useSelector((state) => state.latLng);
  const address = useSelector((state) => state.address.address);

  const { valueInit, handleOnChange } = useInput({
    docsName: "",
    docsCategory: "",
    docsLocation: { lat: latitude, lng: longitude },
    docsContent: null,
    docsCreateBy: "cookie",
  });

  const handleSubmit = () => {
    const data = {
      docsName: valueInit.docsName,
      docsCategory: valueInit.docsCategory,
      docsLocation: { lat: latitude, lng: longitude },
      docsContent: null,
      docsCreatedBy: "cookie",
    };

    console.log(data);

    // const { msg: nameMsg, handleSetMsg: handleSetNameMsg } = useValidation("");
    // const { msg: locationMsg, handleSetMsg: handleSetLocationMsg } =
    //   useValidation("");
    // const { msg: categoryMsg, handleSetMsg: handleSetCategoryMsg } =
    //   useValidation("");

    create(data)
      .then((response) => {
        if (response.status === 200) {
          alert("문서가 생성되었습니다.");
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
          onChange={(e) => {
            handleOnChange(e);
            // handleSetNameMsg(e);
          }}
          // helperMsg={nameMsg}
        >
          문서 제목
        </DocumentInputGroup>
        <DocumentInputGroup
          htmlFor="docsLocation"
          id="docsLocation"
          placeholder={helperMsg.location}
          // value={valueInit.docsLocation}
          value={address}
          onChange={(e) => {
            handleOnChange(e);
            // handleSetLocationMsg(e);
          }}
          // helperMsg={locationMsg}
        >
          위치
        </DocumentInputGroup>
        <DocumentInputGroup
          htmlFor="docsCategory"
          id="docsCategory"
          placeholder={helperMsg.category}
          value={valueInit.docsCategory}
          onChange={(e) => {
            handleOnChange(e);
            // handleSetCategoryMsg(e);
          }}
          // helperMsg={categoryMsg}
        >
          카테고리
        </DocumentInputGroup>
        <StyledButton>
          <Button
            type="click"
            color="primary"
            border="1px solid #216D32"
            backgroundcolor="white"
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
              // checkInput(e);
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
