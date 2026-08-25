import { Container, Eyebrow } from "@/components/ui/Primitives";
import { iconByName } from "@/components/ui/Icon";
import { intro } from "@/lib/content";

export function Intro() {
  return (
    <section className="pb-12 md:pb-20 lg:pb-26">
      <Container>
        <div className="border-line relative overflow-hidden rounded-[20px] border bg-[linear-gradient(180deg,var(--intro-top)_0%,var(--intro-bottom)_100%)] px-6 py-7 md:rounded-[22px] md:px-12 md:py-14 lg:px-16 lg:py-16">
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 glow-cool md:-top-30 md:-right-30 md:h-[420px] md:w-[420px]"
            aria-hidden
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <Eyebrow>{intro.eyebrow}</Eyebrow>
              <h2 className="font-display mt-3 text-[32px] font-semibold tracking-[-0.025em] md:mt-4 md:text-[44px]">
                {intro.heading}
              </h2>
              <p className="text-fg-muted mt-3.5 text-[16px] leading-relaxed md:mt-5 md:text-[19px]">
                {intro.body}
              </p>
              <p className="text-fg-dim mt-3 text-sm leading-relaxed md:mt-4.5 md:text-base">
                {intro.caveat}
              </p>
            </div>

            <ul className="flex flex-col gap-2.5 md:gap-3.5">
              {intro.points.map((point) => {
                const Icon = iconByName[point.icon];
                return (
                  <li
                    key={point.label}
                    className="border-line flex items-center gap-3.5 rounded-[13px] border bg-wash-soft px-4 py-3.5 md:rounded-[14px] md:px-5 md:py-4.5"
                  >
                    <Icon className="text-signal-text h-[18px] w-[18px] shrink-0 md:h-5 md:w-5" />
                    <span className="text-fg-soft text-sm md:text-[15px]">{point.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
