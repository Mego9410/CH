import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

const nav = [
  { href: "/", label: "Home" },
  { href: "/for-you", label: "For You?" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/privacy", label: "Privacy" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
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
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium tracking-tight text-[var(--muted)] hover:text-[var(--foreground)] transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contact" variant="secondary" size="md">
            Get in Touch
          </Button>
        </div>
      </Container>
    </header>
  );
}

