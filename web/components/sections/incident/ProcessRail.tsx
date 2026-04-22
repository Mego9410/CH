import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { EmphasisText } from "@/components/EmphasisText";

export type RailStep = {
  title: string;
  body: string;
  meta?: string;
};

export function ProcessRail({
  eyebrow,
  title,
  body,
  steps,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  steps: RailStep[];
}) {
  return (
    <section className="mt-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          <div className="max-w-md">
            {eyebrow ? (
              <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                {eyebrow}
              </div>
            ) : null}
            <h2 className="mt-4 font-serif text-balance text-[34px] leading-[1.05] tracking-tight sm:text-[44px]">
              <EmphasisText text={title} />
            </h2>
            {body ? (
              <p className="mt-5 text-[15px] leading-7 text-[var(--muted)]">
                {body}
              </p>
            ) : null}
          </div>

          <div className="relative">
            {/* rail */}
            <div className="absolute left-[18px] top-0 hidden h-full w-px bg-[var(--border)] md:block" />
            <div className="space-y-4">
              {steps.map((s, idx) => (
                <Reveal key={s.title} delayMs={idx * 70}>
                  <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_18px_45px_rgba(15,18,25,0.10)]">
                    <div className="flex items-start gap-4">
                      <div className="relative mt-0.5 hidden md:block">
                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--accent-wash)] text-[12px] font-bold text-[var(--accent)]">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="min-w-0">
                        {s.meta ? (
                          <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                            {s.meta}
                          </div>
                        ) : null}
                        <div className="mt-1 font-serif text-[22px] leading-7 tracking-tight">
                          {s.title}
                        </div>
                        <div className="mt-2 text-[14px] leading-7 text-[var(--muted)]">
                          {s.body}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

