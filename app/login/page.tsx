"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("kms_role");
    if (role === "staff") router.replace("/");
    if (role === "driver") router.replace("/driver-portal");
  }, [router]);

  function login(role: "staff" | "driver") {
    localStorage.setItem("kms_role", role);
    router.push(role === "staff" ? "/" : "/driver-portal");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#0f172a 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{ width: "100%", maxWidth: 500 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <img src="/logo.svg" alt="Little Ride" style={{ width: 76, height: 76, borderRadius: "50%", background: "#fff", padding: 4, marginBottom: 18 }} />
          <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>Little Ride Ethiopia</h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>Knowledge Management System — Select your portal</p>
        </div>

        {/* Portal cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
          {/* Staff */}
          <button onClick={() => login("staff")} style={{
            background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(251,191,36,0.25)",
            borderRadius: 18, padding: "32px 20px", cursor: "pointer", textAlign: "center",
            transition: "all 0.18s",
          }}
            onMouseEnter={e => { const b = e.currentTarget; b.style.background = "rgba(251,191,36,0.1)"; b.style.borderColor = "#fbbf24"; b.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { const b = e.currentTarget; b.style.background = "rgba(255,255,255,0.04)"; b.style.borderColor = "rgba(251,191,36,0.25)"; b.style.transform = ""; }}
          >
            <div style={{ fontSize: 44, marginBottom: 14 }}>🧑‍💼</div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#fbbf24", marginBottom: 8 }}>Staff Portal</div>
            <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
              Support agents<br />Operations & Finance<br />Management team
            </div>
          </button>

          {/* Driver */}
          <button onClick={() => login("driver")} style={{
            background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(99,102,241,0.25)",
            borderRadius: 18, padding: "32px 20px", cursor: "pointer", textAlign: "center",
            transition: "all 0.18s",
          }}
            onMouseEnter={e => { const b = e.currentTarget; b.style.background = "rgba(99,102,241,0.1)"; b.style.borderColor = "#818cf8"; b.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { const b = e.currentTarget; b.style.background = "rgba(255,255,255,0.04)"; b.style.borderColor = "rgba(99,102,241,0.25)"; b.style.transform = ""; }}
          >
            <div style={{ fontSize: 44, marginBottom: 14 }}>🚗</div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#818cf8", marginBottom: 8 }}>Driver Portal</div>
            <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
              Registered drivers<br />Fuel & road info<br />Tips & support
            </div>
          </button>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 18px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 12, color: "#475569" }}>
            🔒 <strong style={{ color: "#64748b" }}>Prototype demo</strong> — click a portal to enter without a password.
          </p>
        </div>
      </div>
    </div>
  );
}
