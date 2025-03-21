import { createGlobalStyle } from 'styled-components';
import "./Font.css";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family : 'BM Jua', serif;
    }

    html, body {
        font-size: 100%;
        background: #f0f2f8;
        color: #4d4d4d;
    }
`

export default GlobalStyles;