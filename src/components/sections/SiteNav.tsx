import { Container } from "@/components/ui/Primitives";
import { LogoMark } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cta, site } from "@/lib/content";

export function SiteNav({
  sessionDate,
  sessionTime,
}: {
  sessionDate: string;
  sessionTime: string;
}) {
  return (
    <header className="border-line-soft border-b">
      <Container className="flex items-center justify-between py-[18px] md:py-[26px]">
        <div className="flex items-center gap-2.5">
          <LogoMark className="text-signal-text h-5 w-5 md:h-[22px] md:w-[22px]" />
          <span className="font-display text-[15px] font-semibold tracking-[-0.01em] md:text-[17px]">
            {site.name}
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <span className="text-fg-dim hidden font-mono text-xs tracking-[0.14em] uppercase lg:inline">
            Next live session · {sessionDate} · {sessionTime}
          </span>

          {/* Mobile keeps a compact badge; the full CTA lives in the hero. */}
          <span className="border-signal/30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 md:hidden">
            <span className="bg-signal h-1.5 w-1.5 rounded-full" />
            <span className="text-signal-text font-mono text-[10px] tracking-[0.14em] uppercase">
              Free
            </span>
          </span>

          <ThemeToggle />

          <a
            href="#register"
            className="bg-signal text-on-signal font-display hover:bg-signal-soft focus-visible:outline-signal-text hidden h-11 items-center rounded-full px-[22px] text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 md:inline-flex"
          >
            {cta.nav}
          </a>
        </div>
      </Container>
    </header>
  );
}
