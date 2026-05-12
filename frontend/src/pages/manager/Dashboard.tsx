import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

// --- estilos ---
const estadoStyles: Record<string, { dot: string; label: string }> = {
  Abierto:      { dot: "#ef4444", label: "Abierto" },
  Asignado:     { dot: "#f59e0b", label: "Asignado" },
  "En proceso": { dot: "#3b82f6", label: "En proceso" },
  Cerrado:      { dot: "#10b981", label: "Cerrado" },
};

const prioridadStyles: Record<string, { color: string }> = {
  Alta:                    { color: "#ef4444" },
  Media:                   { color: "#f59e0b" },
  Baja:                    { color: "#6b7280" },
  "Prioridad no asignada": { color: "#9ca3af" },
};

function EstadoBadge({ estado }: { estado: string }) {
  const s = estadoStyles[estado] ?? { dot: "#6b7280", label: estado };
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
      <span style={{ fontSize: 12, color: "#374151" }}>{s.label}</span>
    </span>
  );
}

function PrioridadBadge({ prioridad }: { prioridad: string }) {
  const s = prioridadStyles[prioridad] ?? { color: "#6b7280" };
  return <span style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{prioridad}</span>;
}

// --- page ---
export default function ManagerPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<"dashboard" | "users">("dashboard");

  const handleNav = (tab: "dashboard" | "users") => {
    setActiveNav(tab);
    if (tab === "users") navigate("/manager/users");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      {/* Header con nav embebida */}
      <nav style={{
        background: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: 64,
      }}>
        {/* Logo + nav links */}
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

        {/* User */}
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {kpis.map((k, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 28 }}>{k.icon}</span>
              <div>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{k.label}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#111827" }}>{k.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 16 }}>Gráfico de reportes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {barData.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: "#6b7280", width: 220, flexShrink: 0 }}>{b.label}</span>
                <div style={{ flex: 1, background: "#f3f6f4", borderRadius: 4, height: 12, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${(b.value / b.max) * 100}%`,
                    background: "#7BC6B1",
                    borderRadius: 4,
                    transition: "width 0.4s ease",
                  }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#111827", width: 16, textAlign: "right" }}>{b.value}</span>
              </div>
            ))}
          </div>
        </div>

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