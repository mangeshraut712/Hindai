import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, ZoomIn, ZoomOut, Maximize, MessageSquare, X, Info } from "lucide-react";

const VOID = "#0A0A0F";
const SURFACE = "#111118";
const SURFACE2 = "#1A1A28";
const BORDER = "#2A2A3F";
const SAFFRON = "#E8842D";
const GOLD = "#D4A843";
const CREAM = "#F5ECD7";
const ASH = "#8B8BA0";
const EMERALD = "#2D7A5F";
const DEEP_BLUE = "#1E3A6E";

type NodeType = "scripture" | "concept" | "chapter";
interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  color: string;
  x: number;
  y: number;
  radius: number;
  description: string;
  connections: number;
  source?: string;
}
interface GraphEdge {
  from: string;
  to: string;
  strength: number;
}

const nodes: GraphNode[] = [
  // Scriptures (large)
  { id: "gita", label: "Bhagavad Gita", type: "scripture", color: GOLD, x: 420, y: 360, radius: 44, description: "700 verses of divine dialogue between Krishna and Arjuna on duty, self, and liberation.", connections: 8, source: "18 Chapters" },
  { id: "ramayana", label: "Ramayana", type: "scripture", color: SAFFRON, x: 720, y: 200, radius: 38, description: "Epic of Rama — 24,000 verses on dharma, devotion, and righteous conduct.", connections: 5, source: "7 Kandas" },
  { id: "mahabharata", label: "Mahabharata", type: "scripture", color: SAFFRON, x: 680, y: 510, radius: 40, description: "World's longest epic poem — 100,000+ verses including the Bhagavad Gita.", connections: 7, source: "18 Parvas" },
  { id: "rigveda", label: "Rigveda", type: "scripture", color: GOLD, x: 160, y: 190, radius: 36, description: "Oldest of four Vedas — 10,552 hymns to the gods in Vedic Sanskrit.", connections: 4, source: "10 Mandalas" },
  { id: "upanishads", label: "Upanishads", type: "scripture", color: GOLD, x: 150, y: 520, radius: 36, description: "108 philosophical texts exploring Brahman, Atman, and ultimate reality.", connections: 6, source: "108 Texts" },
  { id: "puranas", label: "Shrimad Bhagavatam", type: "scripture", color: EMERALD, x: 820, y: 380, radius: 32, description: "Purana dedicated to Vishnu and Krishna, 18,000 verses in 12 cantos.", connections: 4, source: "12 Cantos" },
  { id: "yogavasishtha", label: "Yoga Vasishtha", type: "scripture", color: DEEP_BLUE, x: 490, y: 110, radius: 28, description: "Vedantic text of 32,000 verses teaching liberation through non-dual wisdom.", connections: 3, source: "6 Prakaranas" },

  // Core concepts (medium)
  { id: "dharma", label: "Dharma", type: "concept", color: SAFFRON, x: 440, y: 240, radius: 26, description: "Cosmic order, duty, righteousness — the foundational principle connecting all texts.", connections: 7 },
  { id: "karma", label: "Karma", type: "concept", color: GOLD, x: 520, y: 440, radius: 26, description: "Action and its consequences — the law of cause and effect across all Hindu texts.", connections: 8 },
  { id: "yoga", label: "Yoga", type: "concept", color: EMERALD, x: 330, y: 480, radius: 24, description: "Union with the Divine — Bhakti, Jnana, Karma, and Raja paths.", connections: 6 },
  { id: "atman", label: "Atman", type: "concept", color: GOLD, x: 240, y: 350, radius: 22, description: "Individual self or soul — identical with Brahman in Advaita Vedanta.", connections: 4 },
  { id: "brahman", label: "Brahman", type: "concept", color: GOLD, x: 320, y: 180, radius: 24, description: "Ultimate reality, cosmic consciousness — the substratum of all existence.", connections: 5 },
  { id: "moksha", label: "Moksha", type: "concept", color: SAFFRON, x: 600, y: 320, radius: 22, description: "Liberation from the cycle of birth and death — the ultimate goal.", connections: 5 },
  { id: "bhakti", label: "Bhakti", type: "concept", color: SAFFRON, x: 570, y: 230, radius: 20, description: "Devotional love and worship — path to the Divine through surrender.", connections: 4 },
  { id: "jnana", label: "Jnana", type: "concept", color: DEEP_BLUE, x: 270, y: 430, radius: 20, description: "Knowledge and wisdom — path of intellectual inquiry and self-realization.", connections: 4 },
  { id: "ahimsa", label: "Ahimsa", type: "concept", color: EMERALD, x: 700, y: 130, radius: 18, description: "Non-violence — a foundational ethical principle across Hindu, Jain, and Buddhist texts.", connections: 3 },
  { id: "maya", label: "Maya", type: "concept", color: DEEP_BLUE, x: 180, y: 300, radius: 18, description: "Illusion — the cosmic power that makes Brahman appear as the world of plurality.", connections: 3 },
];

const edges: GraphEdge[] = [
  // Gita connections
  { from: "gita", to: "dharma", strength: 0.9 },
  { from: "gita", to: "karma", strength: 0.95 },
  { from: "gita", to: "yoga", strength: 0.9 },
  { from: "gita", to: "brahman", strength: 0.7 },
  { from: "gita", to: "moksha", strength: 0.8 },
  { from: "gita", to: "bhakti", strength: 0.7 },
  { from: "gita", to: "atman", strength: 0.7 },

  // Upanishads connections
  { from: "upanishads", to: "brahman", strength: 0.95 },
  { from: "upanishads", to: "atman", strength: 0.95 },
  { from: "upanishads", to: "moksha", strength: 0.85 },
  { from: "upanishads", to: "maya", strength: 0.7 },
  { from: "upanishads", to: "jnana", strength: 0.8 },

  // Ramayana connections
  { from: "ramayana", to: "dharma", strength: 0.9 },
  { from: "ramayana", to: "bhakti", strength: 0.8 },
  { from: "ramayana", to: "ahimsa", strength: 0.7 },

  // Mahabharata connections
  { from: "mahabharata", to: "dharma", strength: 0.85 },
  { from: "mahabharata", to: "karma", strength: 0.85 },
  { from: "mahabharata", to: "moksha", strength: 0.7 },
  { from: "mahabharata", to: "yoga", strength: 0.6 },

  // Rigveda connections
  { from: "rigveda", to: "brahman", strength: 0.7 },
  { from: "rigveda", to: "atman", strength: 0.6 },
  { from: "rigveda", to: "dharma", strength: 0.7 },

  // Yoga connections
  { from: "yoga", to: "bhakti", strength: 0.8 },
  { from: "yoga", to: "jnana", strength: 0.8 },
  { from: "yoga", to: "karma", strength: 0.7 },
  { from: "yoga", to: "moksha", strength: 0.75 },

  // Yoga Vasishtha
  { from: "yogavasishtha", to: "maya", strength: 0.8 },
  { from: "yogavasishtha", to: "brahman", strength: 0.8 },
  { from: "yogavasishtha", to: "moksha", strength: 0.7 },

  // Puranas
  { from: "puranas", to: "bhakti", strength: 0.9 },
  { from: "puranas", to: "karma", strength: 0.6 },
  { from: "puranas", to: "dharma", strength: 0.7 },
  { from: "puranas", to: "moksha", strength: 0.7 },

  // Concept interconnections
  { from: "atman", to: "brahman", strength: 0.9 },
  { from: "atman", to: "maya", strength: 0.7 },
  { from: "karma", to: "dharma", strength: 0.75 },
  { from: "karma", to: "moksha", strength: 0.7 },
  { from: "jnana", to: "brahman", strength: 0.8 },
  { from: "jnana", to: "maya", strength: 0.7 },
];

const legendItems = [
  { color: GOLD, label: "Vedic Scriptures" },
  { color: SAFFRON, label: "Epic Texts" },
  { color: EMERALD, label: "Puranas / Yoga" },
  { color: DEEP_BLUE, label: "Philosophy" },
];

export function KnowledgeGraph() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [zoom, setZoom] = useState(1);
  const [highlight, setHighlight] = useState<Set<string>>(new Set());

  const handleNodeClick = (node: GraphNode) => {
    setSelected(node);
    // Highlight connected nodes
    const connected = new Set<string>([node.id]);
    edges.forEach((e) => {
      if (e.from === node.id) connected.add(e.to);
      if (e.to === node.id) connected.add(e.from);
    });
    setHighlight(connected);
  };

  const handleSearch = (q: string) => {
    setSearch(q);
    if (!q) { setHighlight(new Set()); return; }
    const matches = nodes.filter(n => n.label.toLowerCase().includes(q.toLowerCase()));
    setHighlight(new Set(matches.map(n => n.id)));
  };

  const isHighlighted = (id: string) => highlight.size === 0 || highlight.has(id);
  const isEdgeActive = (e: GraphEdge) => highlight.size === 0 || (highlight.has(e.from) && highlight.has(e.to));

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: VOID, fontFamily: "Inter, sans-serif", color: CREAM }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "14px 24px", backgroundColor: SURFACE, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: CREAM }}>Knowledge Graph</h2>
          <p style={{ color: ASH, fontSize: 13 }}>Explore connections between scriptures, concepts, and teachings</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: ASH }} />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search nodes…"
              style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "8px 12px 8px 30px", fontSize: 13, color: CREAM, outline: "none", width: 200 }}
            />
          </div>
          <div className="flex gap-1">
            <button onClick={() => setZoom(z => Math.min(2, z + 0.15))} style={{ padding: "7px 10px", backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 8, cursor: "pointer", color: ASH }}><ZoomIn size={15} /></button>
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.15))} style={{ padding: "7px 10px", backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 8, cursor: "pointer", color: ASH }}><ZoomOut size={15} /></button>
            <button onClick={() => { setZoom(1); setHighlight(new Set()); setSearch(""); setSelected(null); }} style={{ padding: "7px 10px", backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 8, cursor: "pointer", color: ASH }}><Maximize size={15} /></button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Graph Canvas */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 700"
            style={{ cursor: "default", transform: `scale(${zoom})`, transformOrigin: "center center", transition: "transform 0.2s" }}
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={BORDER} strokeWidth="0.3" />
              </pattern>
              <radialGradient id="glow-saffron" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={SAFFRON} stopOpacity="0.3" />
                <stop offset="100%" stopColor={SAFFRON} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1000" height="700" fill="url(#grid)" />

            {/* Edges */}
            {edges.map((edge, i) => {
              const from = getNode(edge.from);
              const to = getNode(edge.to);
              if (!from || !to) return null;
              const active = isEdgeActive(edge);
              return (
                <line
                  key={i}
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke={active ? GOLD : BORDER}
                  strokeWidth={active ? edge.strength * 1.5 : 0.5}
                  strokeOpacity={active ? edge.strength * 0.4 : 0.15}
                  strokeDasharray={active ? undefined : "4 4"}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isLit = isHighlighted(node.id);
              const isHov = hoveredId === node.id;
              const isSel = selected?.id === node.id;
              return (
                <g
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Glow for selected */}
                  {isSel && (
                    <circle cx={node.x} cy={node.y} r={node.radius + 14} fill={node.color} opacity={0.12} />
                  )}
                  {/* Node ring */}
                  <circle
                    cx={node.x} cy={node.y} r={node.radius}
                    fill={isLit ? `${node.color}18` : `${BORDER}10`}
                    stroke={isLit ? (isSel ? node.color : `${node.color}88`) : BORDER}
                    strokeWidth={isSel ? 2.5 : isHov ? 2 : 1.5}
                    opacity={isLit ? 1 : 0.3}
                  />
                  {/* Hover outer ring */}
                  {isHov && (
                    <circle cx={node.x} cy={node.y} r={node.radius + 6} fill="none" stroke={node.color} strokeWidth={1} opacity={0.3} />
                  )}
                  {/* Label */}
                  <text
                    x={node.x} y={node.y}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={isLit ? (isSel ? node.color : CREAM) : ASH}
                    fontSize={node.type === "scripture" ? 10 : 9}
                    fontWeight={isSel ? "600" : "400"}
                    fontFamily="Inter, sans-serif"
                    opacity={isLit ? 1 : 0.3}
                  >
                    {node.label.length > 14 ? node.label.split(" ").map((w, wi) => (
                      <tspan key={wi} x={node.x} dy={wi === 0 ? -(node.label.split(" ").length - 1) * 6 : 12}>{w}</tspan>
                    )) : node.label}
                  </text>
                  {/* Connection count for scriptures */}
                  {node.type === "scripture" && (
                    <text
                      x={node.x} y={node.y + node.radius - 10}
                      textAnchor="middle"
                      fill={node.color} fontSize={8} opacity={isLit ? 0.7 : 0.2}
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      {node.connections} links
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div style={{ position: "absolute", bottom: 20, left: 20, backgroundColor: `${SURFACE}DD`, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 16px", backdropFilter: "blur(8px)" }}>
            <p style={{ color: ASH, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Legend</p>
            {legendItems.map((l) => (
              <div key={l.label} className="flex items-center gap-2 mb-1">
                <div style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${l.color}`, backgroundColor: `${l.color}20` }} />
                <span style={{ color: CREAM, fontSize: 12 }}>{l.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <div style={{ width: 20, height: 1.5, backgroundColor: GOLD, opacity: 0.5 }} />
              <span style={{ color: ASH, fontSize: 12 }}>Concept link</span>
            </div>
          </div>

          {/* Zoom level */}
          <div style={{ position: "absolute", bottom: 20, right: 20, backgroundColor: `${SURFACE}DD`, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, color: ASH }}>
            {Math.round(zoom * 100)}%
          </div>

          {/* Hint */}
          {!selected && (
            <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", backgroundColor: `${SURFACE}CC`, border: `1px solid ${BORDER}`, borderRadius: 100, padding: "8px 16px", fontSize: 13, color: ASH, display: "flex", alignItems: "center", gap: 6 }}>
              <Info size={13} /> Click any node to explore connections
            </div>
          )}
        </div>

        {/* Right panel: Node detail */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ x: 360, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 360, opacity: 0 }}
              style={{ width: 340, borderLeft: `1px solid ${BORDER}`, backgroundColor: SURFACE, flexShrink: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              <div style={{ padding: "18px 20px 14px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: selected.color, boxShadow: `0 0 8px ${selected.color}` }} />
                    <span style={{ color: ASH, fontSize: 12, textTransform: "capitalize" }}>{selected.type}</span>
                    {selected.source && <span style={{ backgroundColor: `${selected.color}15`, color: selected.color, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>{selected.source}</span>}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: CREAM, lineHeight: 1.2 }}>{selected.label}</h3>
                </div>
                <button onClick={() => { setSelected(null); setHighlight(new Set()); }} style={{ color: ASH, background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={16} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <p style={{ color: CREAM, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>{selected.description}</p>

                <div style={{ backgroundColor: SURFACE2, borderRadius: 10, border: `1px solid ${BORDER}`, padding: "12px 14px", marginBottom: 20 }}>
                  <p style={{ color: ASH, fontSize: 12, marginBottom: 4 }}>Connected to</p>
                  <p style={{ color: CREAM, fontSize: 22, fontWeight: 600 }}>{selected.connections} <span style={{ color: ASH, fontSize: 14 }}>nodes</span></p>
                </div>

                {/* Connected nodes */}
                <p style={{ color: ASH, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Direct Connections</p>
                <div className="flex flex-col gap-2 mb-6">
                  {edges
                    .filter(e => e.from === selected.id || e.to === selected.id)
                    .map((e, i) => {
                      const otherId = e.from === selected.id ? e.to : e.from;
                      const other = getNode(otherId);
                      if (!other) return null;
                      return (
                        <button
                          key={i}
                          onClick={() => handleNodeClick(other)}
                          style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left" }}
                          className="hover:border-[#E8842D] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: other.color }} />
                            <span style={{ color: CREAM, fontSize: 13 }}>{other.label}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 40, height: 3, borderRadius: 100, backgroundColor: BORDER, overflow: "hidden" }}>
                              <div style={{ width: `${e.strength * 100}%`, height: "100%", backgroundColor: selected.color }} />
                            </div>
                            <span style={{ color: ASH, fontSize: 11 }}>{Math.round(e.strength * 100)}%</span>
                          </div>
                        </button>
                      );
                    })}
                </div>

                <button
                  onClick={() => navigate("/app/chat")}
                  style={{ width: "100%", backgroundColor: SAFFRON, color: CREAM, borderRadius: 100, padding: "12px", fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                >
                  <MessageSquare size={16} /> Ask AI about {selected.label}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}