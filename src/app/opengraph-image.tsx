import { ImageResponse } from "next/og";

export const alt = "Gursimran Singh - Technical Program Manager at Google DeepMind";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#bac8b1",
          color: "#273024",
          padding: 72,
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 30,
            color: "#404e3b"
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#273024"
            }}
          />
          gsym.me
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 0.95,
              fontWeight: 700,
              letterSpacing: 0
            }}
          >
            Gursimran Singh
          </div>
          <div
            style={{
              maxWidth: 900,
              fontSize: 38,
              lineHeight: 1.18,
              color: "#404e3b"
            }}
          >
            Technical Program Manager at Google DeepMind working on Gemini releases.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 28,
            color: "#404e3b"
          }}
        >
          <span>Google DeepMind</span>
          <span>Microsoft Azure</span>
          <span>Georgia Tech CS</span>
        </div>
      </div>
    ),
    size
  );
}
