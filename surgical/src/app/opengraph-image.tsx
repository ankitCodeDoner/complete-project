import { ImageResponse } from "next/og";

export const alt = "MedVance Healthcare — B2B Medical Supplies Marketplace";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #071B35 0%, #0B3A4A 55%, #087F8C 100%)",
          color: "white",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#14866d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>MedVance Healthcare</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 920,
            }}
          >
            B2B medical supplies marketplace
          </div>
          <div style={{ fontSize: 28, color: "#D6F3F6", maxWidth: 860 }}>
            Surgical instruments, diagnostics and consumables at wholesale
            prices.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
