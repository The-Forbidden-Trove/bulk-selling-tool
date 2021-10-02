import { createGlobalStyle } from "styled-components";
import FontinSmallCaps from "./Fontin-Regular.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Fontin SmallCaps';
        url(${FontinSmallCaps}) format('truetype'),
    }
`;
