 "use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/for-you", label: "For You?" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/privacy", label: "Privacy" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = useMemo(() => {
    return nav.map((x) => ({
      ...x,
      active: pathname === x.href,
    }));
  }, [pathname]);

  useEffect(() => {
    // Close menu on route change.
    if (!open) return;
    queueMicrotask(() => setOpen(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    // Prevent background scroll when menu is open.
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur">
      <Container className="flex h-[72px] items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Chronicle Health home">
          <span className="relative h-9 w-9 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm shadow-black/5">
            <Image
              src="/brand/ch-monogram.jpeg"
              alt="Chronicle Health monogram"
              fill
              className="object-cover"
              sizes="36px"
              priority
            />
          </span>
          <span className="font-serif text-[16px] font-semibold tracking-tight">
            Chronicle Health
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "text-[13px] font-medium tracking-tight transition",
                item.active
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm shadow-black/5 transition hover:bg-[var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="grid gap-1">
              <span className={["h-0.5 w-5 bg-current transition", open ? "translate-y-[6px] rotate-45" : ""].join(" ")} />
              <span className={["h-0.5 w-5 bg-current transition", open ? "opacity-0" : ""].join(" ")} />
              <span className={["h-0.5 w-5 bg-current transition", open ? "-translate-y-[6px] -rotate-45" : ""].join(" ")} />
            </span>
          </button>
          <Button href="/contact" variant="secondary" size="md">
            Get in Touch
          </Button>
        </div>
      </Container>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 right-0 top-[72px] border-b border-[var(--border)] bg-[var(--background)] shadow-[0_18px_45px_rgba(15,18,25,0.10)]">
            <Container className="py-6">
              <div className="grid gap-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "flex items-center justify-between rounded-2xl border px-5 py-4 text-[15px] font-medium tracking-tight transition",
                      item.active
                        ? "border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] bg-[var(--accent-wash)] text-[var(--foreground)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-2)]",
                    ].join(" ")}
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden className="text-[var(--muted)]">
                      →
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-[13px] leading-6 text-[var(--muted)]">
                Prefer to jump straight in?{" "}
                <Link href="/contact" className="font-semibold text-[var(--accent)] hover:underline">
                  Get in touch
                </Link>
                .
              </div>
            </Container>
          </div>
        </div>
      ) : null}
    </header>
  );
}

