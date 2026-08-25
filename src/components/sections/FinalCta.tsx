import { Container } from "@/components/ui/Primitives";
import { Check } from "@/components/ui/Icon";
import { RegistrationForm } from "@/components/sections/RegistrationForm";
import { finalCta } from "@/lib/content";

export function FinalCta() {
  return (
    <section id="register" className="relative scroll-mt-8 overflow-hidden py-12 md:py-20 lg:py-26">
      <div
        className="pointer-events-none absolute -bottom-[260px] left-1/2 h-[560px] w-[1000px] -translate-x-1/2 glow-signal"
        aria-hidden
      />

      <Container className="relative grid items-center gap-8 lg:grid-cols-[1fr_440px] lg:gap-[72px]">
        <div>
          <h2 className="font-display text-[30px] leading-[1.06] font-semibold tracking-[-0.025em] text-balance uppercase md:text-[42px] lg:text-[54px]">
            {finalCta.heading}
          </h2>
          <p className="text-fg-muted mt-4 max-w-[520px] text-[16px] leading-relaxed md:mt-6 md:text-[19px]">
            {finalCta.body}
          </p>

          <ul className="mt-6 flex flex-col gap-3 md:mt-8">
            {finalCta.assurances.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check className="text-signal-text h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
                <span className="text-fg-muted text-[15px] md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <RegistrationForm />
      </Container>
    </section>
  );
}
