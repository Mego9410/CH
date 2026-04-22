"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

export type FaqItem = {
  q: string;
  a: string;
};

export function FaqAccordion({
  heading,
  items,
  defaultOpenIndex = 0,
}: {
  heading?: { title: string; body?: string };
  items: FaqItem[];
  defaultOpenIndex?: number;
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  const itemsEl = (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const open = idx === openIndex;
        return (
          <Reveal key={item.q} delayMs={idx * 60}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : idx)}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5 text-left shadow-sm shadow-black/5 transition hover:shadow-md hover:shadow-black/10"
              aria-expanded={open}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="text-[14px] font-semibold tracking-tight">
                  {item.q}
                </div>
                <div
                  className={[
                    "mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[16px] leading-none text-[var(--muted)] transition",
                    open ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                  aria-hidden
                >
                  ▾
                </div>
              </div>
              {open ? (
                <div className="mt-3 text-[13px] leading-6 text-[var(--muted)]">
                  {item.a}
                </div>
              ) : null}
            </button>
          </Reveal>
        );
      })}
    </div>
  );

  return (
    <section className="mt-32">
      <Container>
        {heading ? (
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
            <div className="max-w-md">
              <h2 className="font-serif text-balance text-[32px] leading-[1.05] tracking-tight sm:text-[40px]">
                {heading.title}
              </h2>
              {heading.body ? (
                <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
                  {heading.body}
                </p>
              ) : null}
            </div>

            {itemsEl}
          </div>
        ) : (
          <div>{itemsEl}</div>
        )}
      </Container>
    </section>
  );
}

