import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/auth/LoginPage';
import { Outlet } from 'react-router-dom';

function DummyPage({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600">Este es un componente de prueba para la ruta: {title}.</p>
    </div>
  );
}

function App() {

  return (
    <>
      <Toaster richColors position="top-right" />
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><MainLayout><OutletWrapper /></MainLayout></ProtectedRoute>}>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/reportar" element={<RoleGuard allowedRoles={['Operador']} redirectOnFail><DummyPage title="Reportar incidente" /></RoleGuard>} />
            <Route path="/mis-reportes" element={<RoleGuard allowedRoles={['Operador']} redirectOnFail><DummyPage title="Mis reportes" /></RoleGuard>} />
            <Route path="/mis-tareas" element={<RoleGuard allowedRoles={['Técnico']} redirectOnFail><DummyPage title="Mis tareas" /></RoleGuard>} />
            <Route path="/reportes" element={<RoleGuard allowedRoles={['Supervisor']} redirectOnFail><DummyPage title="Reportes" /></RoleGuard>} />
            <Route path="/metricas-de-reportes" element={<RoleGuard allowedRoles={['Gerente']} redirectOnFail><DummyPage title="Métricas de reportes" /></RoleGuard>} />
            <Route path="/usuarios" element={<RoleGuard allowedRoles={['Gerente']} redirectOnFail><DummyPage title="Gestión de usuarios" /></RoleGuard>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

function OutletWrapper() {
  return <Outlet />;
}

function HomeRedirect() {
  const { user } = useAuthStore();
  if (!user) return null;

  switch (user.role) {
    case 'Operador':
      return <Navigate to="/reportar" replace />;
    case 'Técnico':
      return <Navigate to="/mis-tareas" replace />;
    case 'Supervisor':
      return <Navigate to="/reportes" replace />;
    case 'Gerente':
      return <Navigate to="/metricas-de-reportes" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

export default App;
