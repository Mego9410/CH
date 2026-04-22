import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

export type CardItem = {
  title: string;
  body: string;
};

export function CardGrid({
  items,
  columns = 3,
}: {
  items: CardItem[];
  columns?: 2 | 3;
}) {
  return (
    <Container className="mt-8">
      <div
        className={[
          "grid gap-4",
          columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
        ].join(" ")}
      >
        {items.map((item) => (
          <Reveal key={item.title} delayMs={40}>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm shadow-black/5 hover:shadow-md hover:shadow-black/10 transition">
              <div className="text-[15px] font-semibold tracking-tight">
                {item.title}
              </div>
              <div className="mt-2 text-[14px] leading-6 text-[var(--muted)]">
                {item.body}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

