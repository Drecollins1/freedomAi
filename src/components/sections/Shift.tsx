import { Fragment } from "react";
import { Container, Eyebrow, Hairline, SectionHeading } from "@/components/ui/Primitives";
import { shift } from "@/lib/content";

export function Shift() {
  return (
    <section className="border-line border-t py-12 md:py-20 lg:py-[104px]">
      <Container className="grid items-start gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
        <div>
          <Eyebrow>{shift.eyebrow}</Eyebrow>
          <SectionHeading className="mt-4 md:mt-[18px]">{shift.heading}</SectionHeading>
        </div>

        <div className="flex flex-col gap-5 md:gap-[22px]">
          {shift.lines.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <Hairline />}
              <p className="text-fg-soft text-[17px] leading-relaxed md:text-[20px]">{line}</p>
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
