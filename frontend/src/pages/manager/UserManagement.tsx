import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/manager/Header";
import KpiGrid from "../../components/charts/KpiGrid";
import UserModal from "../../components/manager/UserModal";

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

// --- áreas disponibles (extraídas del mock) ---
const AREAS = [...new Set(mockUsuarios.map(u => u.area))];

// --- página ---
export default function UserManagement() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<"dashboard" | "users">("users");
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);

  // estados del modal
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<"create" | "edit" | "delete">("create");
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  const totalUsuarios = usuarios.length;
  const usuariosActivos = usuarios.filter(u => u.activo).length;
  const usuariosInactivos = usuarios.filter(u => !u.activo).length;

  const handleNav = (tab: "dashboard" | "users") => {
    setActiveNav(tab);
    if (tab === "dashboard") navigate("/manager");
  };

  // Abrir modal para añadir
  const openAddUser = () => {
    setUserModalMode("create");
    setSelectedUser(null);
    setUserModalOpen(true);
  };

  // Abrir modal para editar
  const openEditUser = (id: number) => {
    const user = usuarios.find(u => u.id === id);
    if (!user) return;
    setSelectedUser(user);
    setUserModalMode("edit");
    setUserModalOpen(true);
  };

  // Abrir modal para confirmar eliminación
  const openDeleteUser = (id: number) => {
    const user = usuarios.find(u => u.id === id);
    if (!user) return;
    setSelectedUser(user);
    setUserModalMode("delete");
    setUserModalOpen(true);
  };

  // Manejar el submit del modal (crear, editar, eliminar)
  const handleUserSubmit = (formData: { nombre: string; email: string; contrasena: string; rol: string; area: string }) => {
    if (userModalMode === "create") {
      const nuevoUsuario: Usuario = {
        id: Math.max(0, ...usuarios.map(u => u.id)) + 1,
        nombre: formData.nombre,
        apellido: "", // en el modal actual no pedimos apellido, podrías agregarlo después
        email: formData.email,
        rol: formData.rol as Rol,
        area: formData.area,
        activo: true,
      };
      setUsuarios(prev => [...prev, nuevoUsuario]);
    } else if (userModalMode === "edit" && selectedUser) {
      setUsuarios(prev =>
        prev.map(u =>
          u.id === selectedUser.id
            ? { ...u, nombre: formData.nombre, email: formData.email, rol: formData.rol as Rol, area: formData.area }
            : u
        )
      );
    } else if (userModalMode === "delete" && selectedUser) {
      setUsuarios(prev => prev.filter(u => u.id !== selectedUser.id));
    }
    setUserModalOpen(false);
  };

  // Mapear initialData para UserModal
  const initialData = selectedUser
    ? { nombre: selectedUser.nombre, email: selectedUser.email, rol: selectedUser.rol, area: selectedUser.area }
    : {};

  const navLinks = [
    { label: "Dashboard", path: "/manager", active: activeNav === "dashboard" },
    { label: "Gestión de usuarios", path: "/manager/users", active: activeNav === "users" },
  ];

  const kpiItems = [
    { label: "Total de usuarios",    value: totalUsuarios,    icon: "👤", iconBg: "#e0f2fe" },
    { label: "Usuarios activos",     value: usuariosActivos,  icon: "✅", iconBg: "#7BC6B1" },
    { label: "Usuarios inactivos",   value: usuariosInactivos,icon: "⭕", iconBg: "#fee2e2" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      <Header userName="Alex Sterling" userRole="Gerente" navLinks={navLinks} />

      <div style={{ padding: "32px" }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111827" }}>Gestión de usuarios</h2>
          <button
            onClick={openAddUser}
            style={{ padding: "8px 16px", background: "#111827", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
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
                          onClick={() => openEditUser(u.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#6b7280", padding: 0 }}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => openDeleteUser(u.id)}
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

      {/* Modal de usuario */}
      <UserModal
        open={userModalOpen}
        mode={userModalMode}
        initialData={initialData}
        areas={AREAS}
        onClose={() => setUserModalOpen(false)}
        onSubmit={handleUserSubmit}
      />
    </div>
  );
}