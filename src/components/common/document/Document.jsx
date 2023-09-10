import InfoGroup from "./InfoGroup";
import DocumentHeading from "./DocumentHeading";
import Description from "./Description";
import DocumentTime from "./DocumentTime";
import DocumentInput from "./DocumentInput";
import styled from "styled-components";
import SelectMenu from "./SelectMenu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  detailDocument,
  contentModify,
  basicModify,
} from "../../../services/document";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import useInput from "../../../hooks/useInput";
import Skeleton from "../layout/Skeleton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrapBtn from "./ScrapBtn";
import { scrapCreate, scrapDelete } from "../../../services/scrap";
import { IoIosArrowForward } from "react-icons/io";

const StyledIcon = styled(IoIosArrowForward)`
  z-index: 10000;
  /* position: relative; */
  /* left: 20rem; */
`;

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  margin: 1rem 0 3rem 0;
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

const BasicInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Document = ({ id }) => {
  const { data, isLoading, isError } = useQuery(["detail_document", id], () =>
    detailDocument(id)
  );

  const category = useSelector((state) => state.category.category);
  const getLat = useSelector((state) => state.latLng.latitude);
  const getLng = useSelector((state) => state.latLng.longitude);
  const { address, initialAddress } = useSelector((state) => state.address);
  let addressInfo = { lat: getLat, lng: getLng };

  const { docsName, docsLocation, docsCategory, docsCreatedAt, docsContent } =
    data?.data.response || {};

  const { valueInit, handleOnChange, reset } = useInput({
    docsCategory,
    docsName,
    docsLocation: address,
    docsContent,
  });

  const [edit, setEdit] = useState(false); // 기본정보 컨트롤 (수정버튼 눌렀을 경우와 누르지 않았을 경우)
  let [value, setValue] = useState(docsContent);
  const [editContent, setEditContent] = useState(false);
  const [scrap, setScrap] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: mutationBasicModify } = useMutation({
    mutationFn: basicModify,
    onSuccess: () => {
      queryClient.invalidateQueries("detail_document");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: mutationContentModify } = useMutation({
    mutationFn: contentModify,
    onSuccess: () => {
      queryClient.invalidateQueries("detail_document");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSetInput = () => {
    setEdit(true);
    valueInit.docsName = docsName;
  };

  const handleAddressInfo = () => {
    if (!getLat) {
      addressInfo = docsLocation;
    }
    return addressInfo;
  };

  const handleBasicSave = () => {
    setEdit(false);
    handleAddressInfo();

    mutationBasicModify({
      docsId: id,
      docsRequestType: "MODIFIED",
      docsRequestCategory: category || docsCategory,
      docsRequestName: valueInit.docsName,
      docsRequestLocation: addressInfo,
    });

    toast.info("관리자 승인 후 갱신됩니다.");
  };

  const handleBasicCancel = () => {
    setEdit(false);
  };

  const handleOnContentChange = (updateValue) => {
    setValue(updateValue);
  };

  const handleInputContent = () => {
    setEditContent(true);
  };

  const handleContentSave = () => {
    setEditContent(false);
    mutationContentModify({ docs_id: id, docsContent: value });
    toast.success("내용이 수정되었습니다!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleContentcCancel = () => {
    setEditContent(false);
  };

  const handleOnScrapFill = () => {
    setScrap(!scrap);
  };

  const { mutate: scrapDetailCreate } = useMutation({
    mutationFn: scrapCreate,
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: scrapDetailDelete } = useMutation({
    mutationFn: scrapDelete,
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (scrap) {
      scrapDetailCreate({ docsId: id });
      toast("스크랩 되었습니다!");
    } else {
      scrapDetailDelete({ docsId: id });
    }
  }, [scrap, id, scrapDetailCreate, scrapDetailDelete]);

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

      <Container>
        <Group>
          <BasicInfo>
            <DocumentHeading
              className="basic"
              type={edit}
              clickEdit={handleSetInput}
              basicSave={handleBasicSave}
              basicCancel={handleBasicCancel}
            >
              기본 정보
            </DocumentHeading>
            <ScrapBtn onClick={handleOnScrapFill} scrap={scrap} />
          </BasicInfo>

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
              clickEdit={handleInputContent}
              contentSave={handleContentSave}
              contentCancel={handleContentcCancel}
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
        <div>
          <StyledIcon />
        </div>
      </Container>
    </>
  );
};

export default Document;
