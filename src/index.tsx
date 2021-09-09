import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./defaultTheme";
import { GlobalStyles } from "./global";

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
