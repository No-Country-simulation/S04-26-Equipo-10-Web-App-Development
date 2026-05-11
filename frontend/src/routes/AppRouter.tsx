import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/public/Login";
import OperatorPage from "../pages/operator/Dashboard";
import SupervisorPage from "../pages/supervisor/Dashboard";
import TechniquePage from "../pages/technique/Dashboard";
import ManagerPage from "../pages/manager/Dashboard";
import UserManagement from "../pages/manager/UserManagement";

type Role = "operator" | "supervisor" | "technique" | "manager";

function PrivateRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: Role[];
}) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role as Role)) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pública */}
        <Route path="/login" element={<Login />} />

        {/* Operador */}
        <Route
          path="/operator"
          element={
            <PrivateRoute allowedRoles={["operator"]}>
              <OperatorPage />
            </PrivateRoute>
          }
        />

        {/* Supervisor */}
        <Route
          path="/supervisor"
          element={
            <PrivateRoute allowedRoles={["supervisor"]}>
              <SupervisorPage />
            </PrivateRoute>
          }
        />

        {/* Técnico */}
        <Route
          path="/technique"
          element={
            <PrivateRoute allowedRoles={["technique"]}>
              <TechniquePage />
            </PrivateRoute>
          }
        />

        {/* Manager */}
        <Route
          path="/manager"
          element={
            <PrivateRoute allowedRoles={["manager"]}>
              <ManagerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/users"
          element={
            <PrivateRoute allowedRoles={["manager"]}>
              <UserManagement />
            </PrivateRoute>
          }
        />

        {/* Fallbacks */}
        <Route path="/unauthorized" element={<div style={{ padding: 32 }}>No tenés permiso para acceder a esta página.</div>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}