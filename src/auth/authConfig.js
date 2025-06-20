export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_ENTRA_SSO_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_ENTRA_SSO_TENANT_ID
    }`,
    redirectUri: import.meta.env.VITE_ENTRA_SSO_REDIRECT_URI,
    postLogoutRedirectUri: import.meta.env.VITE_ENTRA_SSO_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};
