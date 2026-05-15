"use client";

import dynamic from "next/dynamic";

type DriverMapProps = {
  mode?: "staff" | "driver";
};

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        gap: 16,
        color: "#64748b",
      }}
    >
      <div style={{ fontSize: 48 }}>🗺️</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "#1e293b" }}>
        Loading Intelligence Map...
      </div>
      <div style={{ fontSize: 13, color: "#94a3b8" }}>
        Initialising map engine — this may take a moment
      </div>
      <div
        style={{
          width: 200,
          height: 4,
          background: "#f1f5f9",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "#fbbf24",
            borderRadius: 4,
            animation: "mapLoad 1.5s ease-in-out infinite",
            width: "60%",
          }}
        />
      </div>
      <style>{`
        @keyframes mapLoad {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  ),
});

export default function DriverMap({ mode = "driver" }: DriverMapProps) {
  return <MapClient mode={mode} />;
}