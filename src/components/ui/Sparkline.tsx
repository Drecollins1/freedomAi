/** Compact price trace used in the market tiles. */
export function Sparkline({
  points,
  up,
  className = "",
}: {
  points: readonly number[];
  up: boolean;
  className?: string;
}) {
  const w = 100;
  const h = 32;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;

  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / span) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  const stroke = up ? "var(--signal-text)" : "var(--alarm)";
  const id = `spark-${up ? "up" : "down"}-${points.length}-${points[0]}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`h-8 w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L${w} ${h} L0 ${h} Z`} fill={`url(#${id})`} />
      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
