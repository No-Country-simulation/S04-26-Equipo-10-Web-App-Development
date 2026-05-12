import { useState } from "react";
import Header from "../../components/layout/simple/Header";

// --- mock data ---
const mockAreaReports = [
  { id: 1, operator: "Sara Martínez", estado: "Abierto", prioridad: "Alta", tipo: "Falla eléctrica", descripcion: "Motor de la banda transportadora no enciende. Se escuchó un sonido de chispa antes de apagarse.", area: "Producción", fecha: "28/04/2026", hora: "08:30" },
  { id: 2, operator: "Marcos Nodal", estado: "Asignado", prioridad: "Media", tipo: "Sobrecalentamiento", descripcion: "Temperatura elevada en el panel de control de la línea 3.", area: "Producción", fecha: "24/04/2026", hora: "11:21" },
  { id: 3, operator: "Elena Rodríguez", estado: "En proceso", prioridad: "Baja", tipo: "Vibración Excesiva", descripcion: "Vibración anormal en bomba de enfriamiento. Se detectó durante la inspección matutina.", area: "Producción", fecha: "21/04/2026", hora: "07:47" },
];

const mockMyReports = [
  { id: 4, operator: "Alex Sterling", estado: "Abierto", prioridad: "Alta", tipo: "Falla eléctrica", descripcion: "Motor de la banda transportadora no enciende. Se escuchó un sonido de chispa antes de apagarse.", area: "Producción", fecha: "28/04/2026", hora: "08:30" },
  { id: 5, operator: "Alex Sterling", estado: "Asignado", prioridad: "Media", tipo: "Sobrecalentamiento", descripcion: "Temperatura elevada en el panel de control de la línea 3.", area: "Producción", fecha: "24/04/2026", hora: "11:21" },
  { id: 6, operator: "Alex Sterling", estado: "En proceso", prioridad: "Baja", tipo: "Vibración Excesiva", descripcion: "Vibración anormal en bomba de enfriamiento. Se detectó durante la inspección matutina.", area: "Producción", fecha: "21/04/2026", hora: "07:47" },
];

// --- badges ---
const estadoStyles = {
  Abierto:      { dot: "#ef4444", label: "Abierto" },
  Asignado:     { dot: "#f59e0b", label: "Asignado" },
  "En proceso": { dot: "#3b82f6", label: "En proceso" },
  Cerrado:      { dot: "#10b981", label: "Cerrado" },
};

const prioridadStyles = {
  Alta:  { color: "#ef4444" },
  Media: { color: "#f59e0b" },
  Baja:  { color: "#6b7280" },
};

function EstadoBadge({ estado }: { estado: string }) {
  const s = estadoStyles[estado as keyof typeof estadoStyles] || { dot: "#6b7280", label: estado };
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
      <span style={{ fontSize: 12, color: "#374151" }}>{s.label}</span>
    </span>
  );
}

function PrioridadBadge({ prioridad }: { prioridad: string }) {
  const s = prioridadStyles[prioridad as keyof typeof prioridadStyles] || { color: "#6b7280" };
  return <span style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{prioridad}</span>;
}

// --- page ---
export default function OperatorDashboard() {
  const [activeTab, setActiveTab] = useState("area");
  const reports = activeTab === "area" ? mockAreaReports : mockMyReports;

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      <Header name="Alex Sterling" role="Operador" onLogout={() => console.log("logout")} />

      <div style={{ padding: "32px 32px 0" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <button style={{
            background: "#1f2937", color: "#fff", border: "none",
            borderRadius: 8, padding: "10px 20px", fontSize: 14,
            fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Reportar
          </button>
        </div>

        <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex" }}>
            {[{ key: "area", label: "Reportes de área" }, { key: "mine", label: "Tus reportes" }].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1, padding: "14px 0", border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 600,
                  background: activeTab === tab.key ? "#10b981" : "#1f2937",
                  color: "#fff", transition: "background 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#7BC6B1" }}>
                  {["OPERADOR", "ESTADO", "PRIORIDAD", "TIPO", "DESCRIPCIÓN", "ÁREA", "FECHA", "HORA"].map(col => (
                    <th key={col} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, color: "#1f2937", whiteSpace: "nowrap" }}>{r.operator}</td>
                    <td style={{ padding: "14px 16px" }}><EstadoBadge estado={r.estado} /></td>
                    <td style={{ padding: "14px 16px" }}><PrioridadBadge prioridad={r.prioridad} /></td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.tipo}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6b7280", maxWidth: 260 }}>{r.descripcion}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.area}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{r.fecha}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.hora}</td>
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