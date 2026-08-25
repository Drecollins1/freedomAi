import { Container } from "@/components/ui/Primitives";
import { Sparkline } from "@/components/ui/Sparkline";
import { marketStrip } from "@/lib/content";

/**
 * A band of pair tiles under the hero. Deliberately carries no prices or
 * percentages — the shapes give the page its market texture without implying
 * a live feed or a track record.
 */
export function MarketStrip() {
  return (
    <section className="border-line-soft border-y">
      <Container className="py-5 md:py-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-fg-dim font-mono text-[10px] tracking-[0.16em] uppercase md:text-[11px]">
            Pairs the analysis follows
          </p>
          <p className="text-fg-faint font-mono text-[10px] tracking-[0.1em] uppercase">
            {marketStrip.note}
          </p>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5 md:gap-3">
          {marketStrip.pairs.map((item, i) => (
            <li
              key={item.pair}
              className={`border-line-soft bg-panel-deep rounded-xl border px-3.5 py-3 ${
                i === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-[13px] font-semibold tracking-[-0.01em]">
                  {item.pair}
                </span>
                <span
                  className={`text-[10px] ${item.up ? "text-signal-text" : "text-alarm"}`}
                  aria-hidden
                >
                  {item.up ? "▲" : "▼"}
                </span>
              </div>
              <Sparkline points={item.trace} up={item.up} className="mt-2" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
