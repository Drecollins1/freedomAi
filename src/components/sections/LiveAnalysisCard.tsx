import { site, imagine } from "@/lib/content";

/**
 * The AI-assisted analysis view, as a viewer would see it on their phone.
 * On desktop it sits inside a drawn handset; on mobile the frame is dropped —
 * a phone inside a phone reads as a mistake.
 */
export function LiveAnalysisCard({ framed = false }: { framed?: boolean }) {
  const card = (
    <div className="border-line-strong bg-panel-deep overflow-hidden rounded-[18px] border md:rounded-[26px] md:border-0 md:bg-ink">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 md:px-5 md:pt-5 md:pb-3.5">
        <span className="font-display text-sm font-semibold md:text-[15px]">{site.name}</span>
        <span className="text-signal-text inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase">
          <span className="bg-signal h-1.5 w-1.5 rounded-full" aria-hidden />
          {imagine.mock.status}
        </span>
      </div>

      <div className="px-4 pb-4 md:px-5 md:pb-4.5">
        <div className="border-line-soft bg-ink relative h-[150px] overflow-hidden rounded-xl border md:rounded-[14px]">
          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:100%_30px]"
            aria-hidden
          />
          <svg
            viewBox="0 0 290 150"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="equity-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--signal-text)" stopOpacity="0.18" />
                <stop offset="1" stopColor="var(--signal-text)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 116 L34 104 L58 120 L86 88 L112 96 L140 66 L168 78 L196 52 L224 60 L252 34 L290 22 L290 150 L0 150 Z"
              fill="url(#equity-fill)"
            />
            <path
              d="M0 116 L34 104 L58 120 L86 88 L112 96 L140 66 L168 78 L196 52 L224 60 L252 34 L290 22"
              stroke="var(--signal-text)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="196" cy="52" r="4" fill="var(--signal-text)" />
            <circle cx="196" cy="52" r="9" stroke="var(--signal-text)" strokeOpacity="0.35" fill="none" />
          </svg>
        </div>

        <div className="border-signal/[0.22] bg-signal/[0.07] mt-3 rounded-xl border p-3.5">
          <p className="text-signal-text font-mono text-[10px] tracking-[0.14em] uppercase">
            {imagine.mock.alertLabel}
          </p>
          <p className="text-fg-soft mt-1.5 text-[13px] leading-snug">{imagine.mock.alertBody}</p>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {imagine.mock.timeframes.map((tf) => (
            <div
              key={tf}
              className="border-line-soft rounded-[10px] border bg-wash px-2.5 py-2.5"
            >
              <p className="text-fg-dim font-mono text-[9px] tracking-[0.1em] uppercase">{tf}</p>
              <p className="text-fg-soft mt-1 text-xs">{imagine.mock.timeframeState}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!framed) return card;

  return (
    <div className="border-line-strong bg-[var(--device-shell)] w-[330px] rounded-[38px] border p-3.5 shadow-device">
      {card}
    </div>
  );
}
