import InfoGroup from "./InfoGroup";
import DocumentHeading from "./DocumentHeading";
import Description from "./Description";
import DocumentTime from "./DocumentTime";
import DocumentInput from "./DocumentInput";
import ToggleBtn from "./ToggleBtn";
import styled from "styled-components";
import SelectMenu from "./SelectMenu";
import { contentModify, basicModify } from "@/services/document";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import useInput from "@/hooks/useInput";
import "react-toastify/dist/ReactToastify.css";
import ScrapBtn from "./ScrapBtn";
import { scrapCreate, scrapDelete } from "@/services/scrap";
import { nullTokenEdit, successEdit, adminApproval } from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import useDocsMutation from "@/hooks/useDocsMutation";

const Group = styled.div`
  width: 22rem;
  height: 90%;

  position: fixed;
  left: 15rem;
  top: 6.2rem;
  padding: 2rem 2rem 8rem 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  box-sizing: border-box;
  overflow: auto;

  #docsName,
  #docsLocation,
  #docsCategory {
    width: fit-content;
    height: fit-content;
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

const DocsContent = styled.div`
  display: inline-block;
  width: 12rem;
`;

const DocsInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
`;

const Document = ({ data }) => {
  const { isLogin, memberId } = useSelector((state) => state.user);

  const {
    id,
    docsName,
    docsLocation,
    docsCategory,
    docsCreatedAt,
    docsContent,
    scrap: isScraped,
  } = data || {};

  const { category } = useSelector((state) => state.category);
  const { latitude: getLat, longitude: getLng } = useSelector(
    (state) => state.latLng
  );
  const { address, initialAddress } = useSelector((state) => state.address);
  let addressInfo = { lat: getLat, lng: getLng };

  const { valueInit, handleOnChange, reset } = useInput({
    docsCategory,
    docsName,
    docsLocation: address,
    docsContent,
  });

  const [basicEdit, setBasicEdit] = useState(false);
  const [contentValue, setContentValue] = useState(docsContent);
  const [editContent, setEditContent] = useState(false);
  const [scraped, setScrap] = useState(isScraped);
  const [toggle, setToggle] = useState(true);

  const { mutate: mutationBasicModify } = useDocsMutation(basicModify);
  const { mutate: mutationContentModify } = useDocsMutation(contentModify);
  const { mutate: scrapDetailCreate } = useDocsMutation(scrapCreate);
  const { mutate: scrapDetailDelete } = useDocsMutation(scrapDelete);

  const handleSetInput = () => {
    if (!isLogin) nullTokenEdit();
    else {
      setBasicEdit(true);
      valueInit.docsName = docsName;
    }
  };

  const handleAddressInfo = () => {
    !getLat && (addressInfo = docsLocation);
    return addressInfo;
  };

  const saveBasicInfo = () => {
    mutationBasicModify({
      docsId: id,
      docsRequestType: "MODIFIED",
      docsRequestCategory: category || docsCategory,
      docsRequestName: valueInit.docsName,
      docsRequestLocation: addressInfo,
    });

    adminApproval();
  };

  const handleBasicSave = () => {
    setBasicEdit(false);
    handleAddressInfo();
    saveBasicInfo();
  };

  const handleBasicCancel = () => {
    setBasicEdit(false);
  };

  const handleOnContentChange = (updateValue) => {
    setContentValue(updateValue);
  };

  const handleInputContent = () => {
    if (!isLogin) nullTokenEdit();
    else {
      setEditContent(true);
      setContentValue(docsContent);
    }
  };

  const saveContentInfo = () => {
    mutationContentModify({ docs_id: id, docsContent: contentValue });
    successEdit();
  };

  const handleContentSave = () => {
    setEditContent(false);
    saveContentInfo();
  };

  const handleContentcCancel = () => {
    setEditContent(false);
  };

  useEffect(() => {
    setScrap(isScraped);
  }, [isScraped]);

  const handleOnScrapFill = () => {
    setScrap((prev) => !prev);
    if (!scraped) {
      scrapDetailCreate({ memberId, docsId: id });
    } else {
      scrapDetailDelete({ memberId, docsId: id });
    }
  };

  const clickToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <ToastContainer />
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
              <ScrapBtn onClick={handleOnScrapFill} scrap={scraped} />
            </BasicInfo>

            <Box>
              <DocsInfo>
                <InfoGroup htmlFor="docsName" label="문서 제목" />
                {basicEdit ? (
                  <DocumentInput
                    htmlFor="docsName"
                    id="docsName"
                    placeholder={docsName}
                    value={valueInit.docsName}
                    onChange={handleOnChange}
                  />
                ) : (
                  <DocsContent>{docsName}</DocsContent>
                )}
              </DocsInfo>
              <DocsInfo>
                <InfoGroup
                  className="location"
                  htmlFor="docsLocation"
                  label="위치"
                />
                {basicEdit ? (
                  <DocumentInput
                    htmlFor="docsLocation"
                    id="docsLocation"
                    placeholder={initialAddress}
                    value={address}
                    disabled
                    onChange={handleOnChange}
                  />
                ) : (
                  <DocsContent>{initialAddress}</DocsContent>
                )}
              </DocsInfo>
              <InfoGroup htmlFor="docsCategory" label="카테고리">
                {basicEdit ? (
                  <StyledSpan>
                    <SelectMenu
                      id="docsCategory"
                      value={category}
                      onChange={handleOnChange}
                      selected={docsCategory}
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
                    height={250}
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
                  wrapperElement={{
                    "data-color-mode": "light",
                  }}
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

export default Document;
