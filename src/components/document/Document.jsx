import styled from "styled-components";

import Basic from "./Basic";
import Content from "./Content";

const Document = ({ data }) => {
  return (
    <Container>
      <Group>
        <Basic data={data} />
        <Content data={data} />
      </Group>
    </Container>
  );
};

const Group = styled.div`
  width: 22rem;
  height: calc(100vh - 6rem);

  position: fixed;
  left: 15rem;
  top: 6rem;
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

export default Document;
