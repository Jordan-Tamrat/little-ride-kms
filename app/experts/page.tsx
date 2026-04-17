"use client";
import { useState } from "react";

interface Expert {
  id: number;
  name: string;
  role: string;
  department: string;
  expertise: string[];
  bio: string;
  telegram: string;
  phone: string;
  email: string;
  location: string;
  availability: "Available" | "Busy" | "Away";
  yearsExp: number;
  languages: string[];
  resolvedIssues: number;
  avatar: string; // initials
  avatarBg: string;
}

const EXPERTS: Expert[] = [
  {
    id: 1,
    name: "Lidya Kebede",
    role: "Senior Customer Care Lead",
    department: "Customer Care",
    expertise: ["Trip Adjustment", "Escalation Management", "Customer Retention", "Surge Pricing Policy"],
    bio: "Lidya leads the customer care team and is the primary escalation point for complex trip disputes. She has deep knowledge of fare calculation rules and has handled over 3,000 resolved issues. She trains new agents on communication standards.",
    telegram: "@lidya_kms",
    phone: "+251 91 123 4567",
    email: "lidya.k@littleride.et",
    location: "Bole, Addis Ababa",
    availability: "Available",
    yearsExp: 4,
    languages: ["Amharic", "English"],
    resolvedIssues: 3241,
    avatar: "LK",
    avatarBg: "#7c3aed",
  },
  {
    id: 2,
    name: "Selam Tadesse",
    role: "Customer Support Specialist",
    department: "Customer Care",
    expertise: ["Customer Communication", "Amharic Support", "Surge Complaints", "Telegram Support"],
    bio: "Selam is the team's communication expert, known for her empathetic approach and high customer satisfaction scores. She authored the Amharic communication guidelines and handles the most sensitive customer escalations.",
    telegram: "@selam_support",
    phone: "+251 91 234 5678",
    email: "selam.t@littleride.et",
    location: "Kazanchis, Addis Ababa",
    availability: "Available",
    yearsExp: 3,
    languages: ["Amharic", "English", "Oromo"],
    resolvedIssues: 2187,
    avatar: "ST",
    avatarBg: "#ec4899",
  },
  {
    id: 3,
    name: "Yonas Bekele",
    role: "Technical Support Engineer",
    department: "Technical Support",
    expertise: ["GPS Troubleshooting", "App Bugs", "Android/iOS Issues", "Driver App", "Network Diagnostics"],
    bio: "Yonas is the go-to person for all technical issues. He has deep expertise in the driver and rider apps, GPS systems, and mobile network troubleshooting. He maintains the technical knowledge base and escalates critical bugs to the dev team.",
    telegram: "@yonas_tech",
    phone: "+251 91 345 6789",
    email: "yonas.b@littleride.et",
    location: "CMC, Addis Ababa",
    availability: "Busy",
    yearsExp: 5,
    languages: ["Amharic", "English"],
    resolvedIssues: 1893,
    avatar: "YB",
    avatarBg: "#2563eb",
  },
  {
    id: 4,
    name: "Hiwot Girma",
    role: "Finance & Payments Specialist",
    department: "Finance",
    expertise: ["Telebirr Disputes", "CBE Birr Refunds", "Driver Settlements", "Payment Reconciliation"],
    bio: "Hiwot manages all payment-related issues including mobile money disputes, driver weekly settlements, and refund processing. She coordinates directly with Telebirr and CBE Birr business support teams and has reduced refund processing time by 40%.",
    telegram: "@hiwot_finance",
    phone: "+251 91 456 7890",
    email: "hiwot.g@littleride.et",
    location: "Bole, Addis Ababa",
    availability: "Available",
    yearsExp: 4,
    languages: ["Amharic", "English"],
    resolvedIssues: 1456,
    avatar: "HG",
    avatarBg: "#16a34a",
  },
  {
    id: 5,
    name: "Dawit Alemu",
    role: "Operations & Driver Relations Manager",
    department: "Operations",
    expertise: ["Driver Onboarding", "Driver Complaints", "Vehicle Inspection", "Account Suspension", "Supply Management"],
    bio: "Dawit oversees all driver-facing operations including onboarding, compliance, and disciplinary actions. He developed the current driver onboarding checklist that reduced incomplete applications by 60%. He is the final decision-maker on driver suspensions.",
    telegram: "@dawit_ops",
    phone: "+251 91 567 8901",
    email: "dawit.a@littleride.et",
    location: "Megenagna, Addis Ababa",
    availability: "Available",
    yearsExp: 6,
    languages: ["Amharic", "English"],
    resolvedIssues: 987,
    avatar: "DA",
    avatarBg: "#ea580c",
  },
  {
    id: 6,
    name: "Tigist Haile",
    role: "Technical Support Specialist",
    department: "Technical Support",
    expertise: ["iOS Issues", "Push Notifications", "App Crashes", "APNs & FCM", "QA Testing"],
    bio: "Tigist specializes in iOS and notification system issues. She identified and resolved the APNs certificate expiry that affected thousands of drivers in early 2026. She works closely with the dev team on bug reproduction and QA validation.",
    telegram: "@tigist_tech",
    phone: "+251 91 678 9012",
    email: "tigist.h@littleride.et",
    location: "Gerji, Addis Ababa",
    availability: "Available",
    yearsExp: 3,
    languages: ["Amharic", "English"],
    resolvedIssues: 1102,
    avatar: "TH",
    avatarBg: "#0891b2",
  },
  {
    id: 7,
    name: "Eyerus Getachew",
    role: "Call Center Agent",
    department: "Customer Care",
    expertise: ["Inbound Calls", "Password Reset", "End Code Issues", "Driver Registration", "First Response"],
    bio: "Eyerus handles the highest volume of inbound calls on the team. She is the first point of contact for most driver issues including password resets, end code problems, and registration queries. Known for fast resolution times.",
    telegram: "@eyerus_cc",
    phone: "+251 91 789 0123",
    email: "eyerus.g@littleride.et",
    location: "Piassa, Addis Ababa",
    availability: "Busy",
    yearsExp: 2,
    languages: ["Amharic", "English", "Tigrinya"],
    resolvedIssues: 2654,
    avatar: "EG",
    avatarBg: "#d97706",
  },
  {
    id: 8,
    name: "Kalkidan Bekele",
    role: "Call Center Agent",
    department: "Customer Care",
    expertise: ["Rider Requests", "End Code Issues", "Driver Registration", "Pending Authorization"],
    bio: "Kalkidan handles a wide range of support tickets from both drivers and riders. She is particularly skilled at resolving end code and pending authorization issues quickly. She also assists with driver registration document verification.",
    telegram: "@kalkidan_cc",
    phone: "+251 91 890 1234",
    email: "kalkidan.b@littleride.et",
    location: "Arat Kilo, Addis Ababa",
    availability: "Available",
    yearsExp: 2,
    languages: ["Amharic", "English"],
    resolvedIssues: 1876,
    avatar: "KB",
    avatarBg: "#9333ea",
  },
  {
    id: 9,
    name: "Yoseph Kebede",
    role: "Senior Call Center Agent",
    department: "Customer Care",
    expertise: ["Trip Adjustment", "Manual Fare Calculation", "Driver App Issues", "Portal Support"],
    bio: "Yoseph is the team's expert on manual trip adjustments, especially for drivers without the app. He handles the highest number of trip adjustment tickets and has developed internal shortcuts for fare recalculation that the whole team now uses.",
    telegram: "@yoseph_cc",
    phone: "+251 91 901 2345",
    email: "yoseph.k@littleride.et",
    location: "Bole, Addis Ababa",
    availability: "Available",
    yearsExp: 3,
    languages: ["Amharic", "English"],
    resolvedIssues: 3102,
    avatar: "YK",
    avatarBg: "#0f766e",
  },
  {
    id: 10,
    name: "Beka Mengistu",
    role: "Supply & Compliance Officer",
    department: "Supply",
    expertise: ["Driver Background Checks", "Document Verification", "Compliance", "Vehicle Standards"],
    bio: "Beka manages driver compliance and supply-side operations. He reviews all driver registration escalations, conducts background check coordination with the Ethiopian Federal Police, and ensures vehicle standards are met before account activation.",
    telegram: "@beka_supply",
    phone: "+251 91 012 3456",
    email: "beka.m@littleride.et",
    location: "Kazanchis, Addis Ababa",
    availability: "Away",
    yearsExp: 4,
    languages: ["Amharic", "English"],
    resolvedIssues: 634,
    avatar: "BM",
    avatarBg: "#475569",
  },
];

const DEPT_COLORS: Record<string, { bg: string; color: string }> = {
  "Customer Care":    { bg: "#fdf4ff", color: "#9333ea" },
  "Technical Support":{ bg: "#eff6ff", color: "#2563eb" },
  "Finance":          { bg: "#f0fdf4", color: "#16a34a" },
  "Operations":       { bg: "#fff7ed", color: "#ea580c" },
  "Supply":           { bg: "#f8fafc", color: "#475569" },
};

const AVAIL_STYLE: Record<string, { bg: string; color: string; dot: string }> = {
  Available: { bg: "#f0fdf4", color: "#16a34a", dot: "#16a34a" },
  Busy:      { bg: "#fef9c3", color: "#ca8a04", dot: "#ca8a04" },
  Away:      { bg: "#f1f5f9", color: "#64748b", dot: "#94a3b8" },
};

const DEPARTMENTS = ["All", "Customer Care", "Technical Support", "Finance", "Operations", "Supply"];

export default function ExpertsPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [selected, setSelected] = useState<Expert | null>(null);

  const filtered = EXPERTS.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      e.name.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q) ||
      e.expertise.some(x => x.toLowerCase().includes(q));
    return matchSearch && (deptFilter === "All" || e.department === deptFilter);
  });

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      {/* Left — list */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Expert Locator</h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>Find the right person for any issue — Little Ride Ethiopia team directory</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Total Staff", value: EXPERTS.length, color: "#3b82f6" },
            { label: "Available", value: EXPERTS.filter(e => e.availability === "Available").length, color: "#16a34a" },
            { label: "Busy", value: EXPERTS.filter(e => e.availability === "Busy").length, color: "#ca8a04" },
            { label: "Departments", value: Object.keys(DEPT_COLORS).length, color: "#9333ea" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 10, padding: "14px 16px", border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <input
            placeholder="🔍  Search by name, role, or expertise..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 220, padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }}
          />
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }}>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {filtered.map(expert => {
            const dept = DEPT_COLORS[expert.department] ?? { bg: "#f8fafc", color: "#475569" };
            const avail = AVAIL_STYLE[expert.availability];
            const isSelected = selected?.id === expert.id;
            return (
              <div key={expert.id}
                onClick={() => setSelected(isSelected ? null : expert)}
                style={{
                  background: "#fff", borderRadius: 14, border: `1.5px solid ${isSelected ? dept.color : "#f1f5f9"}`,
                  boxShadow: isSelected ? `0 4px 20px ${dept.color}20` : "0 1px 4px rgba(0,0,0,0.06)",
                  padding: "18px 20px", cursor: "pointer", transition: "all 0.15s",
                }}>
                {/* Avatar + name row */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%", background: expert.avatarBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0,
                  }}>{expert.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 2 }}>{expert.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.4 }}>{expert.role}</div>
                  </div>
                  {/* Availability dot */}
                  <div style={{ display: "flex", alignItems: "center", gap: 5, background: avail.bg, borderRadius: 999, padding: "3px 9px", flexShrink: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: avail.dot }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: avail.color }}>{expert.availability}</span>
                  </div>
                </div>

                {/* Department badge */}
                <div style={{ marginBottom: 12 }}>
                  <span style={{ background: dept.bg, color: dept.color, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>
                    {expert.department}
                  </span>
                </div>

                {/* Expertise tags */}
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                  {expert.expertise.slice(0, 3).map(x => (
                    <span key={x} style={{ background: "#f1f5f9", color: "#475569", borderRadius: 4, padding: "2px 8px", fontSize: 11 }}>{x}</span>
                  ))}
                  {expert.expertise.length > 3 && (
                    <span style={{ background: "#f1f5f9", color: "#94a3b8", borderRadius: 4, padding: "2px 8px", fontSize: 11 }}>+{expert.expertise.length - 3}</span>
                  )}
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: 16, paddingTop: 12, borderTop: "1px solid #f8fafc" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{expert.resolvedIssues.toLocaleString()}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>Resolved</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{expert.yearsExp}y</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>Experience</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{expert.languages.length}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>Languages</div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 48, color: "#94a3b8", fontSize: 14 }}>
              No experts match your search.
            </div>
          )}
        </div>
      </div>

      {/* Right — detail panel */}
      {selected && (() => {
        const dept = DEPT_COLORS[selected.department] ?? { bg: "#f8fafc", color: "#475569" };
        const avail = AVAIL_STYLE[selected.availability];
        return (
          <div style={{
            width: 320, flexShrink: 0, background: "#fff", borderRadius: 16,
            border: `1.5px solid ${dept.color}30`, boxShadow: `0 4px 24px ${dept.color}15`,
            position: "sticky", top: 24, overflow: "hidden",
          }}>
            {/* Colored top banner */}
            <div style={{ background: `linear-gradient(135deg, ${dept.color}22, ${dept.color}08)`, padding: "24px 22px 20px", borderBottom: `1px solid ${dept.color}20` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%", background: selected.avatarBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 800, fontSize: 22, border: "3px solid #fff",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                }}>{selected.avatar}</div>
                <button onClick={() => setSelected(null)}
                  style={{ background: "rgba(255,255,255,0.8)", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 16, color: "#64748b" }}>×</button>
              </div>
              <div style={{ fontWeight: 800, fontSize: 17, color: "#0f172a", marginBottom: 4 }}>{selected.name}</div>
              <div style={{ fontSize: 13, color: "#475569", marginBottom: 10 }}>{selected.role}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ background: dept.bg, color: dept.color, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{selected.department}</span>
                <span style={{ background: avail.bg, color: avail.color, borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: avail.dot, display: "inline-block" }} />
                  {selected.availability}
                </span>
              </div>
            </div>

            <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Bio */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>About</div>
                <p style={{ margin: 0, fontSize: 13, color: "#475569", lineHeight: 1.65 }}>{selected.bio}</p>
              </div>

              {/* Expertise */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Areas of Expertise</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {selected.expertise.map(x => (
                    <span key={x} style={{ background: dept.bg, color: dept.color, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 500 }}>{x}</span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { label: "Issues Resolved", value: selected.resolvedIssues.toLocaleString() },
                  { label: "Years Exp.", value: `${selected.yearsExp} yrs` },
                  { label: "Languages", value: selected.languages.length.toString() },
                ].map(s => (
                  <div key={s.label} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{s.value}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Languages</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {selected.languages.map(l => (
                    <span key={l} style={{ background: "#f1f5f9", color: "#475569", borderRadius: 6, padding: "3px 10px", fontSize: 12 }}>🌐 {l}</span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Contact</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { icon: "💬", label: "Telegram", value: selected.telegram },
                    { icon: "📞", label: "Phone", value: selected.phone },
                    { icon: "✉️", label: "Email", value: selected.email },
                    { icon: "📍", label: "Location", value: selected.location },
                  ].map(c => (
                    <div key={c.label} style={{ display: "flex", gap: 10, alignItems: "center", background: "#f8fafc", borderRadius: 8, padding: "8px 12px" }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{c.icon}</span>
                      <div>
                        <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{c.label}</div>
                        <div style={{ fontSize: 12, color: "#334155", fontWeight: 500 }}>{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
