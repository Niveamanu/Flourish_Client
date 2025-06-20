import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import Login from "./Pages/Login";
import UploadFiles from "./Pages/UploadFiles";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import ReconciledRemittances from "./Pages/ReconciledRemittances";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();

  // Show loader while MSAL is processing (e.g., after redirect)
  if (inProgress !== "none") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Landing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reconciled-remittances"
          element={
            <ProtectedRoute>
              <ReconciledRemittances />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-files"
          element={
            <ProtectedRoute>
              <UploadFiles />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Landing />} />
      </Route>
    </Routes>
  );
}
