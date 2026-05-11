// ─── src/pages/public/Login.tsx ───────────────────────────────────────────────
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ROLES = [
  { label: "Operador",   role: "operator",   path: "/operator" },
  { label: "Supervisor", role: "supervisor",  path: "/supervisor" },
  { label: "Técnico",    role: "technique",   path: "/technique" },
  { label: "Manager",    role: "manager",     path: "/manager" },
] as const;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: typeof ROLES[number]) => {
    login({ name: "Usuario Demo", role: role.role });
    navigate(role.path);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: 12, fontFamily: "Inter, sans-serif" }}>
      <h2>OpsCore — Login Demo</h2>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>Seleccioná un rol para ingresar</p>
      {ROLES.map(r => (
        <button
          key={r.role}
          onClick={() => handleLogin(r)}
          style={{ padding: "10px 32px", borderRadius: 8, border: "none", background: "#111827", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", width: 200 }}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}