import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { DevicePreviewStrip } from "@/components/sections/incident/DevicePreviewStrip";
import { EmphasisText } from "@/components/EmphasisText";

export function HeroWithPreviewStrip({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}) {
  return (
    <div>
      <section className="pt-28 sm:pt-40 lg:pt-60">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-balance text-[46px] leading-[0.98] tracking-tight sm:text-[68px]">
              <EmphasisText text={title} />
            </h1>
            {subtitle ? (
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-[16px] leading-7 text-[var(--muted)] sm:text-[17px]">
                {subtitle}
              </p>
            ) : null}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} size="lg" variant="secondary">
                {secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <DevicePreviewStrip />

      <div className="h-20" />
    </div>
  );
}

