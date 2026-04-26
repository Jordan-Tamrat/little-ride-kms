"use client";
import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("../../map/MapClient"), {
  ssr: false,
  loading: () => (
    <div style={{ height: 480, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderRadius: 14, border: "1px solid #e2e8f0", flexDirection: "column", gap: 12, color: "#64748b" }}>
      <div style={{ fontSize: 36 }}>🗺️</div>
      <div style={{ fontSize: 14, fontWeight: 600 }}>Loading Intelligence Map...</div>
    </div>
  ),
});

export default function DriverMapWrapper() {
  return <MapClient mode="driver" />;
}
