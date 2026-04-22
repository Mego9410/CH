"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Markdown } from "@/components/Markdown";

export type StepItem = {
  title: string;
  body: string;
};

export function StepsAccordion({
  steps,
  defaultOpenIndex = 0,
}: {
  steps: StepItem[];
  defaultOpenIndex?: number;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  return (
    <div className="space-y-3">
      {steps.map((step, idx) => {
        const n = idx + 1;
        const open = idx === openIndex;
        const panelId = `${baseId}-panel-${idx}`;
        const buttonId = `${baseId}-button-${idx}`;

        return (
          <Reveal key={`${n}-${step.title}`} delayMs={idx * 60}>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_18px_45px_rgba(15,18,25,0.10)] transition hover:-translate-y-[1px] hover:shadow-[0_22px_55px_rgba(15,18,25,0.14)]">
              <button
                id={buttonId}
                type="button"
                className="w-full text-left"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : idx)}
              >
                <div className="px-7 py-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                        Step {n}
                      </div>
                      <div className="mt-1 font-serif text-[20px] leading-7 tracking-tight">
                        {step.title}
                      </div>
                    </div>

                    <div
                      className={[
                        "mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] text-[16px] leading-none text-[var(--muted)] transition motion-reduce:transition-none",
                        open ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                      aria-hidden
                    >
                      ▾
                    </div>
                  </div>
                </div>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={[
                  "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-[var(--border)] px-7 py-6">
                    <Markdown markdown={step.body} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

