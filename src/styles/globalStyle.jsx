import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
   html, body{
    width: 100vw;
    font-family: var(--font-pretendard-light);

   &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(237, 214, 214, 0.4);
  }
    &::-webkit-scrollbar-thumb {
        background: rgba(86, 77, 77, 0.3);
        border-radius: 6px;
    }
 }
`;
