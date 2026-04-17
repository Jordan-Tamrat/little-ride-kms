"use client";
import { useState, useEffect } from "react";
import {
  ISSUES, ISSUE_TYPES, STATUS_FILTER, VEHICLE_TYPES, DEPARTMENTS, SOURCES, RAISED_BY,
  Issue, IssueStatus, RaisedBy,
} from "../data";

const STORAGE_KEY = "kms_issues_v1";

// Always init with seed data (same on server + client = no hydration mismatch).
// After mount, useEffect overwrites with localStorage if available.
function usePersistedIssues() {
  const [issues, setIssuesState] = useState<Issue[]>(ISSUES);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setIssuesState(JSON.parse(stored) as Issue[]);
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  function setIssues(updater: Issue[] | ((prev: Issue[]) => Issue[])) {
    setIssuesState(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* quota */ }
      return next;
    });
  }

  return [issues, setIssues, hydrated] as const;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Resolved:  { bg: "#dcfce7", color: "#16a34a" },
  Open:      { bg: "#fef9c3", color: "#ca8a04" },
  Pending:   { bg: "#fee2e2", color: "#dc2626" },
  Escalated: { bg: "#ede9fe", color: "#7c3aed" },
  Closed:    { bg: "#f1f5f9", color: "#475569" },
};

const RAISED_STYLE: Record<RaisedBy, { bg: string; color: string }> = {
  Driver: { bg: "#eff6ff", color: "#1d4ed8" },
  Rider:  { bg: "#fdf4ff", color: "#9333ea" },
};

const ALL_STATUSES: IssueStatus[] = ["Open", "Pending", "Resolved", "Escalated", "Closed"];

const EMPTY: Omit<Issue, "id"> = {
  date: new Date().toISOString().slice(0, 10),
  raisedBy: "Driver", phone: "", issueType: "Trip Adjustment",
  vehicleType: "Basic", plateNo: "", tripId: "", firstResponder: "",
  issueStatus: "Open", escalatedTo: "", department: "Customer Care",
  dueDate: "", agentData: "", source: "Call Center", comment: "",
};

// ── Reusable form field ──────────────────────────────────────────────────────
function Field({ label, fieldKey, type, opts, form, setForm }: {
  label: string;
  fieldKey: string;
  type: "text" | "select" | "date" | "textarea";
  opts?: string[];
  form: Record<string, unknown>;
  setForm: (f: Record<string, unknown>) => void;
}) {
  const val = (form[fieldKey] ?? "") as string;
  const set = (v: string) => setForm({ ...form, [fieldKey]: v });
  const base: React.CSSProperties = {
    padding: "7px 10px", borderRadius: 7, border: "1px solid #e2e8f0",
    fontSize: 13, width: "100%", boxSizing: "border-box",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>{label}</label>
      {type === "select" ? (
        <select value={val} onChange={e => set(e.target.value)} style={base}>
          {opts!.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea value={val} onChange={e => set(e.target.value)} rows={3}
          style={{ ...base, resize: "vertical", fontFamily: "inherit" }} />
      ) : (
        <input type={type} value={val} onChange={e => set(e.target.value)} style={base} />
      )}
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────
function IssueModal({ title, subtitle, form, setForm, onSave, onClose, isEdit }: {
  title: string; subtitle: string;
  form: Record<string, unknown>;
  setForm: (f: Record<string, unknown>) => void;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
  isEdit?: boolean;
}) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 700, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        {/* Header */}
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#0f172a" }}>{title}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{subtitle}</div>
          </div>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 18, color: "#64748b" }}>×</button>
        </div>

        <form onSubmit={onSave} style={{ padding: "20px 24px" }}>
          {isEdit && (
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#92400e" }}>
              ✏️ Editing issue <strong>#{form.id as string}</strong> — update any field and save.
            </div>
          )}

          {/* Status pill picker — shown at top only in edit mode */}
          {isEdit && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Issue Status</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ALL_STATUSES.map(s => {
                  const ss = STATUS_STYLE[s];
                  const active = form.issueStatus === s;
                  return (
                    <button key={s} type="button"
                      onClick={() => setForm({ ...form, issueStatus: s })}
                      style={{
                        padding: "6px 18px", borderRadius: 999,
                        border: `2px solid ${active ? ss.color : "#e2e8f0"}`,
                        background: active ? ss.bg : "#fff",
                        color: active ? ss.color : "#94a3b8",
                        fontWeight: active ? 700 : 500, fontSize: 13, cursor: "pointer",
                      }}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Date" fieldKey="date" type="date" form={form} setForm={setForm} />
            <Field label="Raised By" fieldKey="raisedBy" type="select" opts={RAISED_BY} form={form} setForm={setForm} />
            <Field label="Phone Number" fieldKey="phone" type="text" form={form} setForm={setForm} />
            <Field label="Issue Type" fieldKey="issueType" type="select" opts={ISSUE_TYPES.filter(t => t !== "All")} form={form} setForm={setForm} />
            <Field label="Vehicle Type" fieldKey="vehicleType" type="select" opts={VEHICLE_TYPES} form={form} setForm={setForm} />
            <Field label="Plate No." fieldKey="plateNo" type="text" form={form} setForm={setForm} />
            <Field label="Trip ID" fieldKey="tripId" type="text" form={form} setForm={setForm} />
            <Field label="1st Responder" fieldKey="firstResponder" type="text" form={form} setForm={setForm} />
            {!isEdit && <Field label="Issue Status" fieldKey="issueStatus" type="select" opts={ALL_STATUSES} form={form} setForm={setForm} />}
            <Field label="Escalated To" fieldKey="escalatedTo" type="text" form={form} setForm={setForm} />
            <Field label="Department" fieldKey="department" type="select" opts={DEPARTMENTS} form={form} setForm={setForm} />
            <Field label="Due Date" fieldKey="dueDate" type="text" form={form} setForm={setForm} />
            <Field label="Agent Data" fieldKey="agentData" type="text" form={form} setForm={setForm} />
            <Field label="Source" fieldKey="source" type="select" opts={SOURCES} form={form} setForm={setForm} />
          </div>
          <div style={{ marginTop: 14 }}>
            <Field label="Comment / Solution" fieldKey="comment" type="textarea" form={form} setForm={setForm} />
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20, paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
            <button type="button" onClick={onClose}
              style={{ padding: "9px 20px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", color: "#475569", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Cancel
            </button>
            <button type="submit"
              style={{ padding: "9px 24px", borderRadius: 8, border: "none", background: isEdit ? "#3b82f6" : "#fbbf24", color: isEdit ? "#fff" : "#78350f", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              {isEdit ? "Save Changes" : "Save Issue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function IssuesPage() {
  const [issues, setIssues, hydrated] = usePersistedIssues();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState<Record<string, unknown>>(EMPTY as unknown as Record<string, unknown>);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, unknown> | null>(null);

  const filtered = issues.filter(i => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      i.phone.includes(q) || i.tripId.toLowerCase().includes(q) ||
      i.plateNo.toLowerCase().includes(q) || i.firstResponder.toLowerCase().includes(q) ||
      i.comment.toLowerCase().includes(q) || i.issueType.toLowerCase().includes(q) ||
      i.id.includes(q);
    return matchSearch &&
      (typeFilter === "All" || i.issueType === typeFilter) &&
      (statusFilter === "All" || i.issueStatus === statusFilter);
  });

  // Inline status change
  function handleStatusChange(id: string, newStatus: IssueStatus) {
    setIssues(prev => prev.map(i =>
      i.id === id
        ? { ...i, issueStatus: newStatus, dueDate: (newStatus === "Resolved" || newStatus === "Closed") ? "closed" : i.dueDate }
        : i
    ));
  }

  // Open edit — always look up the LIVE issue from state by ID
  function openEdit(id: string) {
    const live = issues.find(i => i.id === id);
    if (!live) return;
    setEditId(id);
    setEditForm({ ...live } as unknown as Record<string, unknown>);
  }

  function handleEditSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editForm) return;
    setIssues(prev => prev.map(i => i.id === editForm.id ? editForm as unknown as Issue : i));
    setEditId(null);
    setEditForm(null);
  }

  function handleNewSave(e: React.FormEvent) {
    e.preventDefault();
    const newId = String(Math.max(...issues.map(i => parseInt(i.id))) + 1);
    setIssues(prev => [{ id: newId, ...(newForm as unknown as Omit<Issue, "id">) }, ...prev]);
    setShowNew(false);
    setNewForm(EMPTY as unknown as Record<string, unknown>);
  }

  const editIssue = editId ? issues.find(i => i.id === editId) : null;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Support Issues Database</h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>Ethiopia Support Dashboard 2026 — click any row to edit · change status inline</p>
        </div>
        <button onClick={() => setShowNew(true)}
          style={{ background: "#fbbf24", color: "#78350f", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 2px 8px rgba(251,191,36,0.3)" }}>
          <span style={{ fontSize: 18 }}>＋</span> Log New Issue
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <input placeholder="🔍  Search ID, phone, plate, trip, keyword..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: 300, padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }} />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }}>
          {ISSUE_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }}>
          {STATUS_FILTER.map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: 13, color: "#64748b", marginLeft: "auto" }}>
          Showing <strong>{filtered.length}</strong> of {issues.length} issues
        </span>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "#64748b", background: "#f1f5f9", borderRadius: 6, padding: "3px 10px" }}>🖱 Click row → Edit all fields</span>
        <span style={{ fontSize: 12, color: "#64748b", background: "#f1f5f9", borderRadius: 6, padding: "3px 10px" }}>⚡ Status dropdown → Change status inline</span>
      </div>

      {/* Table — only rendered after localStorage is loaded */}
      {!hydrated ? (
        <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontSize: 14 }}>Loading issues...</div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #f1f5f9", overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["#","Date","Raised By","Phone","Issue Type","Vehicle Type","Plate No.","Trip ID","1st Responder","Issue Status","Escalated To","Department","Due Date","Agent Data","Source","Comment",""].map((h, i) => (
                  <th key={i} style={{ padding: "9px 10px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={17} style={{ textAlign: "center", color: "#94a3b8", padding: 32 }}>No issues match your filters.</td></tr>
              ) : filtered.map(issue => {
                const ss = STATUS_STYLE[issue.issueStatus] ?? STATUS_STYLE.Open;
                const rs = RAISED_STYLE[issue.raisedBy];
                return (
                  <tr key={issue.id}
                    style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f0f9ff")}
                    onMouseLeave={e => (e.currentTarget.style.background = "")}>
                    <td style={{ padding: "8px 10px", fontWeight: 600, color: "#94a3b8" }} onClick={() => openEdit(issue.id)}>{issue.id}</td>
                    <td style={{ padding: "8px 10px", whiteSpace: "nowrap", color: "#475569" }} onClick={() => openEdit(issue.id)}>{issue.date}</td>
                    <td style={{ padding: "8px 10px" }} onClick={() => openEdit(issue.id)}>
                      <span style={{ background: rs.bg, color: rs.color, borderRadius: 999, padding: "2px 9px", fontWeight: 600, fontSize: 11 }}>{issue.raisedBy}</span>
                    </td>
                    <td style={{ padding: "8px 10px", fontFamily: "monospace", color: "#334155", whiteSpace: "nowrap" }} onClick={() => openEdit(issue.id)}>{issue.phone}</td>
                    <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }} onClick={() => openEdit(issue.id)}>
                      <span style={{ background: "#f1f5f9", color: "#334155", borderRadius: 6, padding: "2px 8px", fontWeight: 500 }}>{issue.issueType}</span>
                    </td>
                    <td style={{ padding: "8px 10px", whiteSpace: "nowrap", color: "#475569" }} onClick={() => openEdit(issue.id)}>{issue.vehicleType}</td>
                    <td style={{ padding: "8px 10px", fontFamily: "monospace", fontSize: 11, color: "#64748b" }} onClick={() => openEdit(issue.id)}>{issue.plateNo || "—"}</td>
                    <td style={{ padding: "8px 10px", fontFamily: "monospace", fontSize: 11, color: "#64748b" }} onClick={() => openEdit(issue.id)}>{issue.tripId || "—"}</td>
                    <td style={{ padding: "8px 10px", whiteSpace: "nowrap", color: "#334155" }} onClick={() => openEdit(issue.id)}>{issue.firstResponder}</td>

                    {/* Inline status dropdown — stopPropagation so it doesn't open edit modal */}
                    <td style={{ padding: "6px 8px" }} onClick={e => e.stopPropagation()}>
                      <select value={issue.issueStatus}
                        onChange={e => handleStatusChange(issue.id, e.target.value as IssueStatus)}
                        style={{
                          background: ss.bg, color: ss.color,
                          border: `1.5px solid ${ss.color}40`,
                          borderRadius: 999, padding: "3px 8px",
                          fontWeight: 700, fontSize: 11, cursor: "pointer",
                          outline: "none", minWidth: 90, textAlign: "center",
                        }}>
                        {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>

                    <td style={{ padding: "8px 10px", whiteSpace: "nowrap", color: "#475569" }} onClick={() => openEdit(issue.id)}>{issue.escalatedTo || "—"}</td>
                    <td style={{ padding: "8px 10px", whiteSpace: "nowrap", color: "#475569" }} onClick={() => openEdit(issue.id)}>{issue.department}</td>
                    <td style={{ padding: "8px 10px", whiteSpace: "nowrap", fontWeight: 500, color: issue.dueDate === "closed" ? "#16a34a" : "#dc2626" }} onClick={() => openEdit(issue.id)}>{issue.dueDate || "—"}</td>
                    <td style={{ padding: "8px 10px", whiteSpace: "nowrap", color: "#475569" }} onClick={() => openEdit(issue.id)}>{issue.agentData}</td>
                    <td style={{ padding: "8px 10px" }} onClick={() => openEdit(issue.id)}>
                      <span style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "2px 8px", fontSize: 11 }}>{issue.source}</span>
                    </td>
                    <td style={{ padding: "8px 10px", maxWidth: 220 }} onClick={() => openEdit(issue.id)}>
                      <span title={issue.comment} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220, color: "#475569" }}>
                        {issue.comment}
                      </span>
                    </td>
                    <td style={{ padding: "8px 8px" }} onClick={e => { e.stopPropagation(); openEdit(issue.id); }}>
                      <button style={{ background: "#eff6ff", border: "none", borderRadius: 6, padding: "4px 10px", color: "#3b82f6", fontWeight: 600, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>
                        ✏️ Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Log New Issue Modal */}
      {showNew && (
        <IssueModal
          title="Log New Issue"
          subtitle="Fill in the details to add a new support issue"
          form={newForm}
          setForm={setNewForm}
          onSave={handleNewSave}
          onClose={() => { setShowNew(false); setNewForm(EMPTY as unknown as Record<string, unknown>); }}
        />
      )}

      {/* Edit Issue Modal */}
      {editId && editForm && editIssue && (
        <IssueModal
          title={`Edit Issue #${editId}`}
          subtitle={`${editIssue.issueType} · ${editIssue.raisedBy} · ${editIssue.date}`}
          form={editForm}
          setForm={setEditForm}
          onSave={handleEditSave}
          onClose={() => { setEditId(null); setEditForm(null); }}
          isEdit
        />
      )}
    </div>
  );
}
