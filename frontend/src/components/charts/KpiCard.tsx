interface KpiCardProps {
  label: string;
  value: number | string;
  icon?: string;
}

export default function KpiCard({ label, value, icon = "📋" }: KpiCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        padding: "16px 20px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      {icon && <span style={{ fontSize: 28 }}>{icon}</span>}
      <div>
        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>
          {label}
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#111827" }}>
          {value}
        </div>
      </div>
    </div>
  );
}