import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, MessageSquare, Library, Map, Bookmark, Settings, Wifi, WifiOff, ChevronLeft } from "lucide-react";

const VOID = "#0A0A0F";
const SURFACE = "#111118";
const SURFACE2 = "#1A1A28";
const BORDER = "#2A2A3F";
const SAFFRON = "#E8842D";
const GOLD = "#D4A843";
const CREAM = "#F5ECD7";
const ASH = "#8B8BA0";
const EMERALD = "#2D7A5F";

const navItems = [
  { icon: Home, label: "Home", path: "/app" },
  { icon: MessageSquare, label: "Ask AI", path: "/app/chat" },
  { icon: Library, label: "Library", path: "/app/reader" },
  { icon: Map, label: "Knowledge Graph", path: "/app/graph" },
  { icon: Bookmark, label: "Saved", path: "/app/saved" },
  { icon: Settings, label: "Settings", path: "/app/settings" },
];

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/app") return location.pathname === "/app";
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ backgroundColor: VOID, minHeight: "100vh", display: "flex", fontFamily: "Inter, sans-serif", color: CREAM }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0, backgroundColor: SURFACE,
        borderRight: `1px solid ${BORDER}`,
        display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40,
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              border: `1.5px solid ${GOLD}55`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`,
            }}>
              <span style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: 18, color: GOLD }}>त</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: CREAM, lineHeight: 1 }}>Tatva AI</div>
              <div style={{ fontSize: 10, color: ASH, marginTop: 2 }}>तत्त्व · Ancient Wisdom</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "11px 12px", borderRadius: 10, marginBottom: 2,
                  backgroundColor: active ? `${SAFFRON}18` : "transparent",
                  border: `1px solid ${active ? SAFFRON + "33" : "transparent"}`,
                  color: active ? SAFFRON : ASH,
                  cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s",
                }}
                className="hover:bg-[#1A1A28] hover:text-[#F5ECD7]"
              >
                <Icon size={16} />
                <span style={{ fontSize: 14, fontWeight: active ? 500 : 400 }}>{item.label}</span>
                {active && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", backgroundColor: SAFFRON }} />}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: 16 }}>
          {/* Offline indicator */}
          <div style={{ backgroundColor: `${EMERALD}15`, border: `1px solid ${EMERALD}33`, borderRadius: 10, padding: "10px 12px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <WifiOff size={14} color={EMERALD} />
            <div>
              <p style={{ color: EMERALD, fontSize: 12, fontWeight: 500 }}>Offline Ready</p>
              <p style={{ color: ASH, fontSize: 11 }}>Gemma 4 running locally</p>
            </div>
          </div>
          {/* Model status */}
          <div style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: EMERALD, boxShadow: `0 0 6px ${EMERALD}` }} />
            <div>
              <p style={{ color: CREAM, fontSize: 12, fontWeight: 500 }}>Model Active</p>
              <p style={{ color: ASH, fontSize: 11 }}>Gemma 4 E4B · Local</p>
            </div>
          </div>

          {/* Back to home */}
          <button
            onClick={() => navigate("/")}
            style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, color: ASH, fontSize: 12, background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}
          >
            <ChevronLeft size={14} /> Back to home
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 240, flex: 1, minHeight: "100vh", overflow: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
