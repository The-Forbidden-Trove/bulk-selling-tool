export interface AuthServiceProps {
  clientId: string;
  clientSecret?: string;
  contentType?: string;
  location: Location;
  provider: string;
  authorizeEndpoint?: string;
  tokenEndpoint?: string;
  redirectUri?: string;
  scopes: string[];
  autoRefresh?: boolean;
  refreshSlack?: number;
  state: string;
}

export interface AuthTokens {
  id_token: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  expires_at?: number; // calculated on login
  token_type: string;
}

export interface TokenRequestBody {
  client_id: string;
  grant_type: string;
  scope: string;
  redirect_uri?: string;
  refresh_token?: string;
  client_secret?: string;
  code?: string;
  codeVerifier?: string;
}
