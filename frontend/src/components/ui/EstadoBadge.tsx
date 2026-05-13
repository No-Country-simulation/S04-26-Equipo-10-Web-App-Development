const estadoStyles: Record<string, { dot: string; label: string }> = {
  Abierto:      { dot: "#ef4444", label: "Abierto" },
  Asignado:     { dot: "#f59e0b", label: "Asignado" },
  "En proceso": { dot: "#3b82f6", label: "En proceso" },
  Cerrado:      { dot: "#10b981", label: "Cerrado" },
};

interface EstadoBadgeProps {
  estado: string;
}

export default function EstadoBadge({ estado }: EstadoBadgeProps) {
  const s = estadoStyles[estado] ?? { dot: "#6b7280", label: estado };
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: s.dot,
          display: "inline-block",
        }}
      />
      <span style={{ fontSize: 12, color: "#374151" }}>{s.label}</span>
    </span>
  );
}