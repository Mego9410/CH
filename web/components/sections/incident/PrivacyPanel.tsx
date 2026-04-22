import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { EmphasisText } from "@/components/EmphasisText";
import { Ornament } from "@/components/Ornament";

export function PrivacyPanel({
  eyebrow = "Privacy",
  title,
  body,
  chips,
  points,
  linkHref = "/privacy",
  linkLabel = "Read the privacy notice",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  chips: string[];
  points: { title: string; body: string }[];
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <section className="mt-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.25fr] lg:items-start">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
              {eyebrow}
            </div>
            <h2 className="mt-4 font-serif text-balance text-[34px] leading-[1.05] tracking-tight sm:text-[44px]">
              <EmphasisText text={title} />
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-7 text-[var(--muted)]">
              {body}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {chips.map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] px-3 py-1 text-[12px] font-semibold text-[var(--muted)]"
                >
                  {x}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href={linkHref}
                className="inline-flex items-center text-[13px] font-semibold text-[var(--accent)] hover:text-[var(--accent-2)] transition"
              >
                {linkLabel}
                <span aria-hidden className="ml-2">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <Ornament
              name="sparkles"
              className="right-[-26px] top-[-22px] h-28 w-44 rotate-[10deg]"
              opacity={0.16}
            />

            <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_22px_65px_rgba(15,18,25,0.12)]">
              <div className="relative p-8 sm:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_0%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_62%)]" />
                <div className="relative">
                  <div className="grid gap-4">
                    {points.map((p, idx) => (
                      <Reveal key={p.title} delayMs={idx * 70}>
                        <div className="rounded-3xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="text-[14px] font-semibold tracking-tight">
                                {p.title}
                              </div>
                              <div className="mt-2 text-[13px] leading-6 text-[var(--muted)]">
                                {p.body}
                              </div>
                            </div>
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[12px] font-semibold text-[var(--muted)]">
                              {idx + 1}
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

