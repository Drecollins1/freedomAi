import type { ComponentProps, ReactNode } from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1160px] px-5 md:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={`font-mono text-fg-dim text-[11px] font-medium tracking-[0.18em] uppercase md:text-xs ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={`font-display text-[30px] leading-[1.06] font-semibold tracking-[-0.025em] text-balance md:text-[38px] lg:text-[48px] ${className}`}
    >
      {children}
    </h2>
  );
}

/** The one primary action, repeated down the page. */
export function CtaButton({
  variant = "solid",
  className = "",
  children,
  ...props
}: ComponentProps<"a"> & { variant?: "solid" | "outline" }) {
  const styles =
    variant === "solid"
      ? "bg-signal text-on-signal shadow-cta hover:bg-signal-soft"
      : "border border-signal text-signal-text hover:bg-signal/10";

  return (
    <a
      {...props}
      className={`font-display inline-flex h-[58px] items-center justify-center rounded-full px-8 text-[15px] font-bold tracking-[0.02em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-text md:h-[62px] md:px-9 md:text-[17px] ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

export function Hairline({ className = "" }: { className?: string }) {
  return <div className={`bg-line h-px ${className}`} aria-hidden />;
}
