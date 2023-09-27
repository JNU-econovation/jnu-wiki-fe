import InfoGroup from "@/components/document/InfoGroup";
import DocumentHeading from "@/components/document/DocumentHeading";
import Description from "@/components/document/Description";
import DocumentTime from "@/components/document/DocumentTime";
import DocumentInput from "@/components/document/DocumentInput";
import ToggleBtn from "@/components/document/ToggleBtn";
import styled from "styled-components";
import SelectMenu from "@/components/document/SelectMenu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  detailDocument,
  contentModify,
  basicModify,
} from "@/services/document";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import useInput from "@/hooks/useInput";
import Skeleton from "@/components/common/layout/Skeleton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrapBtn from "@/components/document/ScrapBtn";
import { scrapCreate, scrapDelete } from "@/services/scrap";
import MainLayout from "@/components/common/layout/MainLayout";

const Group = styled.div`
  height: 100%;
  max-width: 25rem;

  position: fixed;
  left: 15rem;
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
  position: relative;
  top: 0;
  left: 0;
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

const MypageScrapDetail = ({ id }) => {
  const { data, isLoading } = useQuery(["detail_document", id], () =>
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

  const [basicEdit, setBasicEdit] = useState(false);
  const [contentValue, setContentValue] = useState(docsContent);
  const [editContent, setEditContent] = useState(false);
  const [scrap, setScrap] = useState(true);
  const [toggle, setToggle] = useState(true);

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
    setBasicEdit(true);
    valueInit.docsName = docsName;
  };
  const handleAddressInfo = () => {
    if (!getLat) {
      addressInfo = docsLocation;
    }
    return addressInfo;
  };

  const handleBasicSave = () => {
    setBasicEdit(false);
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
    setBasicEdit(false);
  };

  const handleOnContentChange = (updateValue) => {
    setContentValue(updateValue);
  };

  const handleInputContent = () => {
    setEditContent(true);
    setContentValue(docsContent);
  };

  /**
   * 내용수정 뮤테이션
   */
  const handleContentSave = () => {
    setEditContent(false);
    mutationContentModify({ docs_id: id, docsContent: contentValue });
    toast.success("내용이 수정되었습니다!");
  };

  const handleContentcCancel = () => {
    setEditContent(false);
  };

  const handleOnScrapFill = () => {
    if (scrap) {
      scrapDetailDelete({ docsId: id });
    } else {
      scrapDetailCreate({ docsId: id });
      toast("스크랩 되었습니다!");
    }
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

  const clickToggle = () => {
    setToggle((prev) => !prev);
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
      <Container>
        {toggle && (
          <Group>
            <BasicInfo>
              <DocumentHeading
                className="basic"
                type={basicEdit}
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
                {basicEdit ? (
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
                {basicEdit ? (
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
                {basicEdit ? (
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
                    value={contentValue}
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
        )}
        <ToggleBtn toggle={toggle} onClick={clickToggle} />
      </Container>
    </>
  );
};

export default MypageScrapDetail;