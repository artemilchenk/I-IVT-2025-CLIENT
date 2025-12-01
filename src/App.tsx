import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { AuthProtectedRoute } from "./pages/ProtectedRoutePage";
import { GalleriesPage } from "./pages/GalleriesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "@/pages/RegisterPage.tsx";
import { AuthLayout } from "./components/AuthLayout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-up" element={<RegisterPage />} />
        <Route path="sign-in" element={<LoginPage />} />
      </Route>

      <Route
        path="/galleries"
        element={
          <AuthProtectedRoute>
            <GalleriesPage />
          </AuthProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <AuthProtectedRoute>
            <ProfilePage />
          </AuthProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/profile" replace />} />
    </Routes>
  );
}

export default App;
