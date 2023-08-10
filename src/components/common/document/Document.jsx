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
import { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import useInput from "../../../hooks/useInput";
import Skeleton from "../layout/Skeleton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Group = styled.div`
  height: 100vh;
  max-width: 22rem;

  position: fixed;
  left: 20rem;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  overflow: hidden;

  #docsName,
  #docsLocation,
 {
    width: fit-content;
    height: fit-content;
    margin-top: -4rem;
  }
`;

const Box = styled.div`
  margin: 1rem 0 2rem 0;
`;

const ContentTime = styled.div`
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

  const dispatch = useDispatch();

  // 데이터 선언
  const docsName = data?.data.response.docsName;
  const docsCategory = data?.data.response.docsCategory;
  const docsCreatedAt = data?.data.response.docsCreatedAt;
  let docsContent = data?.data.response.docsContent;
  const { address } = useSelector((state) => state.address);

  // 데이터를 커스텀 훅에 선언
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

    // ❗handleInput이 실행되면 항상 docsName으로 초기화되는 문제가 발생
    valueInit.docsName = docsName;
  };
  const isToastShownRef = useRef(false);
  const handleBasicSave = () => {
    setEdit(!edit);
    if (!isToastShownRef.current) {
      mutationBasicModify({
        docsId: id,
        docsCategory: category,
        docsName: valueInit.docsName,
        docsLocation: { lat: getLat, lng: getLng },
      });
      toast.success("관리자 승인 후 갱신됩니다.", {
        position: "top-right",
        autoClose: 3000,
      });
      isToastShownRef.current = true;
    }
    toast.info("관리자 승인 후 갱신됩니다.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
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
        ref={isToastShownRef}
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
                placeholder={address}
                value={address}
                disabled
                onChange={handleOnChange}
              />
            ) : (
              address
            )}
          </InfoGroup>
          <InfoGroup htmlFor="category" label="카테고리">
            {edit ? (
              <StyledSpan>
                <SelectMenu
                  id="docsCategory"
                  value={category}
                  onChange={handleOnChange}
                />
              </StyledSpan>
            ) : (
              docsCategory
            )}
          </InfoGroup>
        </Box>
        <ContentTime>
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
        </ContentTime>
        <div className="markarea"></div>
        <Description>
          {editContent ? (
            <EditorContainer className="container">
              <MDEditor
                height="15rem"
                overflow="scroll"
                value={value ? value : docsContent}
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
            docsContent
          )}
        </Description>
        <ToastContainer
          position="top-right" // 알람 위치 지정
          autoClose={3000} // 자동 off 시간
          hideProgressBar={false} // 진행시간바 숨김
          closeOnClick // 클릭으로 알람 닫기
          rtl={false} // 알림 좌우 반전
          pauseOnFocusLoss // 화면을 벗어나면 알람 정지
          draggable // 드래그 가능
          pauseOnHover // 마우스를 올리면 알람 정지
          theme="light"
          // limit={1} // 알람 개수 제한
        />
      </Group>
    </>
  );
};

export default Document;
