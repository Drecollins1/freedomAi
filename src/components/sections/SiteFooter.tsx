import { Container } from "@/components/ui/Primitives";
import { LogoMark } from "@/components/ui/Icon";
import { footer, site } from "@/lib/content";

export function SiteFooter({ companyLine }: { companyLine: string }) {
  return (
    <footer className="border-line bg-footer border-t py-8 md:py-12 lg:pt-12 lg:pb-14">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-15">
          <div className="flex items-center gap-2.5">
            <LogoMark className="text-signal-text h-5 w-5" />
            <span className="font-display text-base font-semibold">{site.name}</span>
          </div>

          <p className="text-fg-dim max-w-[660px] text-[13px] leading-relaxed">
            <strong className="text-fg-dim font-semibold">{footer.disclaimerLead}</strong>{" "}
            {footer.disclaimer}
            {companyLine && ` ${companyLine}`}
          </p>
        </div>

        <div className="border-line-soft mt-7 flex flex-col gap-4 border-t pt-6 md:mt-9 md:flex-row md:items-center md:justify-between">
          <span className="text-fg-faint font-mono text-xs">
            © {site.year} {site.name}. All rights reserved.
          </span>

          <nav className="flex items-center gap-6">
            {footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-fg-dim hover:text-fg focus-visible:outline-signal-text text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
