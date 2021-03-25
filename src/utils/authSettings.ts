export const IDENTITY_CONFIG = {
    authority: process.env.REACT_APP_AUTH_URL,
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URL,
    automaticSilentRenew: true,
    loadUserInfo: true,
    silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URL,
    post_logout_redirect_uri: process.env.REACT_APP_LOGOFF_REDIRECT_URL,
    response_type: "id_token token",
    scope: "openid email roles profile",
}

export const METADATA_OIDC = {
    issuer: process.env.REACT_APP_AUTH_URL,
    jwks_uri: process.env.REACT_APP_AUTH_URL + "/.well-known/openid-configuration/jwks",
    authorization_endpoint: process.env.REACT_APP_AUTH_URL + "/connect/authorize",
    token_endpoint: process.env.REACT_APP_AUTH_URL + "/connect/token",
    userinfo_endpoint: process.env.REACT_APP_AUTH_URL + "/connect/userinfo",
    end_session_endpoint: process.env.REACT_APP_AUTH_URL + "/connect/endsession",
    check_session_iframe: process.env.REACT_APP_AUTH_URL + "/connect/checksession",
    revocation_endpoint: process.env.REACT_APP_AUTH_URL + "/connect/revocation",
    introspection_endpoint: process.env.REACT_APP_AUTH_URL + "/connect/introspect"
};