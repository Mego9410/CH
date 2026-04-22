import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/Container";
import { Markdown } from "@/components/Markdown";
import { readCopyDoc, findSection, sectionText } from "@/lib/content";
import { extractPageHeader } from "@/lib/extract";

export default function PrivacyPage() {
  const doc = readCopyDoc("04-privacy.md");
  const header = extractPageHeader(doc);
  const cookies = findSection(doc, "Cookies");

  const bodyMarkdown = doc.sections
    .filter((s) => s.title !== "Page header")
    .map((s) => `## ${s.title}\n\n${sectionText(s)}\n`)
    .join("\n");

  return (
    <div>
      <Hero
        title={header.title || "Privacy"}
        subtitle="Clear, specific handling. No tracking. You stay in control."
        primaryCta={{ label: "Get in Touch", href: "/contact" }}
        secondaryCta={{ label: "How it works", href: "/how-it-works" }}
      />

      <Container className="mt-32">
        <div className="flex flex-wrap gap-2">
          {[
            "You are the controller",
            "Temporary processing",
            "Deletion after delivery",
            cookies ? "No cookies" : null,
          ]
            .filter(Boolean)
            .map((x) => (
              <span
                key={String(x)}
                className="rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] px-3 py-1 text-[12px] font-semibold text-[var(--muted)]"
              >
                {x}
              </span>
            ))}
        </div>
      </Container>

      <Container className="mt-12">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_22px_65px_rgba(15,18,25,0.12)] sm:p-10">
          <Markdown markdown={bodyMarkdown} />
        </div>
      </Container>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Chronicle Health handles your health data: you are the controller, processing is temporary, and data is deleted after delivery. No cookies or tracking on the website.",
};

