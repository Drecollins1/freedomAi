import { Container, CtaButton } from "@/components/ui/Primitives";
import { cta, curiosity } from "@/lib/content";

export function Curiosity() {
  return (
    <section className="bg-ink-raised border-line-soft border-y py-12 text-center md:py-20 lg:py-24">
      <Container>
        <h2 className="font-display mx-auto max-w-[860px] text-[34px] leading-[1.04] font-semibold tracking-[-0.025em] text-balance uppercase md:text-[44px] lg:text-[56px]">
          {curiosity.heading}
        </h2>

        <p className="text-fg-muted mx-auto mt-4 max-w-[620px] text-[16px] leading-relaxed md:mt-6 md:text-[20px]">
          {curiosity.body}
        </p>

        <div className="mx-auto mt-8 flex max-w-[640px] flex-col items-center gap-4 md:mt-11 md:gap-4.5">
          <p className="font-display text-signal-text text-[20px] leading-tight font-bold tracking-[-0.01em] uppercase md:text-[30px]">
            {curiosity.offer}
          </p>
          <p className="text-fg-muted text-[15px] leading-relaxed md:text-[17px]">
            {curiosity.offerBody}
          </p>
          <CtaButton href="#register" variant="outline" className="mt-2.5 w-full md:w-auto">
            {cta.secondary}
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
