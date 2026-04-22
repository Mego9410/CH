import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Ornament } from "@/components/Ornament";

export type HorizontalStep = {
  number: number;
  title: string;
  subtitle?: string;
};

export function HorizontalSteps({
  heading,
  steps,
  link,
}: {
  heading: string;
  steps: HorizontalStep[];
  link?: { label: string; href: string };
}) {
  return (
    <section className="mt-32">
      <Container>
        <div className="relative py-10">
          <Ornament
            name="serversBolt"
            className="-right-10 -top-16 h-40 w-64 rotate-[6deg]"
            opacity={0.18}
          />
          <div className="text-center">
            <h2 className="font-serif text-[28px] leading-tight tracking-tight sm:text-[34px]">
              {heading}
            </h2>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div
                aria-hidden
                className="absolute left-0 right-0 top-[18px] h-px bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)]"
              />

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-5">
                {steps.map((s, idx) => (
                  <Reveal key={s.number} delayMs={idx * 60}>
                    <div className="text-center">
                      <div className="relative mx-auto h-9 w-9">
                        <div className="absolute inset-0 rounded-full bg-[var(--background)]" />
                        <div className="absolute inset-0 grid place-items-center rounded-full border border-[var(--border)] bg-[var(--background)] shadow-sm shadow-black/5">
                          <div className="grid h-7 w-7 place-items-center rounded-full bg-[var(--accent)] text-[12px] font-bold text-white">
                            {s.number}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 text-[13px] font-semibold tracking-tight">
                        {s.title}
                      </div>
                      {s.subtitle ? (
                        <div className="mx-auto mt-1 max-w-[160px] text-[12px] leading-5 text-[var(--muted)]">
                          {s.subtitle}
                        </div>
                      ) : null}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {link ? (
            <div className="mt-10 text-center">
              <Link
                href={link.href}
                className="text-[13px] font-semibold text-[var(--accent)] hover:underline"
              >
                {link.label} <span aria-hidden>→</span>
              </Link>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

