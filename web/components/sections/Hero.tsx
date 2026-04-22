import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Ornament } from "@/components/Ornament";
import { EmphasisText } from "@/components/EmphasisText";

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  ornament = "sparkles",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  ornament?: "serversBolt" | "sparkles" | "pillCluster" | "none";
}) {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      {ornament !== "none" ? (
        <Ornament
          name={ornament}
          className="right-[-84px] top-[-34px] h-36 w-60 rotate-[10deg]"
          opacity={0.10}
        />
      ) : null}
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
              {eyebrow}
            </div>
          ) : null}
          <h1 className="mt-5 font-serif text-balance text-[42px] leading-[0.98] tracking-tight sm:text-[58px]">
            <EmphasisText text={title} />
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-[16px] leading-7 text-[var(--muted)] sm:text-[17px]">
              {subtitle}
            </p>
          ) : null}

          {primaryCta || secondaryCta ? (
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {primaryCta ? (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button href={secondaryCta.href} variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

