import Image from "next/image";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { Check } from "@/components/ui/Icon";
import { owner } from "@/lib/content";

function Monogram() {
  return (
    <div
      className="border-line-strong bg-panel-deep flex aspect-[4/5] w-full items-center justify-center rounded-[20px] border"
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        className="text-fg-faint h-20 w-20"
      >
        <circle cx="12" cy="8.5" r="4" />
        <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
      </svg>
    </div>
  );
}

export function Owner() {
  return (
    <section className="border-line-soft border-t py-12 md:py-20 lg:py-26">
      <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <div>
          {owner.photo ? (
            <Image
              src={owner.photo}
              alt={owner.name}
              width={640}
              height={800}
              className="border-line-strong aspect-[4/5] w-full rounded-[20px] border object-cover"
            />
          ) : (
            <Monogram />
          )}
        </div>

        <div>
          <Eyebrow>{owner.eyebrow}</Eyebrow>
          <SectionHeading className="mt-3.5 max-w-[560px] md:mt-4.5">
            {owner.heading}
          </SectionHeading>

          <p className="mt-5 md:mt-6">
            <span className="font-display text-fg block text-[20px] font-semibold md:text-[22px]">
              {owner.name}
            </span>
            <span className="text-signal-text mt-1 block font-mono text-[11px] tracking-[0.14em] uppercase">
              {owner.role}
            </span>
          </p>

          <div className="mt-4 flex flex-col gap-3.5 md:mt-5">
            {owner.bio.map((paragraph) => (
              <p key={paragraph} className="text-fg-muted text-[16px] leading-relaxed md:text-[17px]">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-6 flex flex-col gap-2.5 md:mt-7">
            {owner.commitments.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="text-signal-text mt-1 h-4 w-4 shrink-0" strokeWidth={2} />
                <span className="text-fg-soft text-[15px] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

        </div>
      </Container>
    </section>
  );
}
