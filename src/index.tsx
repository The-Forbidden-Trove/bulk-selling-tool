import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./defaultTheme";
import { GlobalStyles } from "./global";
import AuthProvider from "./api/oauth/AuthProvider";
import { AuthService } from "./api/oauth/AuthService";
import { Provider } from "react-redux";
import store from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const provider = "https://bulk-selling-tool.theforbiddentrove.xyz";
export const tokenEndpoint =
  "https://bulk-selling-tool.theforbiddentrove.xyz/redirect ";

const authServiceData = new AuthService({
  clientId: "tftbulksellingtool",
  provider: provider,
  tokenEndpoint: tokenEndpoint,
  authorizeEndpoint: "https://www.pathofexile.com/oauth/authorize",
  redirectUri: "https://the-forbidden-trove.github.io/bulk-selling-tool/",
  location: window.location,
  scopes: ["account:stashes", "account:profile"],
  state: "fd3a90ef-ce50-4361-86ae-985d6d8a26aa",
});

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider authService={authServiceData}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </Provider>,
  document.getElementById("root")
);
