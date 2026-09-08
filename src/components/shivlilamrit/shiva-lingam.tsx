export function ShivaLingam({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 340"
      role="img"
      aria-label="Shiva linga on a yonipitha with a crescent and three lines"
      className={className}
    >
      <title>Shiva linga</title>
      <ellipse cx="140" cy="318" rx="92" ry="14" fill="currentColor" opacity="0.12" />
      <ellipse cx="140" cy="268" rx="108" ry="28" fill="hsl(var(--primary) / 0.2)" />
      <path
        d="M44 248c12-28 48-46 96-46s84 18 96 46c-8 22-44 36-96 36s-88-14-96-36Z"
        fill="hsl(var(--accent) / 0.35)"
      />
      <rect x="108" y="96" width="64" height="150" rx="32" fill="hsl(var(--primary) / 0.28)" />
      <ellipse cx="140" cy="96" rx="32" ry="22" fill="hsl(var(--primary) / 0.45)" />
      <path
        d="M118 148h44M116 168h48M120 188h40"
        stroke="hsl(var(--foreground))"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M168 78c18-6 28 8 18 18"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="140" cy="72" r="5" fill="hsl(var(--primary))" />
      <path
        d="M140 96c8 28 6 70 0 118"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        opacity="0.4"
      />
    </svg>
  );
}
