import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { EmphasisText } from "@/components/EmphasisText";

export type BentoItem = {
  title: string;
  body: string;
  variant?: "default" | "muted" | "accent";
};

export function BentoGrid({
  heading,
  items,
}: {
  heading: { title: string; body?: string; linkLabel?: string; linkHref?: string };
  items: BentoItem[];
  cta?: { label: string; href: string };
}) {
  return (
    <section className="mt-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.9fr] lg:items-start">
          <div className="max-w-md">
            <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
              Built on rock-solid foundations
            </div>
            <h2 className="mt-4 font-serif text-balance text-[30px] leading-[1.05] tracking-tight sm:text-[38px]">
              <EmphasisText text={heading.title} />
            </h2>
            {heading.body ? (
              <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
                {heading.body}
              </p>
            ) : null}
            {heading.linkLabel && heading.linkHref ? (
              <a
                href={heading.linkHref}
                className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--accent)] hover:underline"
              >
                {heading.linkLabel} <span aria-hidden>→</span>
              </a>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item, idx) => {
              const variant = item.variant ?? "default";
              const card =
                variant === "accent"
                  ? "bg-[var(--accent)] text-white border-transparent"
                  : variant === "muted"
                    ? "bg-[var(--surface-2)] border-[var(--border)]"
                    : "bg-[var(--surface)] border-[var(--border)]";

              const body =
                variant === "accent"
                  ? "text-white/80"
                  : "text-[var(--muted)]";

              return (
                <Reveal key={item.title} delayMs={idx * 70}>
                  <div
                    className={[
                      "flex min-h-[168px] flex-col rounded-3xl border p-6 shadow-[0_16px_40px_rgba(15,18,25,0.06)] sm:min-h-[190px]",
                      card,
                    ].join(" ")}
                  >
                    <div className="text-[14px] font-semibold tracking-tight">
                      {item.title}
                    </div>
                    <div className={["mt-2 text-[13px] leading-6", body].join(" ")}>
                      {item.body}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

