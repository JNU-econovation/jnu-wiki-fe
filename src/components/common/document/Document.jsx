import InfoGroup from "./InfoGroup";
import DocumentHeading from "./DocumentHeading";
import Description from "./Description";
import DocumentTime from "./DocumentTime";
import DocumentInput from "./DocumentInput";
import styled from "styled-components";
import SelectMenu from "./SelectMenu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { detailDocument } from "../../../services/document";
import { contentModify, basicModify } from "../../../services/document";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import useInput from "../../../hooks/useInput";
import Skeleton from "../layout/Skeleton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Group = styled.div`
  height: 100%;
  max-width: 25rem;

  position: fixed;
  left: 20rem;
  top: 5.5rem;
  padding: 2rem 2rem 8rem 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  box-sizing: border-box;
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(237, 214, 214, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(86, 77, 77, 0.3);
    border-radius: 6px;
  }

  #docsName,
  #docsLocation,
  #docsCategory {
    width: fit-content;
    height: fit-content;
    margin-top: -4rem;
  }
`;

const Box = styled.div`
  margin: 1rem 0 2rem 0;
`;

const ContentHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const StyledInput = styled(DocumentInput)`
  display: inline;
  width: 60%;
  height: 1.6rem;
`;

const StyledSpan = styled.span`
  display: inline-block;
  height: 1rem;
`;

const EditorContainer = styled.div`
  width: fit-content;
  max-width: 22rem;
`;

const Document = ({ id }) => {
  // 데이터 요청
  const { data, isLoading, isError } = useQuery(["detail_document", id], () =>
    detailDocument(id)
  );

  const category = useSelector((state) => state.category.category);
  let getLat = useSelector((state) => state.latLng.latitude);
  let getLng = useSelector((state) => state.latLng.longitude);

  // 데이터 선언
  const docsName = data?.data.response.docsName;
  const docsCategory = data?.data.response.docsCategory;
  const docsCreatedAt = data?.data.response.docsCreatedAt;
  let docsContent = data?.data.response.docsContent;

  let { address, initialAddress } = useSelector((state) => state.address);

  const { valueInit, handleOnChange, reset } = useInput({
    docsCategory,
    docsName,
    docsLocation: address,
    docsContent,
  });

  const queryClient = useQueryClient();

  const { mutate: mutationContentModify } = useMutation({
    mutationFn: contentModify,
    onSuccess: () => {
      queryClient.invalidateQueries("detail_document");
    },
  });

  const { mutate: mutationBasicModify } = useMutation({
    mutationFn: basicModify,
    onSuccess: () => {
      queryClient.invalidateQueries("detail_document");
    },
  });

  // 기본정보 컨트롤 (수정버튼 눌렀을 경우와 누르지 않았을 경우)
  const [edit, setEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [cancel, setCancel] = useState(false);

  const handleInput = () => {
    setEdit(!edit);
    setSave(!save);

    valueInit.docsName = docsName;
  };

  const handleBasicSave = () => {
    setEdit(!edit);
    mutationBasicModify({
      docsId: id,
      docsRequestType: "MODIFIED",
      docsRequestCategory: category || docsCategory,
      docsRequestName: valueInit.docsName,
      docsRequestLocation: { lat: getLat, lng: getLng },
    });

    toast.info("관리자 승인 후 갱신됩니다.", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleBasicCancel = () => {
    setEdit(!edit);
  };

  // docsContent의 value
  let [value, setValue] = useState(docsContent);
  const handleOnContentChange = (updateValue) => {
    setValue(updateValue); // 입력시마다 갱신해주기
  };

  // 내용버튼 컨트롤
  const [editContent, setEditContent] = useState(false);

  const handleInputContent = () => {
    setEditContent(!editContent);
  };

  const handleSave = () => {
    mutationContentModify({ docs_id: id, docsContent: value });
    setEditContent(!editContent);
    toast.success("내용이 수정되었습니다!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleCancel = () => {
    value = docsContent;
    setEditContent(!editContent);
  };

  return (
    <>
      {isLoading && <Skeleton />}
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

      <Group>
        <DocumentHeading
          className="basic"
          type={edit}
          save={save}
          cancel={cancel}
          onClick={handleInput}
          onBasicSave={handleBasicSave}
          onBasicCancel={handleBasicCancel}
        >
          기본 정보
        </DocumentHeading>
        <Box>
          <InfoGroup htmlFor="title" label="문서 제목">
            {edit ? (
              <StyledInput
                htmlFor="docsName"
                id="docsName"
                placeholder={docsName}
                value={valueInit.docsName}
                onChange={handleOnChange}
              />
            ) : (
              docsName
            )}
          </InfoGroup>

          <InfoGroup className="location" htmlFor="location" label="위치">
            {edit ? (
              <StyledInput
                htmlFor="docsLocation"
                id="docsLocation"
                placeholder={initialAddress}
                value={address}
                disabled
                onChange={handleOnChange}
              />
            ) : (
              initialAddress
            )}
          </InfoGroup>
          <InfoGroup htmlFor="category" label="카테고리">
            {edit ? (
              <StyledSpan>
                <SelectMenu
                  id="docsCategory"
                  placeholder={valueInit.docsCategory}
                  value={category}
                  onChange={handleOnChange}
                />
              </StyledSpan>
            ) : (
              docsCategory
            )}
          </InfoGroup>
        </Box>
        <ContentHeading>
          <DocumentHeading
            className="content"
            contentType={editContent}
            onClick={handleInputContent}
            onSave={handleSave}
            onCancel={handleCancel}
          >
            내용
          </DocumentHeading>
          <DocumentTime className="time">{docsCreatedAt}</DocumentTime>
        </ContentHeading>
        <Description>
          {editContent ? (
            <EditorContainer className="container">
              <MDEditor
                value={value || value === "" ? value : docsContent}
                onChange={handleOnContentChange}
                preview="edit"
                components={{
                  toolbar: (command, disabled, executeCommand) => {
                    if (command.keyCommand === "code") {
                      return (
                        <button
                          aria-label="Insert code"
                          disabled={disabled}
                          onClick={(evn) => {
                            evn.stopPropagation();
                            executeCommand(command, command.groupName);
                          }}
                        >
                          Code
                        </button>
                      );
                    }
                  },
                }}
              />
            </EditorContainer>
          ) : (
            <MDEditor.Markdown
              source={docsContent}
              style={{ whiteSpace: "pre-wrap" }}
            />
          )}
        </Description>
      </Group>
    </>
  );
};

export default Document;
