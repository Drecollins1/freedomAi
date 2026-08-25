import { ticker } from "@/lib/content";

/**
 * Lime announcement bar that scrolls above the nav.
 * The track holds the phrases twice so the loop is seamless at -50%.
 */
export function Ticker() {
  const track = [...ticker, ...ticker, ...ticker, ...ticker];

  return (
    <div className="bg-[var(--ticker-bg)] text-[var(--ticker-fg)] overflow-hidden" role="marquee" aria-label="Announcements">
      <div className="ticker-track flex w-max items-center py-2.5">
        {[...track, ...track].map((phrase, i) => (
          <span
            key={i}
            className="font-display flex shrink-0 items-center gap-8 px-8 text-xs font-bold tracking-[0.14em] whitespace-nowrap uppercase md:text-[13px]"
          >
            {phrase}
            <span className="h-1.5 w-1.5 rotate-45 bg-current opacity-40" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
