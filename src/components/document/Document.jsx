import styled from "styled-components";
import Basic from "./Basic";
import Content from "./Content";
import Icon from "../common/Icon";
import { IoRemoveOutline } from "react-icons/io5";
import { useState } from "react";

const Document = ({ data }) => {
  const [display, setDisplay] = useState(true);

  return (
    <Container>
      <Group display={display}>
        <Icon
          color="rgba(170, 170, 170, 0.69)"
          size="3rem"
          className="outline-icon"
          margin="0"
          hoverColor="#949494"
        >
          <IoRemoveOutline
            className="line"
            onClick={() => setDisplay((prop) => !prop)}
          />
        </Icon>
        <Basic data={data} />
        <Content data={data} />
      </Group>
    </Container>
  );
};

const Group = styled.div`
  width: 27rem;
  height: calc(100vh - 5.5rem);

  position: fixed;
  left: 15rem;
  top: 6rem;
  padding: 2rem 2rem 8rem 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  box-sizing: border-box;
  overflow: auto;

  .outline-icon,
  .line {
    display: none;
  }

  @media screen and (max-width: 1023px) {
    left: auto;
    top: 5.5rem;
    width: 25rem;
  }

  @media screen and (max-width: 767px) {
    top: auto;
    bottom: 0;

    width: 100%;
    padding: 1.5rem 1.5rem 8rem 1.5rem;

    box-sizing: border-box;
    border-radius: 10px 10px 0 0;
    box-shadow: 0px -10px 10px 0px rgba(0, 0, 0, 0.106);

    height: ${(props) => (props.display ? "300px" : "20px")};
    transition: height 0.2s ease-in-out;

    .outline-icon {
      display: block;
      position: relative;
      bottom: 2.5rem;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .line {
      display: block;
    }
  }
`;

const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

export default Document;
