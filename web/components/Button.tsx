import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-white shadow-[0_1px_0_rgba(0,0,0,0.06)] hover:bg-white hover:text-[var(--accent)] hover:border hover:border-[color-mix(in_srgb,var(--accent)_35%,transparent)] hover:-translate-y-[1px]",
  secondary:
    "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] shadow-[0_1px_0_rgba(0,0,0,0.03)] hover:bg-[var(--accent)] hover:text-white hover:border-[color-mix(in_srgb,var(--accent)_60%,transparent)] hover:-translate-y-[1px]",
  ghost: "text-[var(--foreground)] hover:bg-[var(--surface-2)]",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-[14px]",
  lg: "h-12 px-7 text-[14px]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[base, variants[variant], sizes[size], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Link>
  );
}

