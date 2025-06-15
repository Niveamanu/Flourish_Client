import { useMsal, useIsAuthenticated } from "@azure/msal-react";

function App() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginRedirect({
      prompt: "select_account",
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:5173/",
    });
  };
  return (
    <div>
      {isAuthenticated ? (
        <>
          <div>welcome to Flourish Client</div>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Microsoft</button>
      )}
    </div>
  );
}

export default App;
