"use client";
import { useState } from "react";
import { useT } from "../lang-context";

const GUIDELINES = [
  {
    id: 1,
    title: "Trip Adjustment Process",
    icon: "🗺️",
    sla: "2 hours",
    slaColor: "#16a34a",
    department: "Customer Care",
    steps: [
      { action: "Receive request", detail: "Via Telegram, phone, or app report from driver or customer." },
      { action: "Collect Trip ID", detail: "Ask the driver or customer for the Trip ID before proceeding." },
      { action: "Review GPS log", detail: "Check the trip log in the admin dashboard to verify the actual route taken." },
      { action: "Compare routes", detail: "Compare actual route vs. optimal route using Google Maps." },
      { action: "Approve adjustment", detail: "If deviation > 20% of optimal distance, approve the fare adjustment." },
      { action: "Calculate new fare", detail: "Formula: (Optimal distance × rate) + base fare." },
      { action: "Process in billing", detail: "Apply the adjusted fare in the billing system." },
      { action: "Notify customer", detail: "Send updated fare and reason via Telegram or SMS." },
      { action: "Log in KMS", detail: "Create or update the issue in the Support Issues Database with status 'Resolved'." },
      { action: "Escalate if disputed", detail: "If customer disputes, escalate to Operations Manager with GPS evidence." },
    ],
    notes: "Adjustments > 50 ETB require supervisor approval. Always document the reason.",
  },
  {
    id: 2,
    title: "Payment Issue Handling",
    icon: "💳",
    sla: "24–72 hours",
    slaColor: "#ca8a04",
    department: "Finance",
    steps: [
      { action: "Collect details", detail: "Get customer name, phone number, and transaction reference ID." },
      { action: "Identify payment method", detail: "Telebirr, CBE Birr, HelloCash, or bank transfer." },
      { action: "Log as Pending", detail: "Create issue in the Support Issues Database with status 'Pending'." },
      { action: "Contact provider", detail: "Reach out to the relevant payment provider's business support line." },
      { action: "Telebirr", detail: "Call 127 or email business@ethiotelecom.et with the transaction ID." },
      { action: "CBE Birr", detail: "Call 8397 or visit nearest CBE branch with the reference number." },
      { action: "Get confirmation", detail: "Obtain written confirmation of refund initiation from the provider." },
      { action: "Update to Resolved", detail: "Change issue status once refund is confirmed by provider." },
      { action: "Notify customer", detail: "Inform customer of expected refund timeline (24–72 hours)." },
      { action: "Follow up", detail: "If refund not received after 72 hours, re-escalate to Finance Manager." },
    ],
    notes: "Never promise a specific refund date. Always say 'within 3 business days' as a safe estimate.",
  },
  {
    id: 3,
    title: "Customer Communication Best Practices",
    icon: "💬",
    sla: "5 min first response",
    slaColor: "#2563eb",
    department: "Customer Care",
    steps: [
      { action: "Respond within 5 min", detail: "All Telegram messages must be answered within 5 minutes during business hours (8 AM–8 PM)." },
      { action: "Greet by name", detail: "If known: 'Hello [Name], how can I help you?' / 'ሰላም [ስም]! እንዴት ልረዳዎ?'" },
      { action: "Match language", detail: "If the customer writes in Amharic, respond in Amharic throughout." },
      { action: "Acknowledge first", detail: "Always acknowledge the issue before jumping to a solution." },
      { action: "Give a clear plan", detail: "Provide a numbered action plan for complex issues." },
      { action: "Set expectations", detail: "Say: 'I will get back to you within 30 minutes.' — and keep that promise." },
      { action: "Always close with next step", detail: "Never end a conversation without a clear next action for the customer." },
      { action: "Satisfaction check", detail: "Close every interaction with: 'Is there anything else I can help you with?'" },
      { action: "Escalate if needed", detail: "If customer is still unsatisfied after 2 resolution attempts, escalate to supervisor." },
      { action: "Log interaction", detail: "Record all significant interactions in the Support Issues Database." },
    ],
    notes: "Tone should be professional but warm. Avoid robotic or scripted-sounding responses.",
  },
  {
    id: 4,
    title: "Driver Account Suspension Protocol",
    icon: "🚫",
    sla: "Decision within 24 hours",
    slaColor: "#dc2626",
    department: "Operations",
    steps: [
      { action: "Receive complaint or flag", detail: "From system alert (low rating, cancellations) or customer/driver complaint." },
      { action: "Review driver history", detail: "Check rating, trip count, and previous complaints in the system." },
      { action: "Contact driver", detail: "Reach out via Telegram or phone to hear their account of events." },
      { action: "Safety-related?", detail: "If accident or harassment: apply immediate temporary suspension pending investigation." },
      { action: "Performance-related?", detail: "If rating < 3.5 or >5 cancellations/day: issue a formal written warning first." },
      { action: "Document evidence", detail: "Collect screenshots, GPS logs, and customer statements." },
      { action: "Manager review", detail: "Operations Manager reviews all evidence and makes the final suspension decision." },
      { action: "Notify driver", detail: "Send written notice via Telegram with reason and suspension duration." },
      { action: "Appeal window", detail: "For permanent suspension: provide a 7-day appeal window." },
      { action: "Log outcome", detail: "Record the full outcome in driver records and the Issues Database." },
    ],
    notes: "All suspensions must be documented. Drivers have the right to appeal within 7 days.",
  },
  {
    id: 5,
    title: "New Driver Onboarding Checklist",
    icon: "✅",
    sla: "4 business days",
    slaColor: "#7c3aed",
    department: "Supply",
    steps: [
      { action: "Receive application", detail: "Walk-in at office or submitted via online form." },
      { action: "Verify documents", detail: "Driver's license, vehicle registration, insurance, national ID — all must be valid." },
      { action: "Background check", detail: "Submit documents for Ethiopian Federal Police clearance." },
      { action: "Vehicle inspection", detail: "Schedule inspection at an authorized garage." },
      { action: "App training", detail: "Upon clearance, schedule a 1–2 hour app training session." },
      { action: "Test ride", detail: "Conduct a supervised test ride with operations staff." },
      { action: "Activate account", detail: "Enable the driver account in the system." },
      { action: "Add to Telegram group", detail: "Add driver to the official Little Ride driver Telegram group." },
      { action: "Provide handbook", detail: "Give printed driver handbook and current pricing guide." },
      { action: "30-day check-in", detail: "Schedule a follow-up call at 30 days to address early challenges." },
    ],
    notes: "Provide applicants with a printed document checklist to reduce incomplete applications by 60%.",
  },
  {
    id: 6,
    title: "Escalation Matrix",
    icon: "📊",
    sla: "Escalate within 30 min",
    slaColor: "#ea580c",
    department: "All Teams",
    steps: [
      { action: "Level 1 — Support Agent", detail: "Standard trip adjustments, GPS issues, basic payment queries, password resets." },
      { action: "Level 2 — Senior Agent", detail: "Complex payment disputes, driver complaints, app bugs, end code issues." },
      { action: "Level 3 — Operations Manager", detail: "Driver suspensions, large refunds (>200 ETB), media or PR issues." },
      { action: "Level 4 — CEO / Director", detail: "Legal matters, major system outages, regulatory issues." },
      { action: "Technical escalation", detail: "Escalate to Tech Lead if not resolved within 1 hour." },
      { action: "Payment escalation", detail: "Escalate to Finance Manager if not resolved within 24 hours." },
      { action: "Document escalation", detail: "Always log the escalation reason and timestamp in the Issues Database." },
      { action: "Notify customer", detail: "Inform the customer when their issue is being escalated." },
      { action: "Give reference number", detail: "Provide the customer with an escalation reference number for tracking." },
      { action: "Follow up", detail: "Check back with the escalated team within 4 hours for a status update." },
    ],
    notes: "When in doubt, escalate. It is better to over-escalate than to leave a customer unresolved.",
  },
];

const DEPT_COLOR: Record<string, string> = {
  "Customer Care": "#9333ea",
  "Finance": "#16a34a",
  "Operations": "#ea580c",
  "Supply": "#475569",
  "All Teams": "#2563eb",
};

export default function GuidelinesPage() {
  const { t } = useT();
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#0f172a" }}>{t.guidelines.title}</h1>
        <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>{t.guidelines.subtitle}</p>
      </div>

      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "12px 18px", marginBottom: 24, fontSize: 13, color: "#1d4ed8" }}>
        {t.guidelines.banner}
      </div>

      {GUIDELINES.map(g => {
        const isOpen = expanded === g.id;
        const deptColor = DEPT_COLOR[g.department] ?? "#475569";
        return (
          <div key={g.id} style={{
            background: "#fff", borderRadius: 14,
            border: `1px solid ${isOpen ? deptColor + "30" : "#f1f5f9"}`,
            boxShadow: isOpen ? `0 4px 20px ${deptColor}12` : "0 1px 4px rgba(0,0,0,0.06)",
            marginBottom: 14, overflow: "hidden", transition: "box-shadow 0.2s, border-color 0.2s",
          }}>
            {/* Header */}
            <div onClick={() => setExpanded(isOpen ? null : g.id)}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 22px", cursor: "pointer", userSelect: "none" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: `${deptColor}15`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0,
              }}>{g.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{g.title}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 5, flexWrap: "wrap" }}>
                  <span style={{ background: `${g.slaColor}15`, color: g.slaColor, borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
                    ⏱ {t.guidelines.sla} {g.sla}
                  </span>
                  <span style={{ background: `${deptColor}12`, color: deptColor, borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>
                    {g.department}
                  </span>
                  <span style={{ background: "#f1f5f9", color: "#64748b", borderRadius: 999, padding: "2px 10px", fontSize: 11 }}>
                    {g.steps.length} {t.guidelines.steps}
                  </span>
                </div>
              </div>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: isOpen ? `${deptColor}15` : "#f8fafc",
                border: `1px solid ${isOpen ? deptColor + "30" : "#e2e8f0"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: isOpen ? deptColor : "#94a3b8", fontSize: 13, flexShrink: 0,
              }}>
                {isOpen ? "▲" : "▼"}
              </div>
            </div>

            {/* Expanded steps */}
            {isOpen && (
              <div style={{ padding: "0 22px 22px" }}>
                <div style={{ height: 1, background: `linear-gradient(to right, ${deptColor}40, transparent)`, marginBottom: 20 }} />

                {/* Step timeline */}
                <div style={{ position: "relative" }}>
                  {/* Vertical line */}
                  <div style={{
                    position: "absolute", left: 19, top: 0, bottom: 0,
                    width: 2, background: `linear-gradient(to bottom, ${deptColor}40, ${deptColor}10)`,
                    borderRadius: 2,
                  }} />

                  {g.steps.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, marginBottom: 14, position: "relative" }}>
                      {/* Step number circle */}
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                        background: i === 0 ? deptColor : "#fff",
                        border: `2px solid ${deptColor}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: 13,
                        color: i === 0 ? "#fff" : deptColor,
                        zIndex: 1, boxShadow: i === 0 ? `0 2px 8px ${deptColor}40` : "none",
                      }}>
                        {i + 1}
                      </div>
                      {/* Step content */}
                      <div style={{
                        flex: 1, background: i === 0 ? `${deptColor}08` : "#f8fafc",
                        border: `1px solid ${i === 0 ? deptColor + "25" : "#f1f5f9"}`,
                        borderRadius: 10, padding: "10px 14px",
                      }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: i === 0 ? deptColor : "#1e293b", marginBottom: 3 }}>
                          {step.action}
                        </div>
                        <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{step.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Note */}
                <div style={{ marginTop: 8, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>📝</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 3 }}>{t.guidelines.importantNote}</div>
                    <div style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{g.notes}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
