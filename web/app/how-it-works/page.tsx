import { Hero } from "@/components/sections/Hero";
import { type Step } from "@/components/sections/Stepper";
import { StepsAccordion } from "@/components/sections/StepsAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/Container";
import { Markdown } from "@/components/Markdown";
import type { Metadata } from "next";
import {
  readCopyDoc,
  findSection,
  findSubsection,
  sectionText,
} from "@/lib/content";
import {
  extractPageHeader,
  stripMarkdownHeadings,
  stripRedundantLeadingLine,
} from "@/lib/extract";

export default function HowItWorksPage() {
  const doc = readCopyDoc("03-how-it-works.md");
  const header = extractPageHeader(doc);

  const stepSections = doc.sections.filter((s) => s.title.startsWith("Step "));

  const steps: Step[] = stepSections.map((s) => {
    const title =
      sectionText(findSubsection(s, "Heading") ?? s) ||
      s.title.replace(/^Step\s+\d+\s+—\s+/, "");
    const subtitle = sectionText(findSubsection(s, "Subhead") ?? s) || undefined;
    const rawStepTitle = s.title.replace(/^Step\s+\d+\s+—\s+/, "").trim();
    let body = stripMarkdownHeadings(s.body);
    // Remove duplicated helper lines that may appear in the first few lines
    // of the body (not always the very first line).
    const removeDupLines = (md: string, linesToStrip: string[]) => {
      const lines = md.split(/\r?\n/);
      const targets = new Set(linesToStrip.map((x) => x.trim()).filter(Boolean));
      let seenNonEmpty = 0;
      return lines
        .filter((line) => {
          if (!line.trim()) return true;
          seenNonEmpty += 1;
          if (seenNonEmpty <= 8 && targets.has(line.trim())) return false;
          return true;
        })
        .join("\n")
        .trim();
    };

    const normalize = (x: string) =>
      x
        .trim()
        .replace(/[*_`]/g, "")
        .replace(/\s+/g, " ")
        .replace(/[–—−]/g, "—");

    const targets = [rawStepTitle, title, subtitle ?? ""].map(normalize).filter(Boolean);

    const removeDupAnywhere = (md: string) => {
      const lines = md.split(/\r?\n/);
      return lines
        .map((line) => {
          const n = normalize(line);
          // If the line starts with a duplicated target + space, strip that prefix too.
          for (const t of targets) {
            if (t && n.startsWith(`${t} `)) {
              return line.replace(new RegExp(`^\\s*${t.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\s+`), "");
            }
          }
          return line;
        })
        .filter((line) => {
          const n = normalize(line);
          // Remove standalone duplicate lines anywhere (these are helper lines).
          return !(n && targets.includes(n));
        })
        .join("\n")
        .trim();
    };

    body = stripRedundantLeadingLine(body, rawStepTitle);
    body = stripRedundantLeadingLine(body, title);
    if (subtitle) body = stripRedundantLeadingLine(body, subtitle);
    body = removeDupLines(body, [rawStepTitle, title, subtitle ?? ""]);
    body = removeDupAnywhere(body);

    // Normalize common markdown escaping + list indentation so it renders cleanly.
    body = body
      .replace(/\\\*/g, "*")
      .replace(/\\_/g, "_")
      .replace(/^\s+-\s+/gm, "- ")
      // Convert ordered lists to bullets (we don't need numbering in this UI).
      .replace(/^\s*\d+\.\s+/gm, "- ");

    // We only show \"Step X\" + title in the closed accordion; keep the body clean.
    return { title, subtitle: undefined, body };
  });

  const notIncluded = findSection(doc, "What the service does not include");

  return (
    <div>
      <Hero
        title={header.title}
        subtitle={header.intro}
        primaryCta={{ label: "Get in Touch", href: "/contact" }}
      />

      <section className="mt-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
            <div className="max-w-md lg:sticky lg:top-28">
              <h2 className="font-serif text-balance text-[32px] leading-[1.05] tracking-tight sm:text-[40px]">
                The full process
              </h2>
              <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">
                Clear steps, end-to-end. You’ll always know what’s happening,
                what comes next, and what you’ll receive.
              </p>
            </div>
            <div>
              <StepsAccordion steps={steps} defaultOpenIndex={0} />
            </div>
          </div>
        </Container>
      </section>

      {notIncluded ? (
        <section className="mt-32">
          <Container>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_18px_45px_rgba(15,18,25,0.10)] sm:p-10">
              <div className="font-serif text-[22px] tracking-tight">
                What the service does not include
              </div>
              <div className="mt-4">
                <Markdown
                  markdown={sectionText(notIncluded).replace(/^\s*-\s*✕\s+/gm, "- ")}
                />
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <CTASection
        title="Ready to get started?"
        body="Book a free introductory call or send me a message. No data sharing required, no commitment, no cost."
        cta={{ label: "Get in Touch", href: "/contact" }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From an optional intro call, to requesting your GP record via Subject Access Request, to processing, delivery, aftercare and deletion—here’s the Chronicle Health process end-to-end.",
};

