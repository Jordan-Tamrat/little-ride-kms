export default function DriverSupportPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Driver Support & Info</h1>
        <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>Up-to-date information and resources for Little Ride Ethiopia drivers</p>
      </div>

      {/* Pricing */}
      <div className="section-card">
        <h2 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 8 }}>💰 Pricing Information</h2>
        <p style={{ margin: "0 0 20px", fontSize: 13, color: "#64748b" }}>All fares in ETB. Retail = standard app fare · Corporate = business account fare.</p>

        {/* Pricing table component */}
        {([
          {
            type: "Basic", color: "#6366f1",
            rows: [
              ["Per KM (Day)", "24", "24"],
              ["Per KM (Night)", "28", "28"],
              ["Per MIN (Day)", "3", "3"],
              ["Per MIN (Night)", "3", "3"],
              ["Minimum Fare", "200", "200"],
              ["Base Fare", "160", "160"],
              ["Service Charge", "—", "—"],
              ["Commission", "5%", "7%"],
            ],
          },
          {
            type: "Comfort +", color: "#0891b2",
            rows: [
              ["Per KM (Day)", "27", "27"],
              ["Per KM (Night)", "30", "30"],
              ["Per MIN (Day)", "3", "3"],
              ["Per MIN (Night)", "3", "3"],
              ["Minimum Fare", "250", "250"],
              ["Base Fare", "180", "180"],
              ["Service Charge", "—", "—"],
              ["Commission", "5%", "7%"],
            ],
          },
          {
            type: "Comfort", color: "#0284c7",
            rows: [
              ["Per KM (Day)", "26", "26"],
              ["Per KM (Night)", "29", "29"],
              ["Per MIN (Day)", "3", "3"],
              ["Per MIN (Night)", "3", "3"],
              ["Minimum Fare", "200", "200"],
              ["Base Fare", "170", "170"],
              ["Service Charge", "—", "—"],
              ["Commission", "7%", "7%"],
            ],
          },
          {
            type: "Mini Bus", color: "#16a34a",
            rows: [
              ["Per KM (Day)", "38", "38"],
              ["Per KM (Night)", "42", "42"],
              ["Per MIN (Day)", "5", "5"],
              ["Per MIN (Night)", "5", "5"],
              ["Minimum Fare", "500", "500"],
              ["Base Fare", "250", "250"],
              ["Service Charge", "—", "—"],
              ["Commission", "5%", "7%"],
            ],
          },
          {
            type: "Lady Bug", color: "#ec4899",
            rows: [
              ["Per KM (Day)", "24", "24"],
              ["Per KM (Night)", "28", "28"],
              ["Per MIN (Day)", "3", "3"],
              ["Per MIN (Night)", "3", "3"],
              ["Minimum Fare", "200", "200"],
              ["Base Fare", "160", "160"],
              ["Service Charge", "—", "—"],
              ["Commission", "5%", "7%"],
            ],
          },
          {
            type: "Parcel", color: "#ea580c",
            rows: [
              ["Per KM (Day)", "15", "19"],
              ["Per KM (Night)", "15", "22"],
              ["Per MIN (Day)", "2", "3"],
              ["Per MIN (Night)", "2", "3"],
              ["Minimum Fare", "120", "125"],
              ["Base Fare", "120", "125"],
              ["Service Charge", "—", "—"],
              ["Commission", "7%", "7%"],
            ],
          },
          {
            type: "Luxury", color: "#7c3aed",
            rows: [
              ["Per KM (Day)", "15", "100"],
              ["Per KM (Night)", "15", "140"],
              ["Per MIN (Day)", "2", "30"],
              ["Per MIN (Night)", "2", "50"],
              ["Minimum Fare", "120", "1,000"],
              ["Base Fare", "120", "500"],
              ["Service Charge", "—", "—"],
              ["Commission", "7%", "15%"],
            ],
          },
        ] as { type: string; color: string; rows: string[][] }[]).map(vehicle => (
          <div key={vehicle.type} style={{ marginBottom: 20, borderRadius: 12, overflow: "hidden", border: `1px solid ${vehicle.color}30`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            {/* Vehicle header */}
            <div style={{ background: vehicle.color, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{vehicle.type}</span>
            </div>
            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
              <thead>
                <tr style={{ background: `${vehicle.color}10` }}>
                  <th style={{ padding: "8px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: vehicle.color, width: "50%", borderBottom: `1px solid ${vehicle.color}20` }}>Rate</th>
                  <th style={{ padding: "8px 14px", textAlign: "right", fontSize: 12, fontWeight: 700, color: vehicle.color, borderBottom: `1px solid ${vehicle.color}20` }}>Retail (ETB)</th>
                  <th style={{ padding: "8px 14px", textAlign: "right", fontSize: 12, fontWeight: 700, color: vehicle.color, borderBottom: `1px solid ${vehicle.color}20` }}>Corporate (ETB)</th>
                </tr>
              </thead>
              <tbody>
                {vehicle.rows.map(([label, retail, corp], i) => (
                  <tr key={label} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "7px 14px", fontSize: 13, color: "#475569", borderBottom: "1px solid #f1f5f9" }}>{label}</td>
                    <td style={{ padding: "7px 14px", fontSize: 13, fontWeight: 600, color: "#1e293b", textAlign: "right", borderBottom: "1px solid #f1f5f9" }}>{retail}</td>
                    <td style={{ padding: "7px 14px", fontSize: 13, fontWeight: 600, color: label === "Commission" && corp !== retail ? "#dc2626" : "#1e293b", textAlign: "right", borderBottom: "1px solid #f1f5f9" }}>{corp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      </div>

      {/* Fuel Updates */}
      <div className="section-card">
        <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 8 }}>
          ⛽ Fuel Updates
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 14 }}>
          {[
            { type: "Petrol — ቤንዚን", price: "142.41 ETB/L", icon: "🟢" },
            { type: "Diesel — ናፍጣ", price: "163.09 ETB/L", icon: "🔵" },
          ].map(f => (
            <div key={f.type} style={{ background: "#f8fafc", borderRadius: 10, padding: "18px 20px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 28 }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{f.type}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#1e293b" }}>{f.price}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>
          Source: <a href="https://www.metaappz.com/Tools/Ethiopia_Fuel_Price" target="_blank" rel="noreferrer" style={{ color: "#3b82f6" }}>metaappz.com — Ethiopia Fuel Price</a> · Regulated by Ministry of Trade & EPSE.
        </p>
      </div>

      {/* Road Conditions */}
      <div className="section-card">
        <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 8 }}>
          🛣️ Road Conditions & Alerts
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { area: "Bole Road (Airport to Edna Mall)", status: "Construction", severity: "high", note: "Lane closures 7 AM–6 PM. Use Cameroon St as alternative." },
            { area: "Meskel Square Roundabout", status: "Heavy Traffic", severity: "medium", note: "Peak congestion 5–8 PM. Expect 15–20 min delays." },
            { area: "Piassa – Arat Kilo", status: "Road Works", severity: "medium", note: "Cobblestone repair ongoing. Avoid heavy vehicles." },
            { area: "CMC Road", status: "Clear", severity: "low", note: "Normal conditions. Good alternative to Bole Road." },
            { area: "Gerji – Ayat", status: "Flooding Risk", severity: "high", note: "Heavy rain expected. Avoid low-lying sections after 6 PM." },
          ].map(r => (
            <div key={r.area} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: 18, marginTop: 1 }}>{r.severity === "high" ? "🔴" : r.severity === "medium" ? "🟡" : "🟢"}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{r.area}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{r.note}</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: r.severity === "high" ? "#dc2626" : r.severity === "medium" ? "#ca8a04" : "#16a34a", whiteSpace: "nowrap" }}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Driver Tips */}
      <div className="section-card">
        <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 8 }}>
          💡 Driver Tips & Best Practices
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
          {[
            { icon: "📱", title: "Keep App Updated", tip: "Always use the latest version of the driver app. Updates include GPS improvements and bug fixes. Enable auto-update in Play Store." },
            { icon: "🔋", title: "Battery Management", tip: "Keep your phone charged above 30% during shifts. A dead phone means missed trips. Consider a car charger or power bank." },
            { icon: "⭐", title: "Maintain High Rating", tip: "Greet passengers politely, keep the car clean, and confirm the destination. Drivers with 4.8+ ratings get priority trip assignments." },
            { icon: "🕐", title: "Peak Hour Strategy", tip: "Position near Bole, Kazanchis, and CMC during morning (7–9 AM) and evening (5–8 PM) peaks for maximum earnings." },
            { icon: "🚫", title: "Cancellation Policy", tip: "Avoid cancellations after accepting a trip. More than 3 cancellations per day may result in temporary account suspension." },
            { icon: "💬", title: "Communication", tip: "If you cannot find the passenger, call them before cancelling. Most issues resolve with a quick phone call." },
          ].map(t => (
            <div key={t.title} style={{ background: "#f8fafc", borderRadius: 10, padding: "14px 16px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#1e293b", marginBottom: 6 }}>{t.title}</div>
              <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>{t.tip}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="section-card">
        <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 8 }}>
          📞 Emergency & Support Contacts
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          {[
            { label: "24/7 Customer Support", value: "7933", sub: "+251 11 557 1407", icon: "📞", color: "#16a34a" },
            { label: "Email Support", value: "info.ethiopia@little.africa", sub: "Response within 24 hours", icon: "✉️", color: "#2563eb" },
            { label: "Emergency (Police)", value: "911", sub: "National emergency line", icon: "🚨", color: "#dc2626" },
            { label: "Headquarters", value: "Bitweded Bahiru Abreham Tower", sub: "Bole Road, Addis Ababa", icon: "🏛️", color: "#7c3aed" },
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
  );
}
