import styled from "styled-components";
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";

import DocumentHeading from "./DocumentHeading";
import DocumentTime from "./DocumentTime";
import { contentModify } from "@/services/document";
import { successEdit } from "@/utils/toast";
import useDocsMutation from "@/hooks/useDocsMutation";

const Content = ({ data }) => {
  const { id, docsContent, docsModifiedAt } = data || {};

  const [contentValue, setContentValue] = useState(docsContent);
  const [isEditContent, setIsEditContent] = useState(false);

  const { mutate: mutationContentModify } = useDocsMutation(contentModify);

  const clickEdit = () => {
    setIsEditContent(true);
    setContentValue(docsContent);
  };

  const clickSave = () => {
    setIsEditContent(false);
    mutationContentModify(
      { docs_id: id, docsContent: contentValue },
      {
        onSuccess: () => successEdit(),
      }
    );
  };

  useEffect(() => {
    setIsEditContent(false);
  }, [data, setIsEditContent]);

  return (
    <>
      <ContentHeading>
        <DocumentHeading
          isEdit={isEditContent}
          clickEdit={clickEdit}
          clickSave={clickSave}
          clickCancel={() => setIsEditContent(false)}
        >
          내용
        </DocumentHeading>
        <DocumentTime className="time">{docsModifiedAt}</DocumentTime>
      </ContentHeading>

      {isEditContent ? (
        <EditorContainer data-color-mode="light" className="container">
          <MDEditor
            height={250}
            value={contentValue}
            onChange={setContentValue}
            preview="edit"
          />
        </EditorContainer>
      ) : (
        <Container data-color-mode="light">
          <MDEditor.Markdown
            source={docsContent}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </Container>
      )}
    </>
  );
};

const Container = styled.article`
  > * {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 1023px) {
    > * {
      font-size: 1rem;
    }
  }
`;

const ContentHeading = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1rem;
`;

const EditorContainer = styled.article`
  width: fit-content;
  max-width: 23rem;

  @media screen and (max-width: 767px) {
    max-width: 100%;
  }
`;

export default Content;
