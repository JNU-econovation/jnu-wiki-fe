import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import DocumentHeading from "./DocumentHeading";
import DocumentTime from "./DocumentTime";
import { contentModify } from "@/services/document";
import { nullTokenEdit, successEdit } from "@/utils/toast";
import useDocsMutation from "@/hooks/useDocsMutation";

const Content = ({ data }) => {
  const { isLogin } = useSelector((state) => state.user);

  const { id, docsContent, docsCreatedAt } = data || {};

  const [contentValue, setContentValue] = useState(docsContent);
  const [isEditContent, setIsEditContent] = useState(false);

  const { mutate: mutationContentModify } = useDocsMutation(contentModify);

  const handleOnContentChange = (updateValue) => {
    setContentValue(updateValue);
  };

  const handleInputContent = () => {
    if (!isLogin) return nullTokenEdit();
    setIsEditContent(true);
    setContentValue(docsContent);
  };

  const saveContentInfo = () => {
    mutationContentModify({ docs_id: id, docsContent: contentValue });
    successEdit();
  };

  const handleContentSave = () => {
    setIsEditContent(false);
    saveContentInfo();
  };

  const handleContentCancel = () => {
    setIsEditContent(false);
  };

  return (
    <>
      <ContentHeading>
        <DocumentHeading
          isEdit={isEditContent}
          clickEdit={handleInputContent}
          clickSave={handleContentSave}
          clickCancel={handleContentCancel}
        >
          내용
        </DocumentHeading>
        <DocumentTime className="time">{docsCreatedAt}</DocumentTime>
      </ContentHeading>

      {isEditContent ? (
        <EditorContainer data-color-mode="light" className="container">
          <MDEditor
            height={250}
            value={contentValue}
            onChange={handleOnContentChange}
            preview="edit"
            previewOptions={{
              allowedElements: [
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "p",
                "a",
                "span",
                "br",
                "ol",
                "ul",
              ],
            }}
          />
        </EditorContainer>
      ) : (
        <div data-color-mode="light">
          <MDEditor.Markdown
            source={docsContent}
            style={{ whiteSpace: "pre-wrap", fontSize: "1.1rem" }}
          />
        </div>
      )}
    </>
  );
};

const ContentHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1rem;
`;

const EditorContainer = styled.div`
  width: fit-content;
  max-width: 23rem;
`;

export default Content;
