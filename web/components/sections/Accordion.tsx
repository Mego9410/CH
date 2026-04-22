import { Container } from "@/components/Container";

export type AccordionItem = {
  title: string;
  body: string;
};

export function Accordion({
  items,
  intro,
}: {
  items: AccordionItem[];
  intro?: { title: string; body?: string };
}) {
  return (
    <section className="mt-12">
      <Container>
        {intro ? (
          <div className="max-w-3xl">
            <h2 className="text-balance text-[24px] leading-tight font-semibold tracking-tight sm:text-[30px]">
              {intro.title}
            </h2>
            {intro.body ? (
              <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">
                {intro.body}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-8 space-y-3">
          {items.map((item) => (
            <details
              key={item.title}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-4 shadow-sm shadow-black/5"
            >
              <summary className="cursor-pointer list-none select-none font-semibold tracking-tight text-[15px]">
                <span className="inline-flex w-full items-center justify-between gap-4">
                  <span>{item.title}</span>
                  <span className="text-[var(--muted)] transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <div className="mt-3 text-[14px] leading-6 text-[var(--muted)]">
                {item.body}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

