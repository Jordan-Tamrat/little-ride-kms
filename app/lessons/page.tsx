"use client";
import { useState, useEffect } from "react";
import { useT } from "../lang-context";

const CATEGORY_COLORS: Record<string, { bg: string; color: string; icon: string }> = {
  "Customer Relations": { bg: "#fdf4ff", color: "#9333ea", icon: "💬" },
  "Technical":          { bg: "#eff6ff", color: "#2563eb", icon: "⚙️" },
  "Finance":            { bg: "#f0fdf4", color: "#16a34a", icon: "💰" },
  "Operations":         { bg: "#fff7ed", color: "#ea580c", icon: "🚗" },
};

interface Article {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  tags: string[];
  content: string;
}

const SEED_ARTICLES: Article[] = [
  {
    id: 1,
    title: "Handling Difficult Customers",
    category: "Customer Relations",
    author: "Selam Tadesse",
    date: "2026-01-10",
    tags: ["communication", "de-escalation", "customer"],
    content: `SUMMARY
When a customer is upset, acknowledge their frustration before offering solutions. In Ethiopian culture, showing respect and patience is especially important.

STEPS
1. Listen fully without interrupting — let the customer express their concern completely.
2. Use empathetic language: "I understand this has been frustrating for you."
3. Avoid defensive responses. Never say "that's not our fault."
4. Offer a concrete next step within 2 minutes of the conversation starting.
5. If the customer escalates, calmly say: "I want to make sure this is resolved for you. Let me involve my supervisor."
6. Always close with a confirmation: "Is there anything else I can help you with today?"

KEY INSIGHT
During the Timkat holiday surge, agents who explained the surge policy proactively before the customer complained had 80% fewer escalations than those who waited for complaints.`,
  },
  {
    id: 2,
    title: "GPS Troubleshooting Tips",
    category: "Technical",
    author: "Yonas Bekele",
    date: "2026-01-18",
    tags: ["GPS", "technical", "driver app"],
    content: `SUMMARY
GPS issues are the second most common support ticket. Most can be resolved in under 5 minutes with the right steps.

COMMON CAUSES
- Background app refresh disabled on iOS/Android
- Poor signal in underground parking or dense buildings (e.g., Bole area)
- Outdated app version
- Device location set to "Battery Saving" mode instead of "High Accuracy"

STEPS
1. Ask driver/customer to check location permission: Settings → App → Location → "Always" or "While Using"
2. Switch device location mode to "High Accuracy" (GPS + Wi-Fi + Mobile)
3. Force close the app and reopen
4. If issue persists, ask them to toggle Airplane Mode on/off to reset network
5. Check app version — if outdated, prompt update from Play Store / App Store

KEY INSIGHT
Adding an in-app GPS health check indicator reduced GPS-related calls by 35% in Q1 2026. Known weak GPS hotspots: Merkato, Piassa underground, Bole International Airport parking.`,
  },
  {
    id: 3,
    title: "Payment Dispute Resolution",
    category: "Finance",
    author: "Hiwot Girma",
    date: "2026-02-01",
    tags: ["payment", "refund", "Telebirr", "CBE Birr"],
    content: `SUMMARY
Payment disputes require careful documentation and coordination with mobile money providers.

COMMON CAUSES
- Double charge: Customer charged twice for one trip
- Failed transaction: Money deducted but trip not confirmed
- Driver settlement delay: Driver not receiving weekly payout

STEPS
1. Collect transaction ID from customer (Telebirr, CBE Birr, or bank reference)
2. Log in the Issues Database with status "Pending"
3. Contact the relevant payment provider's business support line
4. Expected resolution time: 24–72 hours for mobile money, up to 5 business days for bank transfers
5. Notify customer via Telegram or SMS once resolved
6. Update issue status to "Resolved" with resolution notes

KEY INSIGHT
Keeping a shared Google Sheet of pending refunds caused duplicates. Centralizing in this KMS eliminated double-processing entirely. Never promise a refund timeline you cannot guarantee — always say "within 3 business days."`,
  },
  {
    id: 4,
    title: "Onboarding New Drivers Efficiently",
    category: "Operations",
    author: "Dawit Alemu",
    date: "2026-02-05",
    tags: ["driver", "onboarding", "registration"],
    content: `SUMMARY
Driver onboarding is a critical touchpoint. A smooth process leads to faster activation and better driver retention.

COMMON CAUSES
- Expired insurance: Advise driver to renew at any licensed insurer
- License issues: Direct to Addis Ababa Transport Authority, Kazanchis branch
- Vehicle age: Vehicles older than 10 years require additional inspection

STEPS
1. Document collection and verification (Day 1)
2. Background check submission (Day 1–2)
3. App installation and training session (Day 3)
4. Test ride with supervisor (Day 3)
5. Account activation (Day 4)

KEY INSIGHT
Providing a printed checklist to walk-in applicants reduced incomplete applications by 60%. Required documents: valid driver's license, vehicle registration, insurance, national ID, utility bill, and vehicle inspection certificate.`,
  },
  {
    id: 5,
    title: "Communication Techniques for Support Agents",
    category: "Customer Relations",
    author: "Selam Tadesse",
    date: "2026-02-08",
    tags: ["communication", "Amharic", "professionalism"],
    content: `SUMMARY
Effective communication is the foundation of good support. Little Ride serves customers who speak Amharic, Oromo, and English — agents must adapt accordingly.

STEPS
1. Match the customer's language — if they write in Amharic, respond in Amharic
2. Use simple, clear language — avoid technical jargon
3. Be concise on Telegram — customers don't read long messages
4. Use numbered lists for step-by-step instructions
5. Always confirm understanding: "Does that make sense?" / "ገባዎ?"

COMMON CAUSES
- Robotic or scripted tone reduces trust
- English-only responses alienate Amharic-speaking customers
- Multiple short messages feel unprofessional — combine into one

KEY INSIGHT
Agents who used Amharic greetings ("ሰላም! እንዴት ልረዳዎ?") had significantly higher customer satisfaction scores. Respond within 5 minutes during business hours (8 AM–8 PM).`,
  },
  {
    id: 6,
    title: "Managing Surge Pricing Complaints",
    category: "Customer Relations",
    author: "Selam Tadesse",
    date: "2026-03-15",
    tags: ["surge", "pricing", "holiday", "complaint"],
    content: `SUMMARY
Surge pricing complaints spike during Ethiopian holidays (Timkat, Enkutatash, Meskel) and peak hours (7–9 AM, 5–8 PM).

STEPS
1. Acknowledge: "I understand the fare was higher than expected."
2. Explain: "During peak hours, fares increase to ensure more drivers are available."
3. Offer: If surge was unusually high (>2x) and customer was uninformed, offer a 15–20 ETB credit
4. Document: Log in Issues Database as "Trip Adjustment" with surge context noted

COMMON CAUSES
- Customers unaware of surge policy
- No proactive communication before holiday periods
- App banner not updated to show active surge

KEY INSIGHT
Proactive communication before Timkat 2026 reduced surge-related complaints by 45% compared to the previous year. Post surge notices in Telegram groups 24 hours before known peak periods.`,
  },
];

const STORAGE_KEY = "kms_lessons_v1";

// ── Content renderer — parses structured plain text into rich UI ─────────────
function RichContent({ content }: { content: string }) {
  const sections = content.split(/\n(?=[A-Z ]{3,}$)/m);

  const SECTION_STYLE: Record<string, { bg: string; border: string; titleColor: string; icon: string }> = {
    "SUMMARY":       { bg: "#f8fafc",  border: "#e2e8f0", titleColor: "#1e293b", icon: "📋" },
    "STEPS":         { bg: "#eff6ff",  border: "#bfdbfe", titleColor: "#1d4ed8", icon: "🔢" },
    "COMMON CAUSES": { bg: "#fff7ed",  border: "#fed7aa", titleColor: "#c2410c", icon: "⚠️" },
    "KEY INSIGHT":   { bg: "#fefce8",  border: "#fde047", titleColor: "#854d0e", icon: "💡" },
  };

  const parsed = content.trim().split("\n\n").reduce<{ heading: string; lines: string[] }[]>((acc, block) => {
    const lines = block.trim().split("\n");
    const firstLine = lines[0].trim();
    const isHeading = /^[A-Z][A-Z\s]{2,}$/.test(firstLine);
    if (isHeading) {
      acc.push({ heading: firstLine, lines: lines.slice(1).filter(l => l.trim()) });
    } else {
      if (acc.length === 0) acc.push({ heading: "", lines: [] });
      acc[acc.length - 1].lines.push(...lines.filter(l => l.trim()));
    }
    return acc;
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {parsed.map((section, si) => {
        const style = SECTION_STYLE[section.heading] ?? { bg: "#f8fafc", border: "#e2e8f0", titleColor: "#475569", icon: "📌" };
        return (
          <div key={si} style={{ background: style.bg, border: `1px solid ${style.border}`, borderRadius: 10, padding: "14px 18px" }}>
            {section.heading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 16 }}>{style.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: style.titleColor, textTransform: "uppercase", letterSpacing: "0.06em" }}>{section.heading}</span>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {section.lines.map((line, li) => {
                const isNumbered = /^\d+\./.test(line);
                const isBullet = line.startsWith("- ");
                const text = isBullet ? line.slice(2) : line;
                return (
                  <div key={li} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    {isNumbered ? (
                      <>
                        <span style={{ background: style.titleColor, color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                          {line.match(/^(\d+)/)?.[1]}
                        </span>
                        <span style={{ fontSize: 13, color: "#334155", lineHeight: 1.65 }}>{line.replace(/^\d+\.\s*/, "")}</span>
                      </>
                    ) : isBullet ? (
                      <>
                        <span style={{ color: style.titleColor, fontSize: 16, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>•</span>
                        <span style={{ fontSize: 13, color: "#334155", lineHeight: 1.65 }}>{text}</span>
                      </>
                    ) : (
                      <span style={{ fontSize: 13, color: "#334155", lineHeight: 1.65 }}>{line}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Add Lesson Modal ─────────────────────────────────────────────────────────
const CATEGORIES = ["Customer Relations", "Technical", "Finance", "Operations"];

function AddLessonModal({ onSave, onClose }: {
  onSave: (a: Article) => void;
  onClose: () => void;
}) {
  const { t } = useT();
  const [form, setForm] = useState({
    title: "", category: "Customer Relations", author: "", tags: "", content: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      id: Date.now(),
      title: form.title,
      category: form.category,
      author: form.author,
      date: new Date().toISOString().slice(0, 10),
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      content: form.content,
    });
  }

  const inputStyle: React.CSSProperties = {
    padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
    fontSize: 13, width: "100%", boxSizing: "border-box", fontFamily: "inherit",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        {/* Header */}
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#0f172a" }}>{t.lessons.modalTitle}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{t.lessons.modalSubtitle}</div>
          </div>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 18, color: "#64748b" }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>{t.lessons.formTitle}</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g. How to Handle Duplicate Payments" style={inputStyle} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* Category */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>{t.lessons.formCategory}</label>
              <select required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            {/* Author */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>{t.lessons.formAuthor}</label>
              <input required value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                placeholder="e.g. Selam Tadesse" style={inputStyle} />
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>{t.lessons.formTags} <span style={{ color: "#94a3b8", fontWeight: 400 }}>{t.lessons.formTagsHint}</span></label>
            <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              placeholder="e.g. payment, refund, Telebirr" style={inputStyle} />
          </div>

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>{t.lessons.formContent}</label>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#64748b", marginBottom: 6, lineHeight: 1.7 }}>
              {t.lessons.formHint}
              <strong>SUMMARY</strong> · <strong>STEPS</strong> · <strong>COMMON CAUSES</strong> · <strong>KEY INSIGHT</strong><br />
              Use <code>1. 2. 3.</code> for numbered steps and <code>-</code> for bullet points.
            </div>
            <textarea required value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              rows={10} placeholder={`SUMMARY\nBrief overview of what this lesson covers.\n\nSTEPS\n1. First step\n2. Second step\n\nKEY INSIGHT\nThe most important takeaway from this experience.`}
              style={{ ...inputStyle, resize: "vertical" }} />
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 8, borderTop: "1px solid #f1f5f9" }}>
            <button type="button" onClick={onClose}
              style={{ padding: "9px 20px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", color: "#475569", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              {t.lessons.cancel}
            </button>
            <button type="submit"
              style={{ padding: "9px 24px", borderRadius: 8, border: "none", background: "#fbbf24", color: "#78350f", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 2px 8px rgba(251,191,36,0.25)" }}>
              {t.lessons.publish}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function LessonsPage() {
  const { t } = useT();
  const [articles, setArticles] = useState<Article[]>(SEED_ARTICLES);
  const [hydrated, setHydrated] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [catFilter, setCatFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setArticles(JSON.parse(stored) as Article[]);
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  function saveArticles(updated: Article[]) {
    setArticles(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* quota */ }
  }

  function handleAdd(article: Article) {
    saveArticles([article, ...articles]);
    setShowModal(false);
    setExpanded(article.id);
  }

  const categories = ["All", ...Array.from(new Set(articles.map(a => a.category)))];
  const filtered = catFilter === "All" ? articles : articles.filter(a => a.category === catFilter);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#0f172a" }}>{t.lessons.title}</h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>{t.lessons.subtitle}</p>
        </div>
        <button onClick={() => setShowModal(true)}
          style={{ background: "#fbbf24", color: "#78350f", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 2px 8px rgba(251,191,36,0.3)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 16 }}>＋</span> {t.lessons.addLesson}
        </button>
      </div>

      {/* Stats bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {Object.entries(CATEGORY_COLORS).map(([cat, style]) => {
          const count = articles.filter(a => a.category === cat).length;
          return (
            <div key={cat} style={{ background: style.bg, border: `1px solid ${style.color}30`, borderRadius: 10, padding: "8px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>{style.icon}</span>
              <span style={{ fontSize: 13, color: style.color, fontWeight: 600 }}>{count}</span>
              <span style={{ fontSize: 12, color: "#64748b" }}>{cat}</span>
            </div>
          );
        })}
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCatFilter(c)} style={{
            padding: "6px 16px", borderRadius: 999, border: "1px solid #e2e8f0", fontSize: 13, cursor: "pointer",
            background: catFilter === c ? "#fbbf24" : "#fff",
            color: catFilter === c ? "#78350f" : "#475569",
            fontWeight: catFilter === c ? 600 : 400,
          }}>{c} {c !== "All" && `(${articles.filter(a => a.category === c).length})`}</button>
        ))}
      </div>

      {/* Articles */}
      {!hydrated ? (
        <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontSize: 14 }}>{t.lessons.loading}</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontSize: 14 }}>{t.lessons.noLessons}</div>
      ) : filtered.map(article => {
        const catStyle = CATEGORY_COLORS[article.category] ?? { bg: "#f8fafc", color: "#475569", icon: "📌" };
        const isOpen = expanded === article.id;
        return (
          <div key={article.id} style={{
            background: "#fff", borderRadius: 14, border: `1px solid ${isOpen ? catStyle.color + "40" : "#f1f5f9"}`,
            boxShadow: isOpen ? `0 4px 24px ${catStyle.color}18` : "0 1px 4px rgba(0,0,0,0.06)",
            marginBottom: 14, overflow: "hidden", transition: "box-shadow 0.2s, border-color 0.2s",
          }}>
            {/* Card header — always visible */}
            <div onClick={() => setExpanded(isOpen ? null : article.id)}
              style={{ padding: "18px 22px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                {/* Category + meta */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ background: catStyle.bg, color: catStyle.color, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    {catStyle.icon} {article.category}
                  </span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{t.lessons.by} <strong style={{ color: "#64748b" }}>{article.author}</strong></span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>·</span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{article.date}</span>
                </div>
                {/* Title */}
                <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: "#0f172a", lineHeight: 1.4 }}>{article.title}</h3>
                {/* Tags */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {article.tags.map(t => (
                    <span key={t} style={{ background: "#f1f5f9", color: "#64748b", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>#{t}</span>
                  ))}
                </div>
              </div>
              {/* Expand toggle */}
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: isOpen ? catStyle.bg : "#f8fafc",
                border: `1px solid ${isOpen ? catStyle.color + "40" : "#e2e8f0"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: isOpen ? catStyle.color : "#94a3b8", fontSize: 14, flexShrink: 0, transition: "all 0.2s",
              }}>
                {isOpen ? "▲" : "▼"}
              </div>
            </div>

            {/* Expanded content */}
            {isOpen && (
              <div style={{ padding: "0 22px 22px" }}>
                <div style={{ height: 1, background: `linear-gradient(to right, ${catStyle.color}40, transparent)`, marginBottom: 18 }} />
                <RichContent content={article.content} />
              </div>
            )}
          </div>
        );
      })}

      {showModal && <AddLessonModal onSave={handleAdd} onClose={() => setShowModal(false)} />}
    </div>
  );
}
