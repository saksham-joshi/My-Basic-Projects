import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ElectionsPage } from "./pages/ElectionsPage";
import { ElectionDetailPage } from "./pages/ElectionDetailPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { VoterDashboard } from "./pages/VoterDashboard";
import { CandidateDashboard } from "./pages/CandidateDashboard";
import "./index.css";
import type { ReactNode } from "react";

function ProtectedRoute({
  children,
  allowedRole,
}: {
  children: ReactNode;
  allowedRole: string;
}) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/login" replace />;
  }

  if (profile.role !== allowedRole) {
    return <Navigate to={`/dashboard/${profile.role}`} replace />;
  }

  return <>{children}</>;
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/elections" element={<ElectionsPage />} />
            <Route
              path="/elections/:id"
              element={<ElectionDetailPage />}
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/voter"
              element={
                <ProtectedRoute allowedRole="voter">
                  <VoterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/candidate"
              element={
                <ProtectedRoute allowedRole="candidate">
                  <CandidateDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
