import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { EmphasisText } from "@/components/EmphasisText";

export function BenefitsBento({
  title,
  items,
}: {
  title: string;
  items: { title: string; body: string }[];
}) {
  const tiles = items.filter((x) => x.title && x.body);

  return (
    <section className="mt-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-balance text-[34px] leading-[1.05] tracking-tight sm:text-[44px]">
            <EmphasisText text={title} />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-7 text-[var(--muted)]">
            Practical reasons, not platitudes. The point is to stop guessing and
            start referencing.
          </p>
        </div>
      </Container>

      <Container className="mt-10">
        <div className="grid gap-4 lg:grid-cols-2">
          {tiles.map((t, idx) => (
            <Reveal key={t.title} delayMs={idx * 70}>
              <div
                className="flex min-h-[200px] flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_18px_45px_rgba(15,18,25,0.10)] sm:min-h-[220px]"
              >
                <div className="font-serif text-[22px] leading-7 tracking-tight">
                  {t.title}
                </div>
                <div className="mt-3 text-[14px] leading-7 text-[var(--muted)]">
                  {t.body}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

