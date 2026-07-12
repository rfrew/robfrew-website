import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Rob Frew - Senior Technical Program Manager";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: 20,
          }}
        >
          ROB FREW
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 36,
            color: "#a3a3a3",
            marginBottom: 60,
          }}
        >
          Senior Technical Program Manager
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 60,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: "#ffffff" }}>
              9PB
            </div>
            <div style={{ fontSize: 18, color: "#737373" }}>Daily Data</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: "#ffffff" }}>
              $50M+
            </div>
            <div style={{ fontSize: 18, color: "#737373" }}>Impact</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: "#ffffff" }}>
              15+
            </div>
            <div style={{ fontSize: 18, color: "#737373" }}>Years</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: "#ffffff" }}>
              6
            </div>
            <div style={{ fontSize: 18, color: "#737373" }}>Certs</div>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 24,
            color: "#525252",
          }}
        >
          robfrew.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
