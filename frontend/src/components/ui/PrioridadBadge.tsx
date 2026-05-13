const prioridadStyles: Record<string, { color: string }> = {
  Alta:                    { color: "#ef4444" },
  Media:                   { color: "#f59e0b" },
  Baja:                    { color: "#6b7280" },
  "Prioridad no asignada": { color: "#9ca3af" },
};

interface PrioridadBadgeProps {
  prioridad: string;
}

export default function PrioridadBadge({ prioridad }: PrioridadBadgeProps) {
  const s = prioridadStyles[prioridad] ?? { color: "#6b7280" };
  return <span style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{prioridad}</span>;
}