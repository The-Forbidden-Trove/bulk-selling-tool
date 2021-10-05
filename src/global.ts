import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0px;
        padding: 0px;
        color: white;
        font-family: "Fontin SmallCaps";
    }

  body {
    ::-webkit-scrollbar {
        width: 100px;
        border: 1px solid red;
    }
}
`;
