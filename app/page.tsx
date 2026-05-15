"use client";
import { useState, useEffect } from "react";
import { ISSUES, Issue } from "./data";
import { useT } from "./lang-context";

const STORAGE_KEY = "kms_issues_v1";

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Resolved:  { bg: "#dcfce7", color: "#16a34a" },
  Open:      { bg: "#fef9c3", color: "#ca8a04" },
  Pending:   { bg: "#fee2e2", color: "#dc2626" },
  Escalated: { bg: "#ede9fe", color: "#7c3aed" },
  Closed:    { bg: "#f1f5f9", color: "#475569" },
};

export default function Dashboard() {
  const { t } = useT();
  const [issues, setIssues] = useState<Issue[]>(ISSUES);

  // Read live data from localStorage (same key the issues page writes to)
  useEffect(() => {
    function load() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setIssues(JSON.parse(stored) as Issue[]);
      } catch { /* ignore */ }
    }
    load();

    // Also re-read whenever the user navigates back to this tab or the storage changes
    window.addEventListener("focus", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("focus", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const total     = issues.length;
  const resolved  = issues.filter(i => i.issueStatus === "Resolved").length;
  const open      = issues.filter(i => i.issueStatus === "Open").length;
  const pending   = issues.filter(i => i.issueStatus === "Pending").length;
  const escalated = issues.filter(i => i.issueStatus === "Escalated").length;
  const closed    = issues.filter(i => i.issueStatus === "Closed").length;

  const byType: Record<string, number> = {};
  issues.forEach(i => { byType[i.issueType] = (byType[i.issueType] || 0) + 1; });

  const recentIssues = [...issues]
    .sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }))
    .slice(0, 6);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <img src="/logo.svg" alt="logo" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", background: "#fff" }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{t.dashboard.title}</h1>
            <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>{t.dashboard.subtitle}</p>
          </div>
        </div>
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 18px", marginTop: 12, fontSize: 13, color: "#92400e", maxWidth: 720 }}>
          <strong>{t.dashboard.aboutLabel}</strong> {t.dashboard.about}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { label: t.dashboard.totalIssues, value: total,     color: "#3b82f6", bg: "#eff6ff" },
          { label: t.dashboard.resolved,    value: resolved,  color: "#16a34a", bg: "#dcfce7" },
          { label: t.dashboard.open,        value: open,      color: "#ca8a04", bg: "#fef9c3" },
          { label: t.dashboard.pending,     value: pending,   color: "#dc2626", bg: "#fee2e2" },
          { label: t.dashboard.escalated,   value: escalated, color: "#7c3aed", bg: "#ede9fe" },
          { label: t.dashboard.closed,      value: closed,    color: "#475569", bg: "#f1f5f9" },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{s.label}</div>
            <div style={{ marginTop: 8, background: s.bg, borderRadius: 6, height: 6 }}>
              <div style={{ background: s.color, borderRadius: 6, height: 6, width: total ? `${(s.value / total) * 100}%` : "0%" }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        {/* Issues by Type */}
        <div className="section-card">
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: "#1e293b" }}>{t.dashboard.issuesByType}</h3>
          {Object.entries(byType)
            .sort((a, b) => b[1] - a[1])
            .map(([type, count]) => (
              <div key={type} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: "#334155" }}>{type}</span>
                  <span style={{ fontWeight: 600, color: "#1e293b" }}>{count}</span>
                </div>
                <div style={{ background: "#f1f5f9", borderRadius: 4, height: 6 }}>
                  <div style={{ background: "#fbbf24", borderRadius: 4, height: 6, width: `${(count / total) * 100}%`, transition: "width 0.4s" }} />
                </div>
              </div>
            ))}
        </div>

        {/* Recent Activity */}
        <div className="section-card">
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: "#1e293b" }}>
            {t.dashboard.recentActivity}
            <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 500, color: "#94a3b8" }}>{t.dashboard.latest} {recentIssues.length} {t.dashboard.issues}</span>
          </h3>
          {recentIssues.map(issue => {
            const ss = STATUS_STYLE[issue.issueStatus] ?? STATUS_STYLE.Open;
            return (
              <div key={issue.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "9px 0", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ flex: 1, minWidth: 0, marginRight: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>#{issue.id} · {issue.issueType}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                    {issue.raisedBy} · {issue.phone} · {issue.firstResponder}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span style={{ background: ss.bg, color: ss.color, borderRadius: 999, padding: "2px 9px", fontWeight: 700, fontSize: 11 }}>
                    {issue.issueStatus}
                  </span>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>{issue.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="section-card">
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: "#1e293b" }}>{t.dashboard.quickAccess}</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { href: "/issues",         label: t.dashboard.links.issues,       color: "#3b82f6" },
            { href: "/lessons",         label: t.dashboard.links.lessons,      color: "#16a34a" },
            { href: "/guidelines",      label: t.dashboard.links.guidelines,   color: "#f59e0b" },
            { href: "/driver-support",  label: t.dashboard.links.driverSupport,color: "#8b5cf6" },
            { href: "/multilingual",    label: t.dashboard.links.multilingual, color: "#ec4899" },
            { href: "/experts",         label: t.dashboard.links.experts,      color: "#0891b2" },
            { href: "/map",             label: t.dashboard.links.map,          color: "#16a34a" },
          ].map(q => (
            <a key={q.href} href={q.href} style={{
              background: "#f8fafc", border: `1px solid ${q.color}30`,
              borderRadius: 8, padding: "10px 18px", fontSize: 13,
              fontWeight: 500, color: q.color, textDecoration: "none",
            }}>
              {q.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
