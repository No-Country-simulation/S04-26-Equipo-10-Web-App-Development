import { useState } from "react";
import Header from "../../components/layout/simple/Header";
import EstadoBadge from "../../components/ui/EstadoBadge";
import PrioridadBadge from "../../components/ui/PrioridadBadge";
import EditReportModal from "../../components/supervisor/EditReportModal ";
import AssignTechnicianModal from "../../components/supervisor/AssignTechnicianModal ";

// --- tipos ---
type Estado = "Abierto" | "En proceso" | "Asignado" | "Cerrado";
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
  { id: 1, operator: "Sara Martínez", estado: "Abierto", prioridad: "Prioridad no asignada", tipo: "Falla eléctrica", descripcion: "Motor de la banda transportadora no enciende. Se escuchó un sonido de chispa antes de apagarse.", area: "Producción", fecha: "28/04/2026", hora: "08:30", tecnico: null },
  { id: 2, operator: "María García", estado: "En proceso", prioridad: "Alta", tipo: "Fuga", descripcion: "Fuga de vapor en la válvula principal de la caldera 2. Se detectó presión baja.", area: "Calderas", fecha: "27/04/2026", hora: "09:56", tecnico: "Ana López" },
  { id: 3, operator: "Marcos Nodal", estado: "Asignado", prioridad: "Media", tipo: "Sobrecalentamiento", descripcion: "Temperatura elevada en el panel de control de la línea 3.", area: "Producción", fecha: "24/04/2026", hora: "11:21", tecnico: "Miguel Torres" },
  { id: 4, operator: "Elena Rodríguez", estado: "En proceso", prioridad: "Baja", tipo: "Vibración Excesiva", descripcion: "Vibración anormal en bomba de enfriamiento. Se detectó durante la inspección matutina.", area: "Producción", fecha: "21/04/2026", hora: "07:47", tecnico: "Miguel Torres" },
];

// --- página ---
export default function SupervisorPage() {
  const [reportes, setReportes] = useState<Reporte[]>(mockReportes);

  // Estado para modal de edición
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Reporte | null>(null);

  // Estado para modal de asignación
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  // Abrir modal de edición para un reporte
  const openEditModal = (reporte: Reporte) => {
    setEditTarget(reporte);
    setEditModalOpen(true);
  };

  // Submit de edición
  const handleEditSubmit = (data: { estado: string; prioridad: string }) => {
    if (!editTarget) return;
    setReportes(prev =>
      prev.map(r =>
        r.id === editTarget.id
          ? { ...r, estado: data.estado as Estado, prioridad: data.prioridad as Prioridad }
          : r
      )
    );
    setEditModalOpen(false);
  };

  // Submit de asignación de técnico
  const handleAssignSubmit = (data: { area: string; reporteId: string; tecnico: string }) => {
    console.log("Asignación:", data);
    // Podrías actualizar el técnico en el reporte correspondiente
    // Por ahora solo mostramos en consola y cerramos
    setAssignModalOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      <Header name="Alex Sterling" role="Supervisor" onLogout={() => console.log("logout")} />

      <div style={{ padding: "32px 32px 0" }}>
        {/* Botón asignar técnico (genérico) */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <button
            onClick={() => setAssignModalOpen(true)}
            style={{
              background: "#1f2937", color: "#fff", border: "none",
              borderRadius: 8, padding: "10px 20px", fontSize: 14,
              fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            }}
          >
            + Asignar técnico
          </button>
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
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, color: "#1f2937", whiteSpace: "nowrap" }}>{r.operator}</td>
                    <td style={{ padding: "14px 16px" }}><EstadoBadge estado={r.estado} /></td>
                    <td style={{ padding: "14px 16px" }}><PrioridadBadge prioridad={r.prioridad} /></td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.tipo}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6b7280", maxWidth: 240 }}>{r.descripcion}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.area}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{r.fecha}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.hora}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{r.tecnico ?? "N/A"}</td>
                    <td style={{ padding: "14px 16px", minWidth: 110 }}>
                      <button
                        onClick={() => openEditModal(r)}
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
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      <EditReportModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialEstado={editTarget?.estado ?? ""}
        initialPrioridad={editTarget?.prioridad ?? ""}
      />

      {/* Modal de asignación */}
      <AssignTechnicianModal
        open={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        onSubmit={handleAssignSubmit}
      />
    </div>
  );
}