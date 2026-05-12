import { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- tipos ---
type Rol = "Operador" | "Operadora" | "Técnico" | "Técnica" | "Supervisor" | "Gerente";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  area: string;
  activo: boolean;
}

// --- mock data ---
const mockUsuarios: Usuario[] = [
  { id: 1, nombre: "Sara",   apellido: "Martínez",  email: "saramartinez@email.com",   rol: "Operadora", area: "Producción",   activo: true },
  { id: 2, nombre: "María",  apellido: "García",    email: "mariagarcia@email.com",    rol: "Operadora", area: "Calderas",     activo: false },
  { id: 3, nombre: "Marcos", apellido: "Nodal",     email: "marcosnodal@email.com",    rol: "Operador",  area: "Producción",   activo: false },
  { id: 4, nombre: "Elena",  apellido: "Rodríguez", email: "elenarodriguez@email.com", rol: "Operadora", area: "Producción",   activo: false },
  { id: 5, nombre: "Ana",    apellido: "López",     email: "analopez@email.com",       rol: "Técnica",   area: "Mantenimiento",activo: false },
  { id: 6, nombre: "Miguel", apellido: "Torres",    email: "migueltorres@email.com",   rol: "Técnico",   area: "Mantenimiento",activo: false },
];

// --- page ---
export default function UserManagement() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<"dashboard" | "users">("users");
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);

  const totalUsuarios = usuarios.length;
  const usuariosActivos = usuarios.filter(u => u.activo).length;
  const usuariosInactivos = usuarios.filter(u => !u.activo).length;

  const handleNav = (tab: "dashboard" | "users") => {
    setActiveNav(tab);
    if (tab === "dashboard") navigate("/manager");
  };

  const handleEliminar = (id: number) => {
    setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  const handleEditar = (id: number) => {
    console.log("Editar usuario:", id);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      {/* Navbar */}
      <nav style={{ background: "#111827", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>O</span>
            </div>
            <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>OpsCore</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {([["dashboard", "Dashboard"], ["users", "Gestión de usuarios"]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleNav(key)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: activeNav === key ? "#fff" : "#9ca3af",
                  fontSize: 14, fontWeight: activeNav === key ? 600 : 400,
                  padding: "4px 8px",
                  borderBottom: activeNav === key ? "2px solid #10b981" : "2px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Alex Sterling</div>
            <div style={{ color: "#9ca3af", fontSize: 12 }}>Gerente</div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 20 }}>⎋</button>
        </div>
      </nav>

      <div style={{ padding: "32px" }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111827" }}>Gestión de usuarios</h2>
          </div>
          <button style={{ padding: "8px 16px", background: "#111827", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            + Añadir usuario
          </button>
        </div>

        {/* KPI cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Total de usuarios",    value: totalUsuarios,    icon: "👤", iconBg: "#e0f2fe" },
            { label: "Usuarios activos",     value: usuariosActivos,  icon: "✅", iconBg: "#7BC6B1" },
            { label: "Usuarios inactivos",   value: usuariosInactivos,icon: "⭕", iconBg: "#fee2e2" },
          ].map((k, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: k.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                {k.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{k.label}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#111827" }}>{k.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla */}
        <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ background: "#10b981", padding: "14px 20px" }}>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Usuarios</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#7BC6B1" }}>
                  {["NOMBRE", "APELLIDO", "EMAIL", "ROL", "ÁREA", "ACCIONES"].map(col => (
                    <th key={col} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#111827" }}>{u.nombre}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#111827" }}>{u.apellido}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6b7280" }}>{u.email}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{u.rol}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{u.area}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <button
                          onClick={() => handleEditar(u.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#6b7280", padding: 0 }}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleEliminar(u.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#ef4444", padding: 0 }}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}