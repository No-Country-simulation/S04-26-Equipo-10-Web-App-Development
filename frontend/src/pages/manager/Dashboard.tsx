import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/manager/Header";
import BarChart from "../../components/charts/BarChart";
import KpiGrid from "../../components/charts/KpiGrid";
import EstadoBadge from "../../components/ui/EstadoBadge";
import PrioridadBadge from "../../components/ui/PrioridadBadge";

// --- tipos ---
type Estado = "Abierto" | "Asignado" | "En proceso" | "Cerrado";
type Prioridad = "Alta" | "Media" | "Baja" | "Prioridad no asignada";

interface Reporte {
  id: number;
  operator: string;
  estado: Estado;
  prioridad: Prioridad;
  tipo: string;
  descripcion: string;
  area: string;
  fecha: string;
  hora: string;
  tecnico: string | null;
}

// --- mock data ---
const mockReportes: Reporte[] = [
  { id: 1, operator: "Sara Martínez",   estado: "Abierto",     prioridad: "Prioridad no asignada", tipo: "Falla eléctrica",    descripcion: "Motor de la banda transportadora no enciende. Se escuchó un sonido de chispa antes de apagarse.", area: "Producción", fecha: "28/04/2026", hora: "08:30", tecnico: null },
  { id: 2, operator: "María García",    estado: "En proceso",  prioridad: "Alta",                  tipo: "Fuga",               descripcion: "Fuga de vapor en la válvula principal de la caldera 2. Se detectó presión baja.",                   area: "Calderas",   fecha: "27/04/2026", hora: "09:56", tecnico: "Ana López" },
  { id: 3, operator: "Marcos Nodal",    estado: "Asignado",    prioridad: "Media",                 tipo: "Sobrecalentamiento", descripcion: "Temperatura elevada en el panel de control de la línea 3.",                                       area: "Producción", fecha: "24/04/2026", hora: "11:21", tecnico: "Miguel Torres" },
  { id: 4, operator: "Elena Rodríguez", estado: "En proceso",  prioridad: "Baja",                  tipo: "Vibración Excesiva", descripcion: "Vibración anormal en bomba de enfriamiento. Se detectó durante la inspección matutina.",           area: "Producción", fecha: "21/04/2026", hora: "07:47", tecnico: "Miguel Torres" },
];

const kpis = [
  { label: "Total de reportes",            value: 4,  icon: "📋" },
  { label: "Total de reportes abiertos",   value: 1,  icon: "📋" },
  { label: "Total de reportes en proceso", value: 2,  icon: "📋" },
  { label: "Total de incidentes cerrados", value: 0,  icon: "📋" },
];

const barData = [
  { label: "Total en reportes",            value: 4, max: 4 },
  { label: "Total de incidentes abiertos", value: 1, max: 4 },
  { label: "Total de incidentes en proceso",value: 2, max: 4 },
  { label: "Total de incidentes cerrados", value: 0, max: 4 },
];

// --- página ---
export default function ManagerPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<"dashboard" | "users">("dashboard");

  const handleNav = (tab: "dashboard" | "users") => {
    setActiveNav(tab);
    if (tab === "users") navigate("/manager/users");
    else navigate("/manager");
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

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <Header
        userName="Alex Sterling"
        userRole="Gerente"
        navLinks={navLinks}
      />

      <div style={{ padding: "32px" }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111827" }}>Métricas de reportes</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ padding: "8px 16px", background: "#111827", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              + Añadir área
            </button>
            <button style={{ padding: "8px 16px", background: "#10b981", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              ✎ Modificar área
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <KpiGrid items={kpis} />

        {/* Bar chart */}
          <BarChart
          title="Gráfico de reportes"
          data={barData}
          />

        {/* Tabla */}
        <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ background: "#10b981", padding: "14px 20px" }}>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Reportes</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#7BC6B1" }}>
                  {["OPERADOR", "ESTADO", "PRIORIDAD", "TIPO", "DESCRIPCIÓN", "ÁREA", "FECHA", "HORA", "TÉCNICO ASIGNADO"].map(col => (
                    <th key={col} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockReportes.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, color: "#111827", whiteSpace: "nowrap" }}>{r.operator}</td>
                    <td style={{ padding: "14px 16px" }}><EstadoBadge estado={r.estado} /></td>
                    <td style={{ padding: "14px 16px" }}><PrioridadBadge prioridad={r.prioridad} /></td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.tipo}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6b7280", maxWidth: 240 }}>{r.descripcion}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.area}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{r.fecha}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.hora}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.tecnico ?? "N/A"}</td>
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