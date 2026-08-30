import Image from "next/image";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { Check } from "@/components/ui/Icon";
import { media, telegram } from "@/lib/content";

function TelegramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.7 3.4 2.9 10.6c-1.1.4-1.1 1.1-.2 1.4l4.7 1.5 1.8 5.5c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.2-2.2 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14c.3-1.2-.5-1.8-1.6-1.3ZM7.6 13.1l9.9-6.2c.4-.3.8-.1.5.2l-8.4 7.6-.3 3.4-1.7-5Z" />
    </svg>
  );
}

function ChannelHeader({ members }: { members: string }) {
  return (
    <div className="border-line-soft flex items-center gap-3 border-b px-4 py-3.5 md:px-5">
      <span className="bg-[#2AABEE] flex h-9 w-9 items-center justify-center rounded-full text-white">
        <TelegramGlyph className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-display truncate text-sm font-semibold">{telegram.thread.channel}</p>
        <p className="text-fg-dim truncate text-xs">{members}</p>
      </div>
    </div>
  );
}

function SetupMessage({
  message,
}: {
  message: Extract<(typeof telegram.thread.messages)[number], { kind: "setup" }>;
}) {
  return (
    <div className="border-signal/25 bg-signal/[0.07] rounded-2xl rounded-tl-sm border p-3.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-signal-text font-mono text-[10px] tracking-[0.14em] uppercase">
          {message.label}
        </span>
        <span className="font-display text-sm font-semibold">{message.pair}</span>
      </div>

      <ul className="mt-3 flex flex-col gap-1.5">
        {message.lines.map((line) => (
          <li key={line} className="flex items-start gap-2">
            <Check className="text-signal-text mt-[3px] h-3.5 w-3.5 shrink-0" />
            <span className="text-fg-soft text-[13px] leading-snug">{line}</span>
          </li>
        ))}
      </ul>

      <p className="border-line-soft text-fg-dim mt-3 border-t pt-2.5 text-[11px] leading-snug">
        {message.footer}
      </p>

      <p className="text-fg-faint mt-2 text-right font-mono text-[10px]">{message.time}</p>
    </div>
  );
}

function MockThread({ members }: { members: string }) {
  return (
    <div className="border-line-strong bg-panel shadow-device overflow-hidden rounded-[20px] border">
      <ChannelHeader members={members} />

      <div className="flex flex-col gap-2.5 px-4 py-4 md:px-5 md:py-5">
        {telegram.thread.messages.map((message, i) =>
          message.kind === "setup" ? (
            <SetupMessage key={i} message={message} />
          ) : (
            <div
              key={i}
              className="border-line-soft bg-wash max-w-[86%] rounded-2xl rounded-tl-sm border px-3.5 py-2.5"
            >
              <p className="text-fg-soft text-[13px] leading-snug">{message.body}</p>
              <p className="text-fg-faint mt-1.5 text-right font-mono text-[10px]">
                {message.time}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export function TelegramFlow({ members }: { members: string }) {
  return (
    <section className="border-line-soft border-t py-12 md:py-20 lg:py-26">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
        <div>
          <Eyebrow>{telegram.eyebrow}</Eyebrow>
          <SectionHeading className="mt-3.5 max-w-[560px] md:mt-4.5">
            {telegram.heading}
          </SectionHeading>
          <p className="text-fg-muted mt-4 max-w-[520px] text-[16px] leading-relaxed md:mt-5 md:text-[18px]">
            {telegram.body}
          </p>

          <ol className="mt-7 flex flex-col gap-4 md:mt-9 md:gap-5">
            {telegram.steps.map((step) => (
              <li key={step.number} className="flex gap-4">
                <span className="border-line bg-panel-deep font-display text-signal-text flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[13px] font-bold">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-[17px] font-semibold md:text-[19px]">
                    {step.title}
                  </h3>
                  <p className="text-fg-muted mt-1 text-[15px] leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          {media.telegramScreenshot ? (
            <Image
              src={media.telegramScreenshot}
              alt="A post in the Freedom AI Telegram channel"
              width={420}
              height={620}
              className="border-line-strong shadow-device h-auto w-full rounded-[20px] border"
            />
          ) : (
            <MockThread members={members} />
          )}

          <p className="text-fg-faint mt-3 text-center text-[11px] leading-snug">
            {telegram.note}
          </p>
        </div>
      </Container>
    </section>
  );
}
