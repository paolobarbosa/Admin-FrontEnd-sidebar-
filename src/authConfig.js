export const msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_MSAL_CLIENT_ID, 
      authority: process.env.REACT_APP_MSAL_AUTHORITY, 
      knownAuthorities: [process.env.REACT_APP_MSAL_KNOWN_AUTHORITIES], 
      redirectUri: process.env.REACT_APP_MSAL_REDIRECT_URI, 
      postLogoutRedirectUri: '/', 
      navigateToLoginRequestUrl: false, 
    },
    cache: {
      cacheLocation: 'sessionStorage', 
      storeAuthStateInCookie: false, 
    }
  }

  export const protectedApi = {
    api: {
      endpoint: "https://audionex-api.azurewebsites.net/api/department/student/GetAll",
      scopes: {
        read: ["api://63507057-6df3-4839-b5f8-6def4650b13a/Task.Read"],
        write: ["api://63507057-6df3-4839-b5f8-6def4650b13a/Task.Write"],
      },
    },
  };

  export const loginRequest = {
    scopes: [...protectedApi.api.scopes.read, ...protectedApi.api.scopes.write],
  };