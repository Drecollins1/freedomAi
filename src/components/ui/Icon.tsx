type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const base = (className?: string) => ({
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className,
});

export function LogoMark({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(className)} strokeWidth={strokeWidth}>
      <path d="M3 17.5 8.5 10l4 4.5L21 5" />
      <path d="M15.5 5H21v5.5" />
    </svg>
  );
}

export function Check({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(className)} strokeWidth={strokeWidth}>
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  );
}

export function Cross({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(className)} strokeWidth={strokeWidth}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ChartIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(className)} strokeWidth={strokeWidth}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M8 10v4M12 8v6M16 11v3" />
    </svg>
  );
}

export function SearchIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(className)} strokeWidth={strokeWidth}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

export function BrainIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(className)} strokeWidth={strokeWidth}>
      <path d="M12 3a4 4 0 0 0-4 4v1a4 4 0 0 0 0 8v1a4 4 0 0 0 8 0v-1a4 4 0 0 0 0-8V7a4 4 0 0 0-4-4Z" />
    </svg>
  );
}

export function InfoIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(className)} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16.2v.1" />
    </svg>
  );
}

export function QuoteMark({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(className)} strokeWidth={strokeWidth}>
      <path d="M9 6c-3 1.5-4.5 4-4.5 7.5A4.5 4.5 0 0 0 9 18a3.5 3.5 0 0 0 0-7c-.6 0-1.1.1-1.5.3C7.8 9.6 8.6 8 10 7Z" />
      <path d="M19 6c-3 1.5-4.5 4-4.5 7.5A4.5 4.5 0 0 0 19 18a3.5 3.5 0 0 0 0-7c-.6 0-1.1.1-1.5.3C17.8 9.6 18.6 8 20 7Z" />
    </svg>
  );
}

export function ArrowRight({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(className)} strokeWidth={strokeWidth}>
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export const iconByName = {
  chart: ChartIcon,
  search: SearchIcon,
  brain: BrainIcon,
} as const;

export type IconName = keyof typeof iconByName;
