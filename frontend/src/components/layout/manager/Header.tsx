import { useNavigate } from "react-router-dom";

interface NavLink {
  label: string;
  path: string;      // ruta a la que navega, ej. "/manager/users"
  active: boolean;   // true si está activo
}

interface HeaderProps {
  userName: string;
  userRole: string;
  navLinks?: NavLink[];   // si no se pasan, no se muestra barra de navegación
}

export default function Header({ userName, userRole, navLinks }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <nav style={{
      background: "#111827",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      height: 64,
    }}>
      {/* Logo + navegación */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {/* Logo clicable (va a home) */}
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12, padding: 0,
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "#10b981",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>O</span>
          </div>
          <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>OpsCore</span>
        </button>

        {/* Links de navegación (solo si existen) */}
        {navLinks && navLinks.length > 0 && (
          <div style={{ display: "flex", gap: 8 }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: link.active ? "#fff" : "#9ca3af",
                  fontSize: 14, fontWeight: link.active ? 600 : 400,
                  padding: "4px 8px",
                  borderBottom: link.active ? "2px solid #10b981" : "2px solid transparent",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info de usuario */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{userName}</div>
          <div style={{ color: "#9ca3af", fontSize: 12 }}>{userRole}</div>
        </div>
        <button
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#9ca3af", fontSize: 20, display: "flex", alignItems: "center",
          }}
          title="Cerrar sesión"
          onClick={() => {
            // Aquí luego agregarás lógica de logout
            console.log("Logout");
          }}
        >
          ⎋
        </button>
      </div>
    </nav>
  );
}