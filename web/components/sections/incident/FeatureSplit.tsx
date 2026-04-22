import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { EmphasisText } from "@/components/EmphasisText";

export function FeatureSplit({
  eyebrow,
  title,
  body,
  cards,
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  cards: { title: string; body: string; tone?: "default" | "muted" }[];
  reverse?: boolean;
}) {
  return (
    <section className="mt-32">
      <Container>
        <div
          className={[
            "grid gap-10 lg:grid-cols-[1.05fr_1.25fr] lg:items-start",
            reverse ? "lg:grid-cols-[1.25fr_1.05fr]" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={reverse ? "lg:order-2" : ""}>
            {eyebrow ? (
              <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                {eyebrow}
              </div>
            ) : null}
            <h2 className="mt-4 font-serif text-balance text-[34px] leading-[1.05] tracking-tight sm:text-[44px]">
              <EmphasisText text={title} />
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-7 text-[var(--muted)]">
              {body}
            </p>
          </div>

          <div className={reverse ? "lg:order-1" : ""}>
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map((c, idx) => {
                const tone = c.tone ?? "default";
                const bg =
                  tone === "muted" ? "bg-[var(--surface-2)]" : "bg-[var(--surface)]";
                return (
                  <Reveal key={c.title} delayMs={idx * 70}>
                    <div
                      className={[
                        "flex min-h-[176px] flex-col rounded-3xl border border-[var(--border)] p-6 shadow-[0_16px_40px_rgba(15,18,25,0.06)] sm:min-h-[192px]",
                        bg,
                      ].join(" ")}
                    >
                      <div className="text-[14px] font-semibold tracking-tight">
                        {c.title}
                      </div>
                      <div className="mt-2 text-[13px] leading-6 text-[var(--muted)]">
                        {c.body}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

