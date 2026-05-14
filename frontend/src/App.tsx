import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';
import { useAuthStore, type UserRole } from './store/authStore';

function DummyPage({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600">Este es un componente de prueba para la ruta: {title}.</p>
    </div>
  );
}

function DummyLogin() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login({ name: `User ${role}`, roleToMock: role });
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-[#0FA968] rounded-2xl mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-[#0B1528] mb-8">OpsCore Login</h1>
        <div className="flex flex-col gap-3">
          <button onClick={() => handleLogin('Operador')} className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Entrar como Operador</button>
          <button onClick={() => handleLogin('Supervisor')} className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Entrar como Supervisor</button>
          <button onClick={() => handleLogin('Técnico')} className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Entrar como Técnico</button>
          <button onClick={() => handleLogin('Gerente')} className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Entrar como Gerente</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { user, setRole } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<DummyLogin />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute><MainLayout><OutletWrapper /></MainLayout></ProtectedRoute>}>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/reportar" element={<RoleGuard allowedRoles={['Operador']} redirectOnFail><DummyPage title="Reportar incidente" /></RoleGuard>} />
          <Route path="/mis-reportes" element={<RoleGuard allowedRoles={['Operador']} redirectOnFail><DummyPage title="Mis reportes" /></RoleGuard>} />
          <Route path="/mis-tareas" element={<RoleGuard allowedRoles={['Técnico']} redirectOnFail><DummyPage title="Mis tareas" /></RoleGuard>} />
          <Route path="/dashboard" element={<RoleGuard allowedRoles={['Gerente', 'Supervisor']} redirectOnFail><DummyPage title="Dashboard General" /></RoleGuard>} />
          <Route path="/usuarios" element={<RoleGuard allowedRoles={['Gerente']} redirectOnFail><DummyPage title="Gestión de usuarios" /></RoleGuard>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Role Switcher for Dev Only - Rendered globally if authenticated */}
      {user && (
        <div className="fixed bottom-0 right-0 z-50 p-4 bg-white/90 backdrop-blur shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-tl-2xl border-t border-l border-gray-200 hidden lg:block">
          <h2 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider text-center">Dev Switch</h2>
          <div className="flex flex-col gap-2">
            {(['Operador', 'Supervisor', 'Técnico', 'Gerente'] as UserRole[]).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${user.role === r ? 'bg-[#0FA968] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
    </Router>
  );
}

import { Outlet } from 'react-router-dom';

function OutletWrapper() {
  return <Outlet />;
}

function HomeRedirect() {
  const { user } = useAuthStore();
  if (!user) return null;
  return <Navigate to={user.role === 'Gerente' || user.role === 'Supervisor' ? '/dashboard' : '/mis-reportes'} replace />;
}

export default App;
