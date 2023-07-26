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

const Container = styled.div`
  width: 22rem;
  height: 100vh;

  position: fixed;
  left: 20rem;
  top: 6rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  overflow: hidden;
`;

const Box = styled.div`
  margin: 1rem 0 2.5rem 0;
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

  const category = useSelector((state) => state.category.category);
  let getLat = useSelector((state) => state.latLng.latitude);
  let getLng = useSelector((state) => state.latLng.longitude);

  const dispatch = useDispatch();

  const docsName = data?.data?.docsName;
  const docsCategory = data?.data?.docsCategory;
  const latitude = data?.data?.docsLocation.lat;
  const longitude = data?.data?.docsLocation.lng;
  const docsCreatedAt = data?.data?.docsCreatedAt;
  const docsContent = data?.data?.docsContent;

  dispatch({
    type: "requestLatLng",
    payload: { requestLat: latitude, requestLng: longitude },
  });

  const { address } = useSelector((state) => state.address);

  const { valueInit, handleOnChange, reset } = useInput({
    docsCategory,
    docsName,
    docsLocation: address,
    docsContent,
  });

  const [value, setValue] = useState(docsContent);
  const handleOnContentChange = () => {
    setValue(value);
  };
  const handleInput = (type) => {
    type === "basic" ? setEdit(!edit) : setEditContent(!editContent);
  };

  // const data = {
  //   docsCategory: category || "카페",
  //   docsName: valueInit.docsName,
  //   docsLocation: { lat: getLat, lng: getLng },
  // };

  return (
    <>
      <Container>
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
            <div className="container">
              <MDEditor
                value={valueInit.docsContent}
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
            </div>
          ) : (
            docsContent
          )}
        </Description>
      </Container>
    </>
  );
};

export default Document;
