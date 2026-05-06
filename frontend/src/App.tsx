import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { useAuthStore, type Role } from './store/authStore';

function DummyPage({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600">Este es un componente de prueba para la ruta: {title}.</p>
    </div>
  );
}

function App() {
  const { user, setRole } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-[#0FA968] rounded-2xl mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-[#0B1528] mb-8">OpsCore Login</h1>
          <div className="flex flex-col gap-3">
            <button onClick={() => setRole('Operador')} className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Entrar como Operador</button>
            <button onClick={() => setRole('Supervisor')} className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Entrar como Supervisor</button>
            <button onClick={() => setRole('Técnico')} className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Entrar como Técnico</button>
            <button onClick={() => setRole('Gerente')} className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Entrar como Gerente</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to={user.role === 'Gerente' ? '/dashboard' : '/mis-reportes'} replace />} />
          <Route path="/reportar" element={<DummyPage title="Reportar incidente" />} />
          <Route path="/mis-reportes" element={<DummyPage title="Mis reportes" />} />
          <Route path="/mis-tareas" element={<DummyPage title="Mis tareas" />} />
          <Route path="/dashboard" element={<DummyPage title="Dashboard General" />} />
          <Route path="/usuarios" element={<DummyPage title="Gestión de usuarios" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Role Switcher for Dev Only */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h2 className="text-sm font-bold text-blue-800 mb-4 uppercase tracking-wider">Modo Desarrollo: Cambiar Rol</h2>
          <div className="flex flex-wrap gap-2">
            {(['Operador', 'Supervisor', 'Técnico', 'Gerente'] as Role[]).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${user.role === r ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </MainLayout>
    </Router>
  );
}

export default App
