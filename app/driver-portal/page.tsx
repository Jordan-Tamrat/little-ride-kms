"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useT } from "../lang-context";

// Load map only on client
const DriverMapWrapper = dynamic(() => import("./map/DriverMapWrapper"), {
  ssr: false,
  loading: () => (
    <div style={{ height: 480, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderRadius: 14, border: "1px solid #e2e8f0", flexDirection: "column", gap: 12, color: "#64748b" }}>
      <div style={{ fontSize: 36 }}>🗺️</div>
      <div style={{ fontSize: 14, fontWeight: 600 }}>Loading Intelligence Map...</div>
    </div>
  ),
});

type Section = "info" | "map";

const NAV: { id: Section; icon: string; labelEn: string; labelAm: string }[] = [
  { id: "info", icon: "🚗", labelEn: "Driver Info",       labelAm: "የሹፌር መረጃ" },
  { id: "map",  icon: "🗺️", labelEn: "Intelligence Map", labelAm: "የመረጃ ካርታ" },
];

export default function DriverPortal() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [section, setSection] = useState<Section>("info");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { t, lang, setLang } = useT();
  const mapLang = lang as "en" | "am";

  useEffect(() => {
    const role = localStorage.getItem("kms_role");
    if (role !== "driver") { router.replace("/login"); return; }
    setHydrated(true);
  }, [router]);

  function logout() {
    localStorage.removeItem("kms_role");
    router.push("/login");
  }

  if (!hydrated) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarCollapsed ? 64 : 220,
        background: "linear-gradient(180deg,#1e293b 0%,#0f172a 100%)",
        display: "flex", flexDirection: "column",
        transition: "width 0.2s", flexShrink: 0,
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{ padding: "18px 14px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <img src="/logo.svg" alt="logo" style={{ width: 34, height: 34, borderRadius: "50%", background: "#fff", flexShrink: 0 }} />
          {!sidebarCollapsed && (
            <div>
              <div style={{ color: "#818cf8", fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>Driver Portal</div>
              <div style={{ color: "#475569", fontSize: 11 }}>Little Ride Ethiopia</div>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(v => !v)}
            style={{ marginLeft: "auto", background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 15, padding: 2, flexShrink: 0 }}>
            {sidebarCollapsed ? "→" : "←"}
          </button>
        </div>

        {/* Role badge + lang toggle */}
        {!sidebarCollapsed && (
          <div style={{ margin: "10px 10px 0", display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ flex: 1, background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.2)", borderRadius: 8, padding: "5px 8px", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 13 }}>🚗</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#818cf8" }}>Driver</span>
            </div>
            <div style={{ display: "flex", borderRadius: 7, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
              {(["en", "am"] as const).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: "4px 7px", border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700,
                  background: lang === l ? "#818cf8" : "rgba(255,255,255,0.05)",
                  color: lang === l ? "#fff" : "#64748b",
                }}>
                  {l === "en" ? "EN" : "አማ"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ padding: "12px 8px", flex: 1 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setSection(n.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                width: "100%", border: "none", textAlign: "left",
                background: section === n.id ? "rgba(129,140,248,0.18)" : "transparent",
                color: section === n.id ? "#818cf8" : "#94a3b8",
                fontWeight: section === n.id ? 700 : 500, fontSize: 13,
                justifyContent: sidebarCollapsed ? "center" : undefined,
                transition: "background 0.15s",
              }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{n.icon}</span>
              {!sidebarCollapsed && <span>{mapLang === "en" ? n.labelEn : n.labelAm}</span>}
            </button>
          ))}
        </nav>

        {/* Sign out */}
        <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={logout}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, cursor: "pointer", width: "100%", border: "none", background: "transparent", color: "#ef4444", fontWeight: 600, fontSize: 13, justifyContent: sidebarCollapsed ? "center" : undefined }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>🚪</span>
            {!sidebarCollapsed && <span>{t.signOut}</span>}
          </button>
        </div>

        {!sidebarCollapsed && (
          <div style={{ padding: "6px 14px 12px", color: "#334155", fontSize: 11 }}>KMS v1.0 · 2026</div>
        )}
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>

        {/* ── DRIVER INFO SECTION ── */}
        {section === "info" && (
          <div>
            {/* Welcome banner */}
            <div style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", borderRadius: 16, padding: "22px 28px", marginBottom: 24, color: "#fff" }}>
              <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{t.driverPortal.welcome}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{t.driverPortal.welcomeSub}</div>
            </div>

            {/* Fuel Prices */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "22px 24px", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{t.driverPortal.fuel}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 12 }}>
                {[
                  { type: "Petrol — ቤንዚን", price: "142.41 ETB/L", icon: "🟢", note: "Total, NOC, Libya Oil" },
                  { type: "Diesel — ናፍጣ",  price: "163.09 ETB/L", icon: "🔵", note: "All major stations" },
                ].map(f => (
                  <div key={f.type} style={{ background: "#f8fafc", borderRadius: 12, padding: "16px 18px", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 24 }}>{f.icon}</span>
                      <div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{f.type}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#1e293b" }}>{f.price}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{f.note}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>
                Source: <a href="https://www.metaappz.com/Tools/Ethiopia_Fuel_Price" target="_blank" rel="noreferrer" style={{ color: "#6366f1" }}>metaappz.com</a> · Regulated by Ministry of Trade & EPSE
              </div>
            </div>

            {/* Road Conditions */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "22px 24px", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{t.driverPortal.road}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { area: "Bole Road (Airport → Edna Mall)", status: "Construction", severity: "high",   note: "Lane closures 7 AM–6 PM. Use Cameroon St as alternative." },
                  { area: "Meskel Square Roundabout",        status: "Heavy Traffic", severity: "medium", note: "Peak congestion 5–8 PM. Expect 15–20 min delays." },
                  { area: "Piassa – Arat Kilo",              status: "Road Works",    severity: "medium", note: "Cobblestone repair ongoing. Avoid heavy vehicles." },
                  { area: "CMC Road",                        status: "Clear",         severity: "low",    note: "Normal conditions. Good alternative to Bole Road." },
                  { area: "Gerji – Ayat",                    status: "Flooding Risk", severity: "high",   note: "Heavy rain expected. Avoid low-lying sections after 6 PM." },
                ].map(r => {
                  const c = { high: { bg: "#fef2f2", border: "#fecaca", dot: "#dc2626", text: "#dc2626" }, medium: { bg: "#fffbeb", border: "#fde68a", dot: "#ca8a04", text: "#ca8a04" }, low: { bg: "#f0fdf4", border: "#bbf7d0", dot: "#16a34a", text: "#16a34a" } }[r.severity as "high"|"medium"|"low"];
                  return (
                    <div key={r.area} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", background: c.bg, borderRadius: 10, border: `1px solid ${c.border}` }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.dot, marginTop: 4, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{r.area}</div>
                        <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{r.note}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: c.text, whiteSpace: "nowrap", background: "#fff", borderRadius: 6, padding: "2px 8px", border: `1px solid ${c.border}` }}>{r.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Driver Tips */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "22px 24px", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{t.driverPortal.tips}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                {[
                  { icon: "📱", title: "Keep App Updated",    tip: "Always use the latest driver app version. Enable auto-update in Play Store." },
                  { icon: "⭐", title: "Maintain High Rating", tip: "Greet passengers, keep the car clean, confirm destination. 4.8+ gets priority trips." },
                  { icon: "🕐", title: "Peak Hour Strategy",   tip: "Position near Bole, Kazanchis, CMC during 7–9 AM and 5–8 PM." },
                  { icon: "🔋", title: "Battery Management",   tip: "Keep phone above 30% during shifts. Use a car charger." },
                  { icon: "🚫", title: "Avoid Cancellations",  tip: "More than 3 cancellations/day may cause suspension. Call the passenger first." },
                  { icon: "💬", title: "Communication",        tip: "If you cannot find the passenger, call before cancelling." },
                ].map(tip => (
                  <div key={tip.title} style={{ background: "#f8fafc", borderRadius: 10, padding: "14px 16px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{tip.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "#1e293b", marginBottom: 5 }}>{tip.title}</div>
                    <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{tip.tip}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fare Structure */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "22px 24px", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{t.driverPortal.pricing}</h2>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "#64748b" }}>{t.driverPortal.pricingSubtitle}</p>
              {([
                { type: "Basic",     color: "#6366f1", rows: [["Per KM (Day)","24","24"],["Per KM (Night)","28","28"],["Per MIN (Day)","3","3"],["Per MIN (Night)","3","3"],["Minimum Fare","200","200"],["Base Fare","160","160"],["Commission","5%","7%"]] },
                { type: "Comfort +", color: "#0891b2", rows: [["Per KM (Day)","27","27"],["Per KM (Night)","30","30"],["Per MIN (Day)","3","3"],["Per MIN (Night)","3","3"],["Minimum Fare","250","250"],["Base Fare","180","180"],["Commission","5%","7%"]] },
                { type: "Comfort",   color: "#0284c7", rows: [["Per KM (Day)","26","26"],["Per KM (Night)","29","29"],["Per MIN (Day)","3","3"],["Per MIN (Night)","3","3"],["Minimum Fare","200","200"],["Base Fare","170","170"],["Commission","7%","7%"]] },
                { type: "Mini Bus",  color: "#16a34a", rows: [["Per KM (Day)","38","38"],["Per KM (Night)","42","42"],["Per MIN (Day)","5","5"],["Per MIN (Night)","5","5"],["Minimum Fare","500","500"],["Base Fare","250","250"],["Commission","5%","7%"]] },
                { type: "Lady Bug",  color: "#ec4899", rows: [["Per KM (Day)","24","24"],["Per KM (Night)","28","28"],["Per MIN (Day)","3","3"],["Per MIN (Night)","3","3"],["Minimum Fare","200","200"],["Base Fare","160","160"],["Commission","5%","7%"]] },
                { type: "Parcel",    color: "#ea580c", rows: [["Per KM (Day)","15","19"],["Per KM (Night)","15","22"],["Per MIN (Day)","2","3"],["Per MIN (Night)","2","3"],["Minimum Fare","120","125"],["Base Fare","120","125"],["Commission","7%","7%"]] },
                { type: "Luxury",    color: "#7c3aed", rows: [["Per KM (Day)","15","100"],["Per KM (Night)","15","140"],["Per MIN (Day)","2","30"],["Per MIN (Night)","2","50"],["Minimum Fare","120","1,000"],["Base Fare","120","500"],["Commission","7%","15%"]] },
              ] as { type: string; color: string; rows: string[][] }[]).map(v => (
                <div key={v.type} style={{ marginBottom: 16, borderRadius: 10, overflow: "hidden", border: `1px solid ${v.color}30` }}>
                  <div style={{ background: v.color, padding: "8px 14px" }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>{v.type}</span>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
                    <thead>
                      <tr style={{ background: `${v.color}10` }}>
                        <th style={{ padding: "7px 12px", textAlign: "left",  fontSize: 11, fontWeight: 700, color: v.color, borderBottom: `1px solid ${v.color}20` }}>{t.driverPortal.rate}</th>
                        <th style={{ padding: "7px 12px", textAlign: "right", fontSize: 11, fontWeight: 700, color: v.color, borderBottom: `1px solid ${v.color}20` }}>{t.driverPortal.retail}</th>
                        <th style={{ padding: "7px 12px", textAlign: "right", fontSize: 11, fontWeight: 700, color: v.color, borderBottom: `1px solid ${v.color}20` }}>{t.driverPortal.corporate}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {v.rows.map(([label, retail, corp], i) => (
                        <tr key={label} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "6px 12px", fontSize: 12, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>{label}</td>
                          <td style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, color: "#1e293b", textAlign: "right", borderBottom: "1px solid #f1f5f9" }}>{retail}</td>
                          <td style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, color: label === "Commission" && corp !== retail ? "#dc2626" : "#1e293b", textAlign: "right", borderBottom: "1px solid #f1f5f9" }}>{corp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* Support Contacts */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "22px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{t.driverPortal.contacts}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {[
                  { icon: "📞", label: "24/7 Customer Support", value: "7933",                          sub: "+251 11 557 1407",       color: "#16a34a" },
                  { icon: "✉️", label: "Email Support",          value: "info.ethiopia@little.africa",  sub: "Response within 24 hours", color: "#2563eb" },
                  { icon: "🚨", label: "Emergency (Police)",     value: "911",                          sub: "National emergency line",  color: "#dc2626" },
                  { icon: "🏛️", label: "Headquarters",           value: "Bitweded Bahiru Abreham Tower", sub: "Bole Road, Addis Ababa",  color: "#7c3aed" },
                ].map(c => (
                  <div key={c.label} style={{ background: "#f8fafc", borderRadius: 10, padding: "14px 16px", border: "1px solid #e2e8f0", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 3 }}>{c.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: c.color, marginBottom: 2, wordBreak: "break-word" }}>{c.value}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── INTELLIGENCE MAP SECTION ── */}
        {section === "map" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
                🧠 {mapLang === "en" ? "Intelligence Map" : "የመረጃ ካርታ"}
              </h1>
              <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>
                {mapLang === "en" ? "Driver mode: read-only intelligence view." : "የሹፌር ሁነታ: የማንበብ ብቻ የመረጃ እይታ።"}
              </p>
            </div>
            <DriverMapWrapper />
          </div>
        )}

      </main>
    </div>
  );
}
