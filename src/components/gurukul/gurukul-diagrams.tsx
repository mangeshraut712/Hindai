import Link from "next/link";
import type { ReactNode } from "react";

/** Compact architecture diagrams for the Digital Gurukul — SVG, no heavy assets. */
export function GurukulDiagrams() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-serif text-3xl">How the gurukul is shaped</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        Five maps of practice — not decoration. Use them to choose where to read next.
      </p>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <DiagramCard title="Shridhar grantha family" subtitle="Marathi ovi household books">
          <svg viewBox="0 0 320 160" className="h-auto w-full text-primary" aria-hidden="true">
            <rect x="110" y="8" width="100" height="28" rx="6" fill="currentColor" opacity="0.15" />
            <text x="160" y="26" textAnchor="middle" className="fill-foreground" fontSize="11">
              Shridhar Swami
            </text>
            <path d="M160 36 V55" stroke="currentColor" strokeWidth="1.5" />
            <path d="M60 55 H260" stroke="currentColor" strokeWidth="1.5" />
            <path d="M60 55 V70 M160 55 V70 M260 55 V70" stroke="currentColor" strokeWidth="1.5" />
            {[
              [60, "Shivlilamrit", "/shivlilamrit"],
              [160, "Harivijay", "/harivijay"],
              [260, "Ramvijay", "/ramvijay"],
            ].map(([x, label]) => (
              <g key={String(label)}>
                <rect
                  x={Number(x) - 42}
                  y="70"
                  width="84"
                  height="28"
                  rx="6"
                  fill="currentColor"
                  opacity="0.2"
                />
                <text
                  x={Number(x)}
                  y="88"
                  textAnchor="middle"
                  className="fill-foreground"
                  fontSize="10"
                >
                  {label}
                </text>
              </g>
            ))}
            <text
              x="160"
              y="140"
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="10"
            >
              + Haripaat (daily Hari patha)
            </text>
          </svg>
          <p className="mt-3 text-xs text-muted-foreground">
            <Link href="/shivlilamrit" className="text-primary">
              Shivlilamrit
            </Link>
            {" · "}
            <Link href="/harivijay" className="text-primary">
              Harivijay
            </Link>
            {" · "}
            <Link href="/ramvijay" className="text-primary">
              Ramvijay
            </Link>
            {" · "}
            <Link href="/haripaat" className="text-primary">
              Haripaat
            </Link>
          </p>
        </DiagramCard>

        <DiagramCard title="Char Dham corners" subtitle="Four living Vaishnava gates">
          <svg viewBox="0 0 320 160" className="h-auto w-full text-primary" aria-hidden="true">
            <rect
              x="20"
              y="20"
              width="280"
              height="120"
              rx="12"
              fill="none"
              stroke="currentColor"
            />
            <circle cx="160" cy="40" r="10" fill="currentColor" />
            <text x="160" y="62" textAnchor="middle" fontSize="10" className="fill-foreground">
              Badrinath
            </text>
            <circle cx="280" cy="80" r="10" fill="currentColor" />
            <text x="250" y="102" textAnchor="middle" fontSize="10" className="fill-foreground">
              Puri
            </text>
            <circle cx="160" cy="120" r="10" fill="currentColor" />
            <text x="160" y="148" textAnchor="middle" fontSize="10" className="fill-foreground">
              Rameswaram
            </text>
            <circle cx="40" cy="80" r="10" fill="currentColor" />
            <text x="70" y="102" textAnchor="middle" fontSize="10" className="fill-foreground">
              Dwarka
            </text>
          </svg>
          <p className="mt-3 text-xs text-muted-foreground">
            <Link href="/vishnu" className="text-primary">
              Open Vishnu tirtha →
            </Link>
          </p>
        </DiagramCard>

        <DiagramCard title="Ashtavinayak order" subtitle="Eight Maharashtra bows">
          <svg viewBox="0 0 320 120" className="h-auto w-full text-primary" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => {
              const x = 24 + i * 36;
              return (
                <g key={i}>
                  <circle cx={x} cy="48" r="12" fill="currentColor" opacity={0.2 + i * 0.08} />
                  <text x={x} y="52" textAnchor="middle" fontSize="9" className="fill-foreground">
                    {i + 1}
                  </text>
                  {i < 7 ? (
                    <path
                      d={`M${x + 12} 48 H${x + 24}`}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      markerEnd="url(#arrow)"
                    />
                  ) : null}
                </g>
              );
            })}
            <text
              x="160"
              y="96"
              textAnchor="middle"
              fontSize="10"
              className="fill-muted-foreground"
            >
              Morgaon → … → Mahaganapati
            </text>
          </svg>
          <p className="mt-3 text-xs text-muted-foreground">
            <Link href="/ganesha" className="text-primary">
              Open Ganesha circuit →
            </Link>
          </p>
        </DiagramCard>

        <DiagramCard title="Navaratri three storms" subtitle="Devi Mahatmya grammar">
          <svg viewBox="0 0 320 120" className="h-auto w-full text-primary" aria-hidden="true">
            {["Madhu-Kaitabha", "Mahishasura", "Shumbha-Nishumbha"].map((label, i) => (
              <g key={label}>
                <rect
                  x={20 + i * 100}
                  y="28"
                  width="88"
                  height="48"
                  rx="8"
                  fill="currentColor"
                  opacity={0.18 + i * 0.1}
                />
                <text
                  x={64 + i * 100}
                  y="56"
                  textAnchor="middle"
                  fontSize="9"
                  className="fill-foreground"
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
          <p className="mt-3 text-xs text-muted-foreground">
            <Link href="/festivals/sharad-navaratri" className="text-primary">
              Sharad Navaratri →
            </Link>
            {" · "}
            <Link href="/katha/devi" className="text-primary">
              Devi katha
            </Link>
          </p>
        </DiagramCard>

        <DiagramCard
          title="Haripaat weekly rhythm"
          subtitle="Name · ekadashi · rest"
          className="lg:col-span-2"
        >
          <svg viewBox="0 0 640 100" className="h-auto w-full text-primary" aria-hidden="true">
            {["Dawn Name", "Tulsi", "Ekadashi", "Gita seed", "Vitthal", "Peace", "Begin again"].map(
              (label, i) => (
                <g key={label}>
                  <rect
                    x={16 + i * 90}
                    y="24"
                    width="78"
                    height="40"
                    rx="8"
                    fill="currentColor"
                    opacity="0.16"
                  />
                  <text
                    x={55 + i * 90}
                    y="48"
                    textAnchor="middle"
                    fontSize="9"
                    className="fill-foreground"
                  >
                    {label}
                  </text>
                </g>
              )
            )}
          </svg>
          <p className="mt-3 text-xs text-muted-foreground">
            <Link href="/haripaat" className="text-primary">
              Open Haripaat →
            </Link>
          </p>
        </DiagramCard>
      </div>
    </section>
  );
}

function DiagramCard({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-t border-border/70 pt-6 ${className}`}>
      <h3 className="font-serif text-xl">{title}</h3>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}
