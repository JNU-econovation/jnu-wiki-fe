import InfoGroup from "./InfoGroup";
import DocumentHeading from "./DocumentHeading";
import Description from "./Description";
import DocumentTime from "./DocumentTime";
import DocumentInput from "./DocumentInput";
import styled from "styled-components";
import SelectMenu from "./SelectMenu";
import { useQuery } from "@tanstack/react-query";
import { detailDocument } from "../../../services/document";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import useInput from "../../../hooks/useInput";
import Skeleton from "../layout/Skeleton";

const Group = styled.div`
  height: 100vh;

  position: fixed;
  left: 20rem;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  overflow: hidden;

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

const Document = (id) => {
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState(false);
  const docsTitle = useRef(null);

  const { data, isLoading, isError } = useQuery(
    // ["detail_document", { id }],
    // detailDocument(id),
    ["detail_document"],
    detailDocument,
    {
      onSuccess: (data) => {
        console.log(data);
      },
      staleTime: 10000,
    }
  );

  console.log(data);

  const category = useSelector((state) => state.category.category);
  let getLat = useSelector((state) => state.latLng.latitude);
  let getLng = useSelector((state) => state.latLng.longitude);

  const dispatch = useDispatch();

  const docsName = data?.data[0].docsName;
  const docsCategory = data?.data[0].docsCategory;
  const docsCreatedAt = data?.data[0].docsCreatedAt;
  const docsContent = data?.data[0].docsContent;

  const { address } = useSelector((state) => state.address);

  const { valueInit, handleOnChange, reset } = useInput({
    docsCategory,
    docsName,
    docsLocation: address,
    docsContent,
  });

  let [value, setValue] = useState(docsContent);
  const handleOnContentChange = (updateValue) => {
    setValue(updateValue);
  };

  const handleInput = (type) => {
    type === "basic" ? setEdit(!edit) : setEditContent(!editContent);
    valueInit.docsName = docsName;
    setValue(docsContent);
  };

  // const data = {
  //   docsCategory: category || "카페",
  //   docsName: valueInit.docsName,
  //   docsLocation: { lat: getLat, lng: getLng },
  // };

  return (
    <>
      {!isLoading && <Skeleton />}
      <Group>
        <DocumentHeading className="basic" onClick={() => handleInput("basic")}>
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
                ref={docsTitle}
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
            onClick={() => handleInput("content")}
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
                value={value}
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
      </Group>
    </>
  );
};

export default Document;
