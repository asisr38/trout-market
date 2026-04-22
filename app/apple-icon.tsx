import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #17140F 0%, #0C0B09 100%)",
          borderRadius: 40,
          border: "4px solid #302613",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 18,
            borderRadius: 28,
            border: "2px solid rgba(201, 168, 76, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 24,
            width: 132,
            height: 16,
            borderTop: "8px solid #C9A84C",
            borderRadius: 999,
            transform: "rotate(-8deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 26,
            width: 138,
            height: 16,
            borderBottom: "5px solid rgba(139, 106, 24, 0.95)",
            borderRadius: 999,
            transform: "rotate(-5deg)",
          }}
        />
        <div
          style={{
            color: "#F4EBD6",
            fontSize: 96,
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            lineHeight: 1,
            transform: "translate(-10px, -2px)",
          }}
        >
          T
        </div>
        <div
          style={{
            position: "absolute",
            right: 30,
            bottom: 46,
            width: 54,
            height: 28,
            background: "#C9A84C",
            borderRadius: "999px 999px 999px 999px / 70% 70% 30% 30%",
            transform: "rotate(-10deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 18,
            bottom: 47,
            width: 30,
            height: 24,
            background: "#F4EBD6",
            clipPath: "polygon(0 50%, 100% 0, 78% 100%)",
            transform: "rotate(-4deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 41,
            bottom: 58,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#0C0B09",
          }}
        />
      </div>
    ),
    size,
  );
}
