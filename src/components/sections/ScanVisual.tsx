import { scanVisual } from "@/lib/content";

const SERIES = [
  62, 58, 66, 54, 60, 48, 52, 44, 50, 40, 46, 36, 42, 34, 38, 30, 34, 26, 30, 22,
];

const W = 320;
const H = 116;

const trace = SERIES.map((v, i) => {
  const x = (i / (SERIES.length - 1)) * W;
  const y = v + 18;
  return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
}).join(" ");

/**
 * The same price move read two ways: buried under hand-drawn clutter, or
 * marked once by the assisted pass. Paired inside the comparison panels.
 */
export function ScanVisual({ tone }: { tone: "old" | "new" }) {
  const isNew = tone === "new";

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="border-line-soft bg-ink h-auto w-full rounded-xl border"
        role="img"
        aria-label={
          isNew
            ? "The same chart with one zone marked by the assisted pass"
            : "A chart crowded with manually drawn lines and question marks"
        }
      >
        {[28, 52, 76, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2={W}
            y2={y}
            stroke="currentColor"
            className="text-fg-faint"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        ))}

        {isNew ? (
          <>
            <rect
              x="196"
              y="36"
              width="76"
              height="42"
              rx="6"
              fill="var(--signal)"
              fillOpacity="0.14"
              stroke="var(--signal-text)"
              strokeOpacity="0.55"
              strokeDasharray="4 3"
            />
            <circle cx="234" cy="50" r="3.5" fill="var(--signal-text)" />
          </>
        ) : (
          <>
            {/* Everything a person draws before they trust a level. */}
            <line x1="20" y1="96" x2="300" y2="30" stroke="var(--alarm)" strokeOpacity="0.55" />
            <line x1="10" y1="42" x2="290" y2="98" stroke="var(--alarm)" strokeOpacity="0.4" />
            <line x1="120" y1="10" x2="150" y2="106" stroke="var(--alarm)" strokeOpacity="0.35" />
            <line
              x1="0"
              y1="66"
              x2={W}
              y2="66"
              stroke="var(--alarm)"
              strokeOpacity="0.45"
              strokeDasharray="5 4"
            />
            <text x="168" y="26" fill="var(--alarm)" fontSize="15" fontWeight="700">
              ?
            </text>
            <text x="248" y="98" fill="var(--alarm)" fontSize="15" fontWeight="700">
              ?
            </text>
            <text x="72" y="34" fill="var(--alarm)" fontSize="15" fontWeight="700">
              ?
            </text>
          </>
        )}

        <path
          d={trace}
          fill="none"
          stroke={isNew ? "var(--signal-text)" : "currentColor"}
          className={isNew ? "" : "text-fg-muted"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <figcaption className="text-fg-dim mt-2 font-mono text-[10px] tracking-[0.14em] uppercase">
        {isNew ? scanVisual.newLabel : scanVisual.oldLabel}
      </figcaption>
    </figure>
  );
}
