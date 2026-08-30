import { Container, SectionHeading } from "@/components/ui/Primitives";
import { ArrowRight } from "@/components/ui/Icon";
import { TestimonialWall } from "@/components/sections/TestimonialWall";
import { testimonials } from "@/lib/content";

export function Testimonials({ testimonialsUrl }: { testimonialsUrl: string }) {
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

        <a
          href={testimonialsUrl}
          className="font-display text-signal-text hover:text-signal-soft focus-visible:outline-signal-text mt-6 inline-flex items-center gap-2.5 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 md:mt-8 md:text-base"
        >
          {testimonials.linkLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      </Container>
    </section>
  );
}
