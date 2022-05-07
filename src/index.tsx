import ReactDOM from "react-dom";
import App from "./App";
import styled, { ThemeProvider } from "styled-components";
import { defaultTheme } from "./defaultTheme";
import { GlobalStyles } from "./global";
import AuthProvider from "./api/oauth/AuthProvider";
import { AuthService } from "./api/oauth/AuthService";
import { Provider } from "react-redux";
import store from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { ToastContainer } from "react-toastify";
import GlobalFonts from "./fonts/fonts";
import "react-toastify/dist/ReactToastify.css";

declare global {
  interface Array<T> {
    sortByMultiple<T>(
      this: Array<T>,
      ...keys: { key: keyof T; order?: "asc" | "desc" }[]
    ): this;
  }
}
interface Array<T> {
  sortByMultiple<T>(
    this: Array<T>,
    ...keys: { key: keyof T; order?: "asc" | "desc" }[]
  ): this;
}

Array.prototype.sortByMultiple = function sortByMultiple<T>(
  this: [],
  ...keys: { key: keyof T; order?: "asc" | "desc" }[]
) {
  return [...keys].reverse().reduce(
    (curr, key) =>
      //@ts-ignore
      curr.sort((a: any, b: any) =>
        key.order === "asc"
          ? a[key.key] < b[key.key]
            ? -1
            : a[key.key] == b[key.key]
            ? 0
            : 1
          : a[key.key] > b[key.key]
          ? -1
          : a[key.key] == b[key.key]
          ? 0
          : 1,
      ),
    this,
  );
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const provider = "https://bulk-selling-tool.theforbiddentrove.xyz";
export const tokenEndpoint =
  "https://bulk-selling-tool.theforbiddentrove.xyz/redirect";

const authServiceData = new AuthService({
  clientId: "tftbulksellingtool",
  provider: provider,
  tokenEndpoint: tokenEndpoint,
  authorizeEndpoint: "https://www.pathofexile.com/oauth/authorize",
  redirectUri: "https://bulk.tftrove.com",
  location: window.location,
  scopes: ["account:stashes", "account:profile"],
  state: "fd3a90ef-ce50-4361-86ae-985d6d8a26aa",
});

const StyledToastContainer = styled(ToastContainer).attrs({
  className: "toast-container",
  toastClassName: "toast",
  bodyClassName: "body",
  progressClassName: "progress",
})`
  /* .toast-container */
  width: 20%;
  background-color: none;

  /* .toast is passed to toastClassName */
  .toast {
    background-color: ${(props) => props.theme.colors.accentDark};
  }

  button[aria-label="close"] {
    display: visible;
  }

  /* .body is passed to bodyClassName */
  .body {
    background-color: ${(props) => props.theme.colors.accentDark};
  }

  /* .progress is passed to progressClassName */
  .progress {
    background-color: ${(props) => props.theme.colors.fg2};
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider authService={authServiceData}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalFonts />
        <GlobalStyles />
        <App />
        <StyledToastContainer
          autoClose={5000}
          //hideProgressBar={true}
          pauseOnFocusLoss={false}
          newestOnTop={true}
          limit={2}
        />
      </ThemeProvider>
    </AuthProvider>
  </Provider>,
  document.getElementById("root"),
);
