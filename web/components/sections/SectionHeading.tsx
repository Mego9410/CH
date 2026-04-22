import { Container } from "@/components/Container";

export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Container>
      <div className="max-w-3xl">
        <h2 className="text-balance text-[26px] leading-tight font-semibold tracking-tight sm:text-[32px]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-[16px] leading-7 text-[var(--muted)]">
            {description}
          </p>
        ) : null}
      </div>
    </Container>
  );
}

