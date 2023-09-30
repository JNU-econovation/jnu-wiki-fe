import styled from "styled-components";

const DocumentWrapper = styled.div`
  -webkit-animation: fade-in 1s;

  @-webkit-keyframes fade-in {
    0% {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;

export default DocumentWrapper;
