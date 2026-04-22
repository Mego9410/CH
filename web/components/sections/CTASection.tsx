import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { EmphasisText } from "@/components/EmphasisText";
import { Ornament } from "@/components/Ornament";

export function CTASection({
  title,
  body,
  cta,
}: {
  title: string;
  body?: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="mt-32">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_22px_65px_rgba(15,18,25,0.12)]">
          <Ornament
            name="sparkles"
            className="-left-10 -top-12 h-28 w-44 -rotate-[10deg]"
            opacity={0.22}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_320px_at_25%_0%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_60%)]"
          />

          <div className="relative grid gap-8 px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-xl">
              <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                Next step
              </div>
              <h2 className="mt-4 font-serif text-balance text-[30px] leading-[1.05] tracking-tight sm:text-[38px]">
                <EmphasisText text={title} />
              </h2>
              {body ? (
                <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
                  {body}
                </p>
              ) : null}
              <div className="mt-7 flex items-center gap-3">
                <Button href={cta.href} size="lg">
                  {cta.label}
                </Button>
                <div className="text-[13px] text-[var(--muted)]">
                  No commitment. No data sharing required.
                </div>
              </div>
            </div>

            {/* Visual preview (placeholder) */}
            <div className="relative">
              <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_55px_rgba(15,18,25,0.12)]">
                <div className="flex items-center justify-between">
                  <div className="text-[12px] font-semibold text-[var(--muted)]">
                    Example record
                  </div>
                  <div className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-semibold text-[var(--muted)]">
                    Preview
                  </div>
                </div>
                <div className="mt-4 grid gap-3">
                  {[
                    { t: "Timeline", d: "Chronological view of events" },
                    { t: "Search", d: "Find letters, results, prescriptions" },
                    { t: "References", d: "Source-linked entries" },
                  ].map((x) => (
                    <div
                      key={x.t}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4"
                    >
                      <div className="text-[12px] font-semibold">{x.t}</div>
                      <div className="mt-1 text-[12px] leading-5 text-[var(--muted)]">
                        {x.d}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] blur-2xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

