"use client";
import { useState } from "react";
import { useT } from "../lang-context";

const GLOSSARY = [
  { en: "Trip Adjustment", am: "ጉዞ ማስተካከያ", category: "Operations", phonetic: "Guzo Mastekakiya" },
  { en: "Payment Failed", am: "ክፍያ አልተሳካም", category: "Finance", phonetic: "Kifiya Altesaakam" },
  { en: "Registration Issue", am: "የምዝገባ ችግር", category: "Operations", phonetic: "Ye'mizgeba Chigir" },
  { en: "GPS Not Working", am: "ጂፒኤስ አይሰራም", category: "Technical", phonetic: "GPS Ayiseram" },
  { en: "Driver Not Found", am: "ሹፌር አልተገኘም", category: "Support", phonetic: "Shufer Altegenyem" },
  { en: "Refund Request", am: "ገንዘብ መመለስ ጥያቄ", category: "Finance", phonetic: "Genzeb Memeles Tiyaqe" },
  { en: "Trip Cancelled", am: "ጉዞ ተሰርዟል", category: "Operations", phonetic: "Guzo Teserzoal" },
  { en: "App Not Loading", am: "አፕሊኬሽን አይከፈትም", category: "Technical", phonetic: "Application Ayikefetim" },
  { en: "Customer Complaint", am: "የደንበኛ ቅሬታ", category: "Support", phonetic: "Ye'denbegna Kireta" },
  { en: "Surge Pricing", am: "ከፍተኛ ዋጋ ጊዜ", category: "Finance", phonetic: "Keftegna Waga Gize" },
  { en: "Vehicle Inspection", am: "የተሽከርካሪ ምርመራ", category: "Operations", phonetic: "Ye'teshkerkari Mirmera" },
  { en: "Account Suspended", am: "መለያ ታግዷል", category: "Support", phonetic: "Meliya Tagdoal" },
  { en: "Driver Rating", am: "የሹፌር ደረጃ", category: "Operations", phonetic: "Ye'shufer Dereja" },
  { en: "Pickup Location", am: "መነሻ ቦታ", category: "Operations", phonetic: "Mensha Bota" },
  { en: "Drop-off Location", am: "መድረሻ ቦታ", category: "Operations", phonetic: "Medresha Bota" },
  { en: "Trip Completed", am: "ጉዞ ተጠናቋል", category: "Operations", phonetic: "Guzo Tetenakoal" },
  { en: "Insurance Document", am: "የኢንሹራንስ ሰነድ", category: "Operations", phonetic: "Ye'insurance Sened" },
  { en: "Weekly Settlement", am: "ሳምንታዊ ክፍያ", category: "Finance", phonetic: "Samintawi Kifiya" },
];

const PHRASES = [
  { en: "Hello! How can I help you?", am: "ሰላም! እንዴት ልረዳዎ?", context: "Greeting" },
  { en: "I understand your frustration.", am: "ብስጭትዎን ተረድቻለሁ።", context: "Empathy" },
  { en: "Please provide your Trip ID.", am: "እባክዎ የጉዞ መለያ ቁጥርዎን ያቅርቡ።", context: "Information Request" },
  { en: "Your refund will be processed within 3 business days.", am: "ገንዘብዎ በ3 የሥራ ቀናት ውስጥ ይመለሳል።", context: "Finance" },
  { en: "Please restart the app and try again.", am: "እባክዎ አፕሊኬሽኑን ዘግተው እንደገና ይክፈቱ።", context: "Technical" },
  { en: "Your issue has been escalated to our team.", am: "ጉዳይዎ ለቡድናችን ተላልፏል።", context: "Escalation" },
  { en: "Thank you for your patience.", am: "ለትዕግስትዎ እናመሰግናለን።", context: "Closing" },
  { en: "Is there anything else I can help you with?", am: "ሌላ ልረዳዎ የሚችለው ነገር አለ?", context: "Closing" },
];

const CATEGORIES = ["All", "Operations", "Finance", "Technical", "Support"];

export default function MultilingualPage() {
  const { t } = useT();
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = GLOSSARY.filter(g => {
    const matchCat = catFilter === "All" || g.category === catFilter;
    const matchSearch = g.en.toLowerCase().includes(search.toLowerCase()) || g.am.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#0f172a" }}>{t.multilingual.title}</h1>
        <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>{t.multilingual.subtitle}</p>
      </div>

      {/* Info Banner */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 18px", marginBottom: 24, fontSize: 13, color: "#166534" }}>
        {t.multilingual.banner}
      </div>

      {/* Common Phrases */}
      <div className="section-card" style={{ marginBottom: 24 }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{t.multilingual.phrases}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PHRASES.map((p, i) => (
            <div key={i} style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 16px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 6, fontWeight: 600, textTransform: "uppercase" }}>{p.context}</div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div className="lang-en" style={{ flex: 1, minWidth: 200 }}>🇬🇧 {p.en}</div>
                <span className="lang-arrow">→</span>
                <div className="lang-am" style={{ flex: 1, minWidth: 200 }}>🇪🇹 {p.am}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glossary */}
      <div className="section-card">
        <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{t.multilingual.glossary}</h2>

        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <input
            placeholder={t.multilingual.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 220 }}
          />
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={{
              padding: "6px 14px", borderRadius: 999, border: "1px solid #e2e8f0", fontSize: 12, cursor: "pointer",
              background: catFilter === c ? "#fbbf24" : "#fff", color: catFilter === c ? "#78350f" : "#475569", fontWeight: catFilter === c ? 600 : 400,
            }}>{c}</button>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>{t.multilingual.colEnglish}</th>
                <th>{t.multilingual.colAmharic}</th>
                <th>{t.multilingual.colPhonetic}</th>
                <th>{t.multilingual.colCategory}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500, color: "#1d4ed8" }}>{g.en}</td>
                  <td style={{ fontWeight: 600, fontSize: 14, color: "#92400e" }}>{g.am}</td>
                  <td style={{ color: "#64748b", fontStyle: "italic" }}>{g.phonetic}</td>
                  <td>
                    <span style={{ background: "#f1f5f9", color: "#475569", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>{g.category}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: "center", color: "#94a3b8", padding: 24 }}>{t.multilingual.noTerms}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
