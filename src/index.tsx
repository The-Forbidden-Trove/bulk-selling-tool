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

const authServiceData = new AuthService({});

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
