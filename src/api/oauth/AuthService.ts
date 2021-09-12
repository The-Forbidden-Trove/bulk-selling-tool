import { AuthServiceProps, AuthTokens } from "./oauthTypes";
import { toUrlEncoded } from "./utils";
const axios = require("axios").default;

export class AuthService {
  props: AuthServiceProps;
  timeout?: number;

  constructor(props: AuthServiceProps) {
    this.props = props;
    const code = this.getCodeFromLocation(window.location);
    console.log(code);
    if (code !== null) {
      this.fetchToken(code)
        .then(() => {
          this.restoreUri();
        })
        .catch((e) => {
          console.log(e);
          this.removeItem("auth");
          this.removeCodeFromLocation();
        });
    } else if (this.props.autoRefresh) {
      this.startTimer();
    }
  }

  getCodeFromLocation(location: Location): string | null {
    const split = location.toString().split("?");
    if (split.length < 2) {
      return null;
    }
    const pairs = split[1].split("&");
    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      if (key === "code") {
        return decodeURIComponent(value || "");
      }
    }
    return null;
  }

  removeCodeFromLocation(): void {
    const [base, search] = window.location.href.split("?");
    if (!search) {
      return;
    }
    console.log("search", search);
    const newSearch = search
      .split("&")
      .map((param) => param.split("="))
      .filter(([key]) => key !== "code" && key !== "state")
      .map((keyAndVal) => keyAndVal.join("="))
      .join("&");
    window.history.replaceState(
      window.history.state,
      "null",
      base + (newSearch.length ? `?${newSearch}` : "")
    );

    console.log("new search", newSearch);
  }

  getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }
  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  setAuthTokens(auth: AuthTokens): void {
    console.log(auth);
    const { refreshSlack = 5 } = this.props;
    const now = new Date().getTime();
    auth.expires_at = now + (auth.expires_in + refreshSlack) * 1000;
    window.localStorage.setItem("auth", JSON.stringify(auth));
  }

  getAuthTokens(): AuthTokens {
    return JSON.parse(window.localStorage.getItem("auth") || "{}");
  }

  isPending(): boolean {
    return window.localStorage.getItem("auth") === null;
  }

  isAuthenticated(): boolean {
    return window.localStorage.getItem("auth") !== null;
  }

  async logout(): Promise<boolean> {
    this.removeItem("auth");
    window.location.reload();
    return true;
  }

  async login(): Promise<void> {
    this.authorize();
  }

  // this will do a full page reload and to to the OAuth2 provider's login page
  // and then redirect back to redirectUri
  authorize(): boolean {
    const { clientId, state, authorizeEndpoint, redirectUri, scopes } =
      this.props;

    window.localStorage.setItem("preAuthUri", window.location.href);
    window.localStorage.removeItem("auth");

    const url = `${authorizeEndpoint}?${toUrlEncoded({
      clientId: clientId,
      state: state,
      scope: scopes.join(" "),
      responseType: "code",
      redirectUri: redirectUri,
    })}`;
    console.log(url);

    window.location.replace(url);
    return true;
  }

  // this happens after a full page reload. Read the code from localstorage
  async fetchToken(code: string, isRefresh = false): Promise<AuthTokens> {
    const { tokenEndpoint, autoRefresh = true } = this.props;

    if (code && isRefresh === false) {
      const response = await axios.get(`${tokenEndpoint}?code=${code}`);

      let json = response.data;

      if (isRefresh && !json.refresh_token) {
        console.log("refresh");
      }
      this.setAuthTokens(response.data as AuthTokens);
      if (autoRefresh) {
        this.startTimer();
      }
    }

    return this.getAuthTokens();
  }

  armRefreshTimer(refreshToken: string, timeoutDuration: number): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.fetchToken(refreshToken, true)
        .then(({ refresh_token: newRefreshToken, expires_at: expiresAt }) => {
          if (!expiresAt) return;
          const now = new Date().getTime();
          const timeout = expiresAt - now;
          if (timeout > 0) {
            this.armRefreshTimer(newRefreshToken, timeout);
          } else {
            this.removeItem("auth");
            this.removeCodeFromLocation();
          }
        })
        .catch((e) => {
          this.removeItem("auth");
          this.removeCodeFromLocation();
          console.warn({ e });
        });
    }, timeoutDuration);
  }

  startTimer(): void {
    const authTokens = this.getAuthTokens();
    if (!authTokens) {
      return;
    }
    const { refresh_token: refreshToken, expires_at: expiresAt } = authTokens;
    if (!expiresAt || !refreshToken) {
      return;
    }
    const now = new Date().getTime();
    const timeout = expiresAt - now;
    if (timeout > 0) {
      this.armRefreshTimer(refreshToken, timeout);
    } else {
      this.removeItem("auth");
      this.removeCodeFromLocation();
    }
  }

  restoreUri(): void {
    const uri = window.localStorage.getItem("preAuthUri");
    window.localStorage.removeItem("preAuthUri");
    console.log({ uri });
    if (uri !== null) {
      window.location.replace(uri);
    }
    this.removeCodeFromLocation();
  }
}
