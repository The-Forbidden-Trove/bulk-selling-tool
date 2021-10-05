import { createGlobalStyle } from "styled-components";
import FontinSmallCaps from "./Fontin-SmallCaps.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Fontin SmallCaps';
        src: local('Fontin SmallCaps'), local('FontinSmallCaps'),
        url(${FontinSmallCaps}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }
`;
