import styled from "styled-components";
import Basic from "./Basic";
import Content from "./Content";
import BottomSheet from "../common/layout/BottomSheet";
import { useBottomDisplay } from "@/hooks/useBottomDisplay";

const Document = ({ data }) => {
  const { isDisplay, handleOnDisplay } = useBottomDisplay(true);

  return (
    <Container>
      <Group display={isDisplay}>
        <BottomSheet onClick={handleOnDisplay} />
        <Basic data={data} />
        <Content data={data} />
      </Group>
    </Container>
  );
};

const Group = styled.section`
  width: 27rem;
  height: calc(100vh - 5.5rem);

  position: fixed;
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

const Container = styled.section`
  position: relative;
  top: 0;
  left: 0;
`;

export default Document;
