interface HeaderProps {
  name: string;
  role: string;
  onLogout?: () => void;
}

export default function Header({ name, role, onLogout }: HeaderProps) {
  return (
    <nav style={{
      background: "#1f2937",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      height: 64,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: "#10b981",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>O</span>
        </div>
        <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>OpsCore</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{name}</div>
          <div style={{ color: "#9ca3af", fontSize: 12 }}>{role}</div>
        </div>
        <button
          onClick={onLogout}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#9ca3af", fontSize: 20, display: "flex", alignItems: "center",
          }}
        >
          ⎋
        </button>
      </div>
    </nav>
  );
}