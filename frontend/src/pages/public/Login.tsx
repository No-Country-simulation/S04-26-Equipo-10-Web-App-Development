import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MOCK_USERS: Record<string, { password: string; name: string; role: "operator" | "supervisor" | "technician" | "manager" }> = {
  "operator@example.com":   { password: "123", name: "Operador Demo", role: "operator" },
  "supervisor@example.com": { password: "123", name: "Supervisor Demo", role: "supervisor" },
  "technician@example.com": { password: "123", name: "Técnico Demo", role: "technician" },
  "manager@example.com":    { password: "123", name: "Manager Demo", role: "manager" },
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    const user = MOCK_USERS[normalizedEmail];

    if (!user || user.password !== password) {
      setError("Credenciales inválidas.");
      return;
    }

    login({ name: user.name, role: user.role });

    const roleToPath: Record<string, string> = {
      operator: "/operator",
      supervisor: "/supervisor",
      technician: "/technician",
      manager: "/manager",
    };
    navigate(roleToPath[user.role]);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      fontFamily: "Inter, sans-serif",
      background: "#f3f4f6",
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "32px",
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          width: 340,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Logo + nombre de la aplicación */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 8 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "#10b981",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>O</span>
          </div>
          <span style={{ color: "#111827", fontSize: 22, fontWeight: 700 }}>OpsCore</span>
        </div>

        <h2 style={{ margin: 0, textAlign: "center", fontSize: 20, fontWeight: 700, color: "#111827" }}>
          Iniciar sesión
        </h2>
        <p style={{ margin: 0, textAlign: "center", fontSize: 13, color: "#6b7280" }}>
          Ingresá tus credenciales
        </p>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1.5px solid #d1d5db",
              borderRadius: 8,
              fontSize: 14,
              color: "#111827",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#10b981")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1.5px solid #d1d5db",
              borderRadius: 8,
              fontSize: 14,
              color: "#111827",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#10b981")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
          />
        </div>

        {error && (
          <div style={{ color: "#ef4444", fontSize: 13, textAlign: "center", fontWeight: 500 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: "10px 0",
            border: "none",
            borderRadius: 8,
            background: "#111827",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            marginTop: 4,
          }}
        >
          Ingresar
        </button>

        <details style={{ fontSize: 12, color: "#6b7280", textAlign: "center", marginTop: 8 }}>
          <summary style={{ cursor: "pointer", fontWeight: 500 }}>
            Credenciales de prueba
          </summary>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
            <span><strong>Operador:</strong> operator@example.com / 123</span>
            <span><strong>Supervisor:</strong> supervisor@example.com / 123</span>
            <span><strong>Técnico:</strong> technician@example.com / 123</span>
            <span><strong>Manager:</strong> manager@example.com / 123</span>
          </div>
        </details>
      </form>
    </div>
  );
}