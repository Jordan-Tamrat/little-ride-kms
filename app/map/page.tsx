"use client";
import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 16, color: "#64748b" }}>
      <div style={{ fontSize: 48 }}>🗺️</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "#1e293b" }}>Loading Intelligence Map...</div>
      <div style={{ fontSize: 13, color: "#94a3b8" }}>Initialising map engine — this may take a moment</div>
    </div>
  ),
});

export default function MapPage() {
  return <MapClient mode="staff" />;
}
