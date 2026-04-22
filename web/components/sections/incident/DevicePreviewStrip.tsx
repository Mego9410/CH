"use client";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function ParallaxHover({
  children,
  className,
  strength = 0.9,
  radiusPx = 260,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radiusPx?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled] = useState(() => !prefersReducedMotion());
  const raf = useRef<number | null>(null);
  const latest = useRef<{ cx: number; cy: number } | null>(null);

  const baseStyle = useMemo(() => {
    return {
      transform:
        "perspective(1200px) translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1)",
    } satisfies CSSProperties;
  }, []);

  function apply(x: number, y: number, proximity: number) {
    const el = ref.current;
    if (!el) return;

    // Small, premium-feeling motion (incident-ish): mostly translate, a touch of tilt.
    const p = Math.max(0, Math.min(1, proximity));
    // Ease-in so "near" has presence, and "close" feels more intentional.
    const pe = p * p;
    const tx = x * 16 * strength * pe;
    const ty = y * 16 * strength * pe;
    const ry = x * 8.5 * strength * pe;
    const rx = -y * 7.5 * strength * pe;
    const s = 1 + 0.02 * pe;

    el.style.transform = `perspective(1200px) translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`;
  }

  function schedule() {
    if (raf.current != null) return;
    raf.current = window.requestAnimationFrame(() => {
      raf.current = null;
      const p = latest.current;
      if (!p) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = p.cx - cx;
      const dy = p.cy - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = 1 - dist / radiusPx;
      if (proximity <= 0) {
        el.style.transform =
          "perspective(1200px) translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1)";
        return;
      }
      const x = Math.max(-1, Math.min(1, dx / (r.width / 2)));
      const y = Math.max(-1, Math.min(1, dy / (r.height / 2)));
      apply(x, y, proximity);
    });
  }

  useEffect(() => {
    if (!enabled) return;

    function onMove(e: PointerEvent) {
      latest.current = { cx: e.clientX, cy: e.clientY };
      schedule();
    }

    function onLeaveWindow() {
      latest.current = null;
      const el = ref.current;
      if (!el) return;
      el.style.transform =
        "perspective(1200px) translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1)";
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeaveWindow);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeaveWindow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, radiusPx, strength]);

  return (
    <div
      ref={ref}
      className={[
        "will-change-transform transition-transform duration-200 ease-out",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={baseStyle}
    >
      {children}
    </div>
  );
}

function Frame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_18px_45px_rgba(15,18,25,0.10)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="absolute inset-x-0 top-0 h-10 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]" />
      <div className="absolute left-5 top-4 flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--foreground)_18%,transparent)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)]" />
      </div>
      <div className="relative pt-12">{children}</div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="relative mx-auto w-[220px] overflow-hidden rounded-[34px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_55px_rgba(15,18,25,0.14)]">
      <div className="h-11 border-b border-[var(--border)] bg-[var(--surface-2)]" />
      <div className="p-4">
        <div className="text-[11px] font-semibold text-[var(--muted)]">
          Timeline
        </div>
        <div className="mt-3 space-y-3">
          {[
            { t: "Prescription", d: "Updated medication" },
            { t: "Test result", d: "Lab report received" },
            { t: "Letter", d: "Hospital correspondence" },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
            >
              <div className="text-[12px] font-semibold">{x.t}</div>
              <div className="mt-1 text-[11px] text-[var(--muted)]">{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <Frame className="h-[360px]">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-semibold">Record review</div>
          <div className="rounded-full bg-[var(--accent-wash)] px-3 py-1 text-[11px] font-semibold text-[var(--accent)]">
            In progress
          </div>
        </div>
        <div className="mt-5 space-y-3">
          <div className="max-w-[85%] rounded-2xl bg-[var(--surface-2)] p-3 text-[12px] leading-5 text-[var(--foreground)]">
            I’ve requested your GP record via a Subject Access Request. Next I’ll
            organise it chronologically and make it searchable.
          </div>
          <div className="ml-auto max-w-[85%] rounded-2xl bg-[var(--accent-wash)] p-3 text-[12px] leading-5 text-[var(--foreground)]">
            Great — what should I expect to receive back?
          </div>
          <div className="max-w-[85%] rounded-2xl bg-[var(--surface-2)] p-3 text-[12px] leading-5 text-[var(--foreground)]">
            Typically a large PDF plus exports. Older records may include scans
            and handwritten notes; those get transcribed and structured.
          </div>
        </div>
      </div>
    </Frame>
  );
}

function DashboardMock() {
  return (
    <Frame className="h-[360px]">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-semibold">Your record</div>
          <div className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-semibold text-[var(--muted)]">
            Search
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            { t: "Consultations", v: "Decades" },
            { t: "Letters", v: "Scanned + OCR" },
            { t: "Results", v: "Linked & dated" },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="text-[11px] font-semibold text-[var(--muted)]">
                {x.t}
              </div>
              <div className="mt-2 font-serif text-[18px] tracking-tight">
                {x.v}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="text-[11px] font-semibold text-[var(--muted)]">
            Recent items
          </div>
          <div className="mt-3 space-y-2">
            {[
              "Blood test: Full blood count",
              "Referral: Specialist clinic",
              "Letter: discharge summary",
            ].map((x) => (
              <div key={x} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <div className="text-[12px] text-[var(--foreground)]">{x}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function DevicePreviewStrip() {
  return (
    <section className="mt-14">
      <Container>
        <div className="grid items-end gap-5 lg:grid-cols-[260px_1fr_1fr]">
          <Reveal>
            <ParallaxHover className="hidden lg:block" strength={1.05} radiusPx={300}>
              <PhoneMock />
            </ParallaxHover>
          </Reveal>
          <Reveal delayMs={100}>
            <ParallaxHover strength={1.15} radiusPx={320}>
              <ChatMock />
            </ParallaxHover>
          </Reveal>
          <Reveal delayMs={160}>
            <ParallaxHover strength={1.15} radiusPx={320}>
              <DashboardMock />
            </ParallaxHover>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

