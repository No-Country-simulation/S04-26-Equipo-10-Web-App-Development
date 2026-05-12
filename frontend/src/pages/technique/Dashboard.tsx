import { useState } from "react";
import Header from "../../components/layout/simple/Header";

// --- tipos ---
type Estado = "Abierto" | "Asignado" | "En proceso" | "Cerrado";
type Prioridad = "Alta" | "Media" | "Baja";

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
  tecnico: string;
}

// --- mock data (solo los asignados a este técnico) ---
const mockReportes: Reporte[] = [
  { id: 1, operator: "Marcos Nodal", estado: "Asignado", prioridad: "Media", tipo: "Sobrecalentamiento", descripcion: "Temperatura elevada en el panel de control de la línea 3.", area: "Producción", fecha: "24/04/2026", hora: "11:21", tecnico: "Miguel Torres" },
  { id: 2, operator: "Elena Rodríguez", estado: "En proceso", prioridad: "Baja", tipo: "Vibración Excesiva", descripcion: "Vibración anormal en bomba de enfriamiento. Se detectó durante la inspección matutina.", area: "Producción", fecha: "21/04/2026", hora: "07:47", tecnico: "Miguel Torres" },
];

// --- estilos ---
const estadoStyles: Record<string, { dot: string; label: string }> = {
  Abierto:      { dot: "#ef4444", label: "Abierto" },
  Asignado:     { dot: "#f59e0b", label: "Asignado" },
  "En proceso": { dot: "#3b82f6", label: "En proceso" },
  Cerrado:      { dot: "#10b981", label: "Cerrado" },
};

const prioridadStyles: Record<string, { color: string }> = {
  Alta:  { color: "#ef4444" },
  Media: { color: "#f59e0b" },
  Baja:  { color: "#6b7280" },
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
export default function TechniquePage() {
  const [reportes] = useState<Reporte[]>(mockReportes);

  const handleEditEstado = (id: number) => {
    console.log("Editar estado:", id);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      <Header name="Miguel Torres" role="Supervisor" onLogout={() => console.log("logout")} />

      <div style={{ padding: "32px 32px 0" }}>
        <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          {/* Header tabla */}
          <div style={{ background: "#10b981", padding: "14px 20px" }}>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Incidentes asignados</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#7BC6B1" }}>
                  {["OPERADOR", "ESTADO", "PRIORIDAD", "TIPO", "DESCRIPCIÓN", "ÁREA", "FECHA", "HORA", "TÉCNICO ASIGNADO", "ACCIONES"].map(col => (
                    <th key={col} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportes.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, color: "#111827", whiteSpace: "nowrap" }}>{r.operator}</td>
                    <td style={{ padding: "14px 16px" }}><EstadoBadge estado={r.estado} /></td>
                    <td style={{ padding: "14px 16px" }}><PrioridadBadge prioridad={r.prioridad} /></td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.tipo}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6b7280", maxWidth: 240 }}>{r.descripcion}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.area}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{r.fecha}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.hora}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.tecnico}</td>
                    <td style={{ padding: "14px 16px", minWidth: 110 }}>
                      <button
                        onClick={() => handleEditEstado(r.id)}
                        style={{
                          padding: "6px 12px",
                          background: "#10b981",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Editar estado
                      </button>
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