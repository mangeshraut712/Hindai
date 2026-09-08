export function GaneshaMurti({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 360"
      role="img"
      aria-label="Four-armed Ganesha with mouse, modaka, goad, and noose"
      className={className}
    >
      <title>Shastric Ganesha form</title>
      <ellipse cx="160" cy="330" rx="120" ry="18" fill="currentColor" opacity="0.12" />
      <path
        d="M86 248c18 42 52 64 74 64s56-22 74-64c-18 16-46 24-74 24s-56-8-74-24Z"
        fill="hsl(var(--primary) / 0.18)"
      />
      <circle cx="160" cy="132" r="58" fill="hsl(var(--primary) / 0.22)" />
      <path
        d="M118 148c8 38 22 62 42 78 20-16 34-40 42-78"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="142" cy="126" r="7" fill="hsl(var(--foreground))" />
      <circle cx="178" cy="126" r="7" fill="hsl(var(--foreground))" />
      <circle cx="160" cy="108" r="4" fill="hsl(var(--primary))" />
      <path
        d="M154 156c18 10 28 8 40-8"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="4"
      />
      <path
        d="M188 168c28 18 38 48 22 64-18 18-42-8-34-28 6-14 22-18 28-8"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path d="M148 96 128 64l32 10 32-10-20 32" fill="hsl(var(--accent) / 0.7)" />
      <path d="M64 176c18-8 40 4 52 18" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" />
      <path
        d="M256 176c-18-8-40 4-52 18"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="8"
      />
      <path d="M72 214c24 4 40 18 48 32" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" />
      <path
        d="M248 214c-24 4-40 18-48 32"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="8"
      />
      <circle cx="58" cy="168" r="10" fill="hsl(var(--accent))" />
      <rect x="242" y="154" width="22" height="14" rx="4" fill="hsl(var(--accent))" />
      <circle cx="68" cy="250" r="9" fill="hsl(var(--primary))" />
      <path d="M236 242 258 268" stroke="hsl(var(--foreground))" strokeWidth="4" />
      <ellipse cx="96" cy="312" rx="22" ry="12" fill="hsl(var(--muted-foreground) / 0.45)" />
      <circle cx="114" cy="306" r="5" fill="hsl(var(--foreground))" />
    </svg>
  );
}
