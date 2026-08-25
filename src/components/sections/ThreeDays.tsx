import { Container, Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { days } from "@/lib/content";

export function ThreeDays() {
  return (
    <section className="py-12 md:py-20 lg:py-26">
      <Container>
        <Eyebrow>{days.eyebrow}</Eyebrow>
        <SectionHeading className="mt-3.5 max-w-[720px] md:mt-4">{days.heading}</SectionHeading>

        <ol className="mt-6 md:mt-13">
          {days.items.map((day, i) => (
            <li
              key={day.number}
              className={`border-line grid grid-cols-[auto_1fr] items-baseline gap-x-4.5 gap-y-1.5 border-t py-5 md:grid-cols-[120px_300px_1fr] md:gap-10 md:py-8.5 ${
                i === days.items.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="font-display text-signal-text text-[26px] leading-none font-bold tracking-[-0.03em] md:text-[40px]">
                {day.number}
              </span>
              <h3 className="font-display text-[19px] font-semibold uppercase md:text-[28px]">
                {day.title}
              </h3>
              <p className="text-fg-muted col-span-2 text-[15px] leading-relaxed md:col-span-1 md:text-[18px]">
                {day.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
