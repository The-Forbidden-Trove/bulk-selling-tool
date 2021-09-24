import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0px;
        padding: 0px;
        color: white;
    }

  body {
    font-family: Verdana, Geneva, sans-serif;
    ::-webkit-scrollbar {
        width: 100px;
        border: 1px solid red;
    }
}
`;
