import { Container } from "@/components/ui/Primitives";
import { ArrowRight } from "@/components/ui/Icon";
import { HeroChart } from "@/components/sections/HeroChart";
import { hero } from "@/lib/content";

function HeroCta({ telegramInviteUrl }: { telegramInviteUrl: string }) {
  return (
    <a
      href={telegramInviteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-signal text-on-signal hover:bg-signal-soft focus-visible:outline-signal-text group flex w-full max-w-[440px] items-center justify-between gap-4 rounded-full py-3 pr-3 pl-7 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 md:py-3.5 md:pr-3.5 md:pl-9"
    >
      <span className="font-billboard text-left text-[15px] leading-[1.15] font-extrabold tracking-[0.01em] uppercase md:text-[19px]">
        {hero.ctaLine1}
        <br />
        {hero.ctaLine2}
      </span>
      <span className="bg-on-signal text-signal flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 md:h-12 md:w-12">
        <ArrowRight className="h-5 w-5" strokeWidth={2} />
      </span>
    </a>
  );
}

export function Hero({ telegramInviteUrl }: { telegramInviteUrl: string }) {
  return (
    <section className="relative overflow-hidden py-8 md:py-14 lg:py-20">
      <div className="grid-veil pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        <div>
          <div className="border-line-strong bg-wash flex w-fit items-center gap-2.5 rounded-full border py-2 pr-4 pl-3">
            <span className="bg-signal h-2 w-2 rounded-full" aria-hidden />
            <span className="font-display text-[11px] font-medium tracking-[0.16em] uppercase md:text-lg">
              <span className="text-signal-text">{hero.badgeAccent}</span>{" "}
              <span className="text-fg">{hero.badgeRest}</span>
            </span>
          </div>


          <h1 className="font-billboard mt-5 font-extrabold tracking-[-0.02em] md:mt-3.5">
            {/* Mobile: sentence case, numbers spelled out. */}
            <span className="block text-[40px] leading-[1.06] tracking-[-0.03em] md:hidden">
              <span className="text-fg">{hero.headline.mobile.plain} </span>
              <span className="text-signal-text">{hero.headline.mobile.accent}</span>
            </span>

            {/* Desktop: the caps billboard. */}
            <span className="hidden text-[54px] leading-[0.94] uppercase md:block lg:text-[68px] xl:text-[76px]">
              <span className="text-fg block">{hero.headline.desktop.plain}</span>
              <span className="text-signal-text block">{hero.headline.desktop.accent}</span>
            </span>
          </h1>

          <div className="bg-signal mt-7 hidden h-[3px] w-14 md:block" aria-hidden />

          <p className="text-fg-muted mt-5 max-w-[440px] text-[16px] leading-[1.65] md:mt-6 md:text-[17px]">
            {hero.body}
          </p>

          {/* On mobile the chart sits between the copy and the button. */}
          <div className="mt-7 lg:hidden">
            <HeroChart />
          </div>

          <div className="mt-7 md:mt-9">
            <HeroCta telegramInviteUrl={telegramInviteUrl} />
          </div>
        </div>

        <div className="hidden lg:block">
          <HeroChart />
        </div>
      </Container>
    </section>
  );
}
