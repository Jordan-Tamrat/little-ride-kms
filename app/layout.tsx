"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const STAFF_NAV = [
  { href: "/", label: "Dashboard", icon: "⊞" },
  { href: "/issues", label: "Support Issues Database", icon: "🗂" },
  { href: "/lessons", label: "Lessons Learned", icon: "📚" },
  { href: "/driver-support", label: "Driver Support & Info", icon: "🚗" },
  { href: "/guidelines", label: "Support Guidelines", icon: "📋" },
  { href: "/multilingual", label: "Multilingual Support", icon: "🌐" },
  { href: "/experts", label: "Expert Locator", icon: "🧑💼" },
];

// Pages that render without the KMS shell
const SHELL_FREE = ["/login", "/driver-portal"];

function Sidebar({ collapsed, setCollapsed, onLogout }: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  onLogout: () => void;
}) {
  const path = usePathname();
  return (
    <aside style={{
      width: collapsed ? 64 : 240,
      minHeight: "100vh",
      background: "linear-gradient(180deg,#1e293b 0%,#0f172a 100%)",
      display: "flex", flexDirection: "column",
      transition: "width 0.2s", flexShrink: 0,
      position: "sticky", top: 0, height: "100vh", overflowY: "auto",
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <img src="/logo.svg" alt="Little Ride" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0, background: "#fff" }} />
        {!collapsed && (
          <div>
            <div style={{ color: "#fbbf24", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Little Ride</div>
            <div style={{ color: "#64748b", fontSize: 11 }}>Ethiopia KMS</div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 16, padding: 2 }}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div style={{ margin: "10px 12px 0", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 8, padding: "6px 10px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14 }}>🧑💼</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#fbbf24" }}>Staff Portal</span>
        </div>
      )}

      {/* Nav */}
      <nav style={{ padding: "12px 8px", flex: 1 }}>
        {STAFF_NAV.map(n => (
          <Link key={n.href} href={n.href}
            className={`sidebar-link${path === n.href ? " active" : ""}`}
            style={{ justifyContent: collapsed ? "center" : undefined }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{n.icon}</span>
            {!collapsed && <span>{n.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <button onClick={onLogout}
          className="sidebar-link"
          style={{ width: "100%", background: "none", border: "none", cursor: "pointer", justifyContent: collapsed ? "center" : undefined, color: "#ef4444" }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>🚪</span>
          {!collapsed && <span style={{ color: "#ef4444" }}>Sign Out</span>}
        </button>
      </div>

      {!collapsed && (
        <div style={{ padding: "8px 16px 12px", color: "#334155", fontSize: 11 }}>KMS v1.0 · 2026</div>
      )}
    </aside>
  );
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const r = localStorage.getItem("kms_role");
    setRole(r);
    setChecked(true);
    if (!r && !SHELL_FREE.includes(pathname)) {
      router.replace("/login");
    } else if (r === "driver" && !SHELL_FREE.includes(pathname)) {
      router.replace("/driver-portal");
    } else if (r === "staff" && pathname === "/login") {
      router.replace("/");
    }
  }, [pathname, router]);

  if (!checked) return null;
  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const isShellFree = SHELL_FREE.some(p => pathname.startsWith(p));

  function handleLogout() {
    localStorage.removeItem("kms_role");
    router.push("/login");
  }

  return (
    <html lang="en">
      <head>
        <title>Little Ride Ethiopia — KMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, background: "#f8fafc", display: "flex", minHeight: "100vh" }}>
        <AuthGuard>
          {isShellFree ? (
            // Login & driver portal render full-width without sidebar
            <div style={{ flex: 1 }}>{children}</div>
          ) : (
            <>
              <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} onLogout={handleLogout} />
              <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto", minHeight: "100vh" }}>
                {children}
              </main>
            </>
          )}
        </AuthGuard>
      </body>
    </html>
  );
}
