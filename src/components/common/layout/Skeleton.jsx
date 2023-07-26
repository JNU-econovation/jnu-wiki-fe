import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const Container = styled.div`
  position: absolute;
  .container {
    position: relative;
    height: fit-content;
    padding: 10px;
    border-radius: 10px;

    background: #fdfefe;
    box-shadow: 10px 10px 0px -1px rgba(0, 0, 0, 0.23);
  }

  .box {
    margin-top: -15px;
  }

  .column {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bottom-box {
    margin-top: 35px;
  }

  .square {
    height: 250px;
    width: 250px;
    border-radius: 10px;
  }

  .line {
    margin-top: 15px;
    height: 20px;
    width: 300px;
    border-radius: 50px;
  }

  .basic {
    margin-bottom: 20px;
  }

  .line1 {
    width: 50%;
  }

  .line2 {
    width: 70%;
  }

  .loading-animation {
    overflow: hidden;
    background: #d0d0d0;
  }

  .loading-animation::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    animation: ${loadingAnimation} 0.5s infinite;
    background: linear-gradient(to right, transparent, #d9d9d9, transparent);
  }
`;

const Skeleton = () => {
  return (
    <Container>
      <div className="box">
        <div className="column">
          <div className="basic line line1 loading-animation"></div>
        </div>
        <div className="row">
          <div className="line line2 loading-animation"></div>
        </div>
        <div className="row">
          <div className="line line2 loading-animation"></div>
        </div>
        <div className="row">
          <div className="line line2 loading-animation"></div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="column">
          <div className="line line1 loading-animation"></div>
        </div>
        <div className="row">
          <div className="line square loading-animation"></div>
        </div>
      </div>
    </Container>
  );
};

export default Skeleton;
