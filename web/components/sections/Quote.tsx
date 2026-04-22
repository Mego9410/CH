import { Container } from "@/components/Container";
import { EmphasisText } from "@/components/EmphasisText";

export function Quote({
  quote,
  attribution,
}: {
  quote: string;
  attribution?: string;
}) {
  return (
    <section className="mt-32">
      <Container>
        <figure className="mx-auto max-w-4xl">
          <blockquote className="text-balance text-center font-serif text-[30px] leading-[1.15] tracking-tight text-[color-mix(in_srgb,var(--foreground)_72%,transparent)] sm:text-[40px]">
            <EmphasisText text={quote} />
          </blockquote>
          {attribution ? (
            <figcaption className="mt-8 text-center text-[13px] font-semibold tracking-tight text-[var(--muted)]">
              {attribution}
            </figcaption>
          ) : null}
        </figure>
      </Container>
    </section>
  );
}

