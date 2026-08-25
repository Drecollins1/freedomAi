import { Container, SectionHeading } from "@/components/ui/Primitives";
import { ArrowRight, InfoIcon } from "@/components/ui/Icon";
import { TestimonialWall } from "@/components/sections/TestimonialWall";
import { site, testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="bg-ink-raised border-line-soft border-y py-12 md:py-20 lg:py-24">
      <Container>
        <SectionHeading className="max-w-[640px] uppercase">{testimonials.heading}</SectionHeading>
        <p className="text-fg-muted mt-3 max-w-[560px] text-[15px] leading-relaxed md:mt-4 md:text-[18px]">
          {testimonials.body}
        </p>

        <div className="mt-7 md:mt-10">
          <TestimonialWall />
        </div>

        {/* Individual-results notice. These screenshots show money outcomes, so
            this must stay next to them, not only in the footer. */}
        <p className="border-line-strong text-fg-dim mt-6 flex items-start gap-3 rounded-xl border border-dashed px-4 py-3.5 text-[12px] leading-relaxed md:mt-8 md:text-[13px]">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
          {testimonials.resultsDisclaimer}
        </p>

        <a
          href={site.testimonialsUrl}
          className="font-display text-signal-text hover:text-signal-soft focus-visible:outline-signal-text mt-5 inline-flex items-center gap-2.5 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 md:mt-7 md:text-base"
        >
          {testimonials.linkLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      </Container>
    </section>
  );
}
