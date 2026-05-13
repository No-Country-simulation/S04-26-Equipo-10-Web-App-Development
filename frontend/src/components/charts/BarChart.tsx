interface BarItem {
  label: string;
  value: number;
  max: number;
}

interface BarChartProps {
  title?: string;
  data: BarItem[];
  barColor?: string;
  backgroundColor?: string;
}

export default function BarChart({
  title,
  data,
  barColor = "#7BC6B1",
  backgroundColor = "#f3f6f4",
}: BarChartProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        padding: "20px 24px",
        marginBottom: 24,
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      }}
    >
      {title && (
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#111827",
            marginBottom: 16,
          }}
        >
          {title}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {data.map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <span
              style={{
                fontSize: 12,
                color: "#6b7280",
                width: 220,
                flexShrink: 0,
              }}
            >
              {item.label}
            </span>

            <div
              style={{
                flex: 1,
                background: backgroundColor,
                borderRadius: 4,
                height: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(item.value / item.max) * 100}%`,
                  background: barColor,
                  borderRadius: 4,
                  transition: "width 0.4s ease",
                }}
              />
            </div>

            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#111827",
                width: 16,
                textAlign: "right",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}