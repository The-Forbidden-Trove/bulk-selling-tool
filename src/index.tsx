import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./defaultTheme";
import { GlobalStyles } from "./global";
import AuthProvider from "./api/oauth/AuthProvider";
import { AuthService } from "./api/oauth/AuthService";

const authServiceData = new AuthService({});

ReactDOM.render(
  <AuthProvider authService={authServiceData}>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </AuthProvider>,
  document.getElementById("root")
);
