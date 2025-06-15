export const msalConfig = {
  auth: {
    clientId: "6136f2b4-0539-4e88-a46f-fa5c2db5813c",
    authority:
      "https://login.microsoftonline.com/81dce4c2-0b31-4b88-a9fc-5c11ee3d636b",
    redirectUri: "http://localhost:5173/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};
