import { Fragment } from "react";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { LiveAnalysisCard } from "@/components/sections/LiveAnalysisCard";
import { imagine } from "@/lib/content";

/** Renders **emphasis** from the copy file without pulling in a markdown parser. */
function Emphasized({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="text-fg font-semibold not-italic">
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function Imagine() {
  return (
    <section className="bg-ink-raised border-line-soft border-t py-12 md:py-20 lg:py-26">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-[72px]">
        <div>
          <Eyebrow>{imagine.eyebrow}</Eyebrow>
          <SectionHeading className="mt-3.5 md:mt-4.5">{imagine.heading}</SectionHeading>

          <div className="mt-4.5 flex flex-col gap-3.5 md:mt-6.5 md:gap-4.5">
            {imagine.lines.map((line) => (
              <p key={line} className="text-fg-muted text-[16px] leading-relaxed md:text-[19px]">
                <Emphasized text={line} />
              </p>
            ))}
          </div>

          {/* The card sits here on mobile — between the promise and the kicker. */}
          <div className="mt-6 md:hidden">
            <LiveAnalysisCard />
          </div>

          <p className="border-signal mt-6 border-l-2 pl-4 md:mt-8.5 md:pl-5">
            <span className="font-display text-fg text-[19px] font-semibold md:text-[24px]">
              {imagine.kicker}
            </span>
          </p>
        </div>

        <div className="hidden justify-center md:flex">
          <LiveAnalysisCard framed />
        </div>
      </Container>
    </section>
  );
}
