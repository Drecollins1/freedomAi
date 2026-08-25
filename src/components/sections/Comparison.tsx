import { Container, Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { Check, Cross, InfoIcon } from "@/components/ui/Icon";
import { ScanVisual } from "@/components/sections/ScanVisual";
import { comparison } from "@/lib/content";

function Panel({
  label,
  items,
  tone,
}: {
  label: string;
  items: readonly string[];
  tone: "old" | "new";
}) {
  const isNew = tone === "new";
  const Mark = isNew ? Check : Cross;

  return (
    <div
      className={
        isNew
          ? "border-signal/[0.28] rounded-[18px] border bg-signal/[0.08] px-5 py-6 md:rounded-[20px] md:px-9 md:py-10"
          : "border-line-soft bg-panel-deep rounded-[18px] border px-5 py-6 md:rounded-[20px] md:px-9 md:py-10"
      }
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`h-2 w-2 rounded-full ${isNew ? "bg-signal" : "bg-alarm"}`}
          aria-hidden
        />
        <p
          className={`font-mono text-[11px] tracking-[0.18em] uppercase md:text-xs ${
            isNew ? "text-signal-text" : "text-alarm"
          }`}
        >
          {label}
        </p>
      </div>

      <div className="mt-4 md:mt-6">
        <ScanVisual tone={tone} />
      </div>

      <ul className="mt-3 md:mt-4">
        {items.map((item, i) => (
          <li
            key={item}
            className={`flex items-center gap-3 py-3 md:gap-3.5 md:py-4 ${
              i < items.length - 1 ? "border-line-soft border-b" : ""
            }`}
          >
            <Mark
              className={`h-[15px] w-[15px] shrink-0 md:h-4 md:w-4 ${
                isNew ? "text-signal-text" : "text-alarm"
              }`}
            />
            <span
              className={`text-[15px] md:text-[17px] ${
                isNew ? "text-fg-soft" : "text-fg-muted"
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Comparison() {
  return (
    <section className="py-12 md:py-20 lg:py-26">
      <Container>
        <Eyebrow className="md:text-center">{comparison.eyebrow}</Eyebrow>
        <SectionHeading className="mt-4 md:text-center">{comparison.heading}</SectionHeading>

        {/* Old way first, so the green panel lands last and reads as the resolution. */}
        <div className="mt-8 grid gap-3.5 md:mt-14 md:grid-cols-2 md:gap-6">
          <Panel tone="old" label={comparison.oldWay.label} items={comparison.oldWay.items} />
          <Panel tone="new" label={comparison.newWay.label} items={comparison.newWay.items} />
        </div>

        <p className="border-line-strong mt-4 flex items-center justify-center gap-3 rounded-xl border border-dashed px-4 py-4 md:mt-8 md:rounded-[14px] md:px-7 md:py-5.5">
          <InfoIcon className="text-fg-dim hidden h-[18px] w-[18px] shrink-0 md:block" />
          <span className="font-display text-fg-muted text-[15px] leading-snug md:text-[17px]">
            {comparison.disclaimer}
          </span>
        </p>
      </Container>
    </section>
  );
}
