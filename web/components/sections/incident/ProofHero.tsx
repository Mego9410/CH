import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { EmphasisText } from "@/components/EmphasisText";

export function ProofHero() {
  return (
    <section className="mt-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              "Privacy-first",
              "You own the files",
              "Deleted after delivery",
              "No cookies",
              "UK-based",
            ].map((x) => (
              <span
                key={x}
                className="rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] px-3 py-1 text-[12px] font-semibold text-[var(--muted)]"
              >
                {x}
              </span>
            ))}
          </div>

          <h2 className="mt-6 font-serif text-balance text-[34px] leading-[1.05] tracking-tight sm:text-[44px]">
            <EmphasisText text="*Trust* is the product." />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-[15px] leading-7 text-[var(--muted)]">
            Your record can include sensitive and surprising details. The process is designed to minimise exposure and maximise your control.
          </p>
        </div>

        <Reveal delayMs={120}>
          <div className="mt-12 overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_60px_rgba(15,18,25,0.14)]">
            <div className="grid gap-0 lg:grid-cols-[1.6fr_1fr]">
              <div className="relative min-h-[240px] bg-[linear-gradient(110deg,rgba(30,58,95,0.12),rgba(30,58,95,0.03),rgba(255,255,255,0.15))] p-10">
                <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Example deliverable (placeholder)
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    { k: "Timeline", v: "Chronological view" },
                    { k: "Search", v: "Keyword + filters" },
                    { k: "References", v: "Source-linked" },
                    { k: "Exports", v: "Files you own" },
                  ].map((x) => (
                    <div
                      key={x.k}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-4"
                    >
                      <div className="text-[11px] font-semibold text-[var(--muted)]">
                        {x.k}
                      </div>
                      <div className="mt-2 font-serif text-[18px] tracking-tight">
                        {x.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10">
                <div className="font-serif text-[22px] leading-8 tracking-tight">
                  “I feel empowered to have all my NHS records in one place.”
                </div>
                <div className="mt-4 text-[14px] leading-6 text-[var(--muted)]">
                  — Clare Relton, early client
                </div>
                <div className="mt-8 space-y-3 text-[13px] leading-6 text-[var(--muted)]">
                  <div className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span>Pseudonymisation early in the process.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span>Encrypted storage and restricted access.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span>Deletion after delivery.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

