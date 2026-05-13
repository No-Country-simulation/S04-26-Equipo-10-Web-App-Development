import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/manager/Header"; // o simple si preferís sin navLinks
import KpiGrid from "../../components/charts/KpiGrid";

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

// --- página ---
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

  const navLinks = [
    {
      label: "Dashboard",
      path: "/manager",
      active: activeNav === "dashboard",
    },
    {
      label: "Gestión de usuarios",
      path: "/manager/users",
      active: activeNav === "users",
    },
  ];

  const kpiItems = [
    { label: "Total de usuarios",    value: totalUsuarios,    icon: "👤", iconBg: "#e0f2fe" },
    { label: "Usuarios activos",     value: usuariosActivos,  icon: "✅", iconBg: "#7BC6B1" },
    { label: "Usuarios inactivos",   value: usuariosInactivos,icon: "⭕", iconBg: "#fee2e2" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      <Header
        userName="Alex Sterling"
        userRole="Gerente"
        navLinks={navLinks}
      />

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
        <KpiGrid items={kpiItems} columns={3} />

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