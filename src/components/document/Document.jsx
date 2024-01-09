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
  width: 27rem;
  height: calc(100vh - 6rem);

  position: fixed;
  left: 15rem;
  top: 6rem;
  padding: 2rem 2rem 8rem 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  box-sizing: border-box;
  overflow: auto;

  @media screen and (max-width: 1023px) {
    left: auto;
    top: 5.5rem;
    bottom: 3.4rem;
  }

  @media screen and (max-width: 767px) {
    top: auto;

    width: 100%;
    height: 30%;
    padding: 1.5rem 1.5rem 8rem 1.5rem;

    box-sizing: border-box;
    border-radius: 10px 10px 0 0;
    box-shadow: 0px -10px 10px 0px rgba(0, 0, 0, 0.106);
  }
`;

const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

export default Document;
