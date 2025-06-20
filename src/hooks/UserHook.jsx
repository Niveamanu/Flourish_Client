import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";

export default function useMsalUser() {
  const { accounts, instance } = useMsal();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const account = accounts[0];
      setUserInfo({
        username: account.username,
        name: account.name,
        email: account.username,
      });

      const request = {
        scopes: ["User.Read"], // Replace with your required scopes
        account: account,
      };

      instance
        .acquireTokenSilent(request)
        .then((response) => {
          localStorage.setItem("accessToken", response.accessToken);
        })
        .catch(async (error) => {
          // If silent fails (e.g., consent required), fallback to popup
          if (error instanceof window.msal.InteractionRequiredAuthError) {
            try {
              const response = await instance.acquireTokenPopup(request);
              localStorage.setItem("accessToken", response.accessToken);
            } catch (popupError) {
              console.error("Token acquisition failed:", popupError);
            }
          } else {
            console.error("Token acquisition failed:", error);
          }
        });
    }
  }, [accounts, instance]);

  return userInfo;
}
