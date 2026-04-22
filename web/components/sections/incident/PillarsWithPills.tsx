"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { EmphasisText } from "@/components/EmphasisText";
import { Ornament } from "@/components/Ornament";

const pills = ["Records", "Timeline", "Search", "Privacy", "Delivery"] as const;

const pillars = [
  {
    title: "Retrieve",
    body: "Request your full GP record via Subject Access Request — including hidden correspondence and older scans.",
  },
  {
    title: "Organise",
    body: "Clean, structure, and standardise the material into a chronological, searchable personal health record.",
  },
  {
    title: "Deliver",
    body: "Receive a set of files you own and control — ready to reference, search, and use with AI tools.",
  },
  {
    title: "Delete",
    body: "After delivery and review, your health data is deleted from my devices. No retention by default.",
  },
] as const;

export function PillarsWithPills() {
  const [active, setActive] = useState<(typeof pills)[number]>("Records");

  const activeModule = useMemo(() => {
    switch (active) {
      case "Records":
        return {
          hint: "GP record retrieval and collection",
          title: "Records, in one place",
          body: "Your GP record is the closest thing to a lifelong health record in the UK — consultations, prescriptions, letters, results, and scanned documents. Chronicle gathers the whole thing, not just what’s surfaced in an app.",
          bullets: [
            "Subject Access Request (SAR) workflow",
            "Scanned documents + data exports",
            "Older record handling (including handwritten notes)",
          ],
        };
      case "Timeline":
        return {
          hint: "Chronological organisation",
          title: "A timeline you can follow",
          body: "Once everything is ordered chronologically, patterns appear: what happened first, what changed, what was tried, and what followed. It becomes much easier to reference and share.",
          bullets: [
            "Chronological ordering across sources",
            "Consistent dating and grouping",
            "Cross-referencing letters, results, prescriptions",
          ],
        };
      case "Search":
        return {
          hint: "Structured, searchable outputs",
          title: "Search and navigate fast",
          body: "The deliverable isn’t a pile of PDFs. It’s structured, searchable, and referenced — so you can answer questions without re-reading hundreds of pages.",
          bullets: [
            "Standardised naming and categories",
            "Searchable text (including transcriptions)",
            "References back to source material",
          ],
        };
      case "Privacy":
        return {
          hint: "Pseudonymisation, encryption, deletion",
          title: "Privacy-first by design",
          body: "Health data demands restraint. Direct identifiers are removed early, access is minimised, and data is deleted after delivery. The website has no tracking or cookies.",
          bullets: [
            "Pseudonymisation early in processing",
            "Encrypted storage and restricted access",
            "Deletion after delivery and review",
          ],
        };
      case "Delivery":
        return {
          hint: "Files you own and can take anywhere",
          title: "Delivery that leaves you in control",
          body: "You receive a set of files you own and control. They’re portable — useful if you move GP, move country, or need to share a precise slice of history with a new clinician.",
          bullets: [
            "Secure delivery channel",
            "Portable files you keep",
            "Optional future updates (not required)",
          ],
        };
      default:
        return {
          hint: "",
          title: "",
          body: "",
          bullets: [],
        };
    }
  }, [active]);

  return (
    <section className="mt-32">
      <Container className="relative">
        <Ornament
          name="pillCluster"
          className="-left-16 -top-10 hidden h-28 w-52 -rotate-[8deg] md:block"
          opacity={0.18}
        />
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
              The service
            </span>
          </div>
          <h2 className="mt-4 font-serif text-balance text-[34px] leading-[1.05] tracking-tight sm:text-[44px]">
            <EmphasisText text="A personal health record — *organised*, searchable, and in your hands" />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-7 text-[var(--muted)]">
            From scattered PDFs and scans to a structured record you can actually use — without turning it into a product.
          </p>
        </div>
      </Container>

      <Container className="mt-14">
        <div className="grid gap-4 md:grid-cols-4">
          {pillars.map((p, idx) => (
            <Reveal key={p.title} delayMs={idx * 60}>
              <div className="flex min-h-[156px] flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_16px_40px_rgba(15,18,25,0.06)]">
                <div className="text-[13px] font-semibold tracking-tight">
                  {p.title}
                </div>
                <div className="mt-2 text-[13px] leading-6 text-[var(--muted)]">
                  {p.body}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] p-2 shadow-sm shadow-black/5">
            {pills.map((p) => {
              const isActive = p === active;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActive(p)}
                  className={[
                    "h-10 rounded-full px-4 text-[13px] font-semibold tracking-tight transition",
                    isActive
                      ? "bg-[var(--accent)] text-white shadow-[0_1px_0_rgba(0,0,0,0.06)]"
                      : "bg-transparent text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]",
                  ].join(" ")}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <div className="text-[13px] text-[var(--muted)]">{activeModule.hint}</div>
        </div>

        <div className="mt-12">
          <Reveal>
            <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_18px_45px_rgba(15,18,25,0.10)]">
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-8 sm:p-10">
                  <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {active}
                  </div>
                  <div className="mt-3 font-serif text-[26px] leading-[1.1] tracking-tight sm:text-[32px]">
                    {activeModule.title}
                  </div>
                  <div className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
                    {activeModule.body}
                  </div>
                </div>

                <div className="border-t border-[var(--border)] bg-[var(--surface-2)] p-8 sm:p-10 lg:border-t-0 lg:border-l">
                  <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                    What you get
                  </div>
                  <ul className="mt-4 space-y-3 text-[13px] leading-6 text-[var(--muted)]">
                    {activeModule.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
