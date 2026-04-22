import { Reveal } from "@/components/Reveal";

export type Step = {
  title: string;
  subtitle?: string;
  body: string;
};

export function Stepper({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative space-y-4">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[17px] top-6 bottom-6 w-px bg-[color-mix(in_srgb,var(--foreground)_9%,transparent)]"
      />

      {steps.map((step, idx) => {
        const n = idx + 1;
        return (
          <li key={`${n}-${step.title}`} className="relative pl-16">
            <Reveal delayMs={idx * 60}>
              <div>
                <div className="absolute left-0 top-7 grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm shadow-black/5">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-[var(--accent-wash)] text-[12px] font-semibold text-[var(--accent)]">
                    {n}
                  </div>
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute left-[40px] top-[34px] h-px w-5 bg-[color-mix(in_srgb,var(--foreground)_9%,transparent)]"
                />

                <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-7 py-6 shadow-[0_18px_45px_rgba(15,18,25,0.10)] transition hover:-translate-y-[1px] hover:shadow-[0_22px_55px_rgba(15,18,25,0.14)]">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                        Step {n}
                      </div>
                      <div className="mt-1 font-serif text-[20px] leading-7 tracking-tight">
                        {step.title}
                      </div>
                    </div>

                    {step.subtitle ? (
                      <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] px-4 py-2 text-[12px] font-semibold text-[var(--muted)]">
                        {step.subtitle}
                      </div>
                    ) : null}
                  </div>

                  {step.body?.trim() ? (
                    <div className="mt-4 whitespace-pre-line text-[14px] leading-7 text-[var(--muted)]">
                      {step.body}
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

