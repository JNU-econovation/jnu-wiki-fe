import styled from "styled-components";

const Container = styled.div`
  .load-wrapp {
    float: left;
    height: 100px;
    border-radius: 5px;
    text-align: center;
  }

  .load-wrapp:last-child {
    margin-right: 0;
  }

  .line {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: #216d32;
    margin: 0.5rem;
  }

  .load-3 .line:nth-last-child(1) {
    animation: loadingC 0.6s 0.1s linear infinite;
  }

  .load-3 .line:nth-last-child(2) {
    animation: loadingC 0.6s 0.2s linear infinite;
  }

  .load-3 .line:nth-last-child(3) {
    animation: loadingC 0.6s 0.3s linear infinite;
  }

  @keyframes loadingC {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

const Loader = ({ className }) => {
  return (
    <Container className={className}>
      <div className="load-wrapp">
        <div className="load-3">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </Container>
  );
};

export default Loader;
