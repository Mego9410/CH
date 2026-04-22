import {
  readCopyDoc,
  findSection,
  findSubsection,
  sectionText,
  type MarkdownSection,
} from "@/lib/content";
import {
  extractHeroFromHome,
  extractSubsectionsAsCards,
} from "@/lib/extract";
import { Quote } from "@/components/sections/Quote";
import { CTASection } from "@/components/sections/CTASection";
import { HeroWithPreviewStrip } from "@/components/sections/incident/HeroWithPreviewStrip";
import { PillarsWithPills } from "@/components/sections/incident/PillarsWithPills";
import { BentoGrid } from "@/components/sections/incident/BentoGrid";
import { ProofHero } from "@/components/sections/incident/ProofHero";
import { FeatureSplit } from "@/components/sections/incident/FeatureSplit";
import { BenefitsBento } from "@/components/sections/incident/BenefitsBento";
import { ProcessRail } from "@/components/sections/incident/ProcessRail";
import { stripMarkdownHeadings, stripRedundantLeadingLine } from "@/lib/extract";
import { HorizontalSteps } from "@/components/sections/incident/HorizontalSteps";
import { PrivacyPanel } from "@/components/sections/incident/PrivacyPanel";

export default function Home() {
  const doc = readCopyDoc("01-home.md");

  const hero = extractHeroFromHome(doc);
  const problem = findSection(doc, "Problem framing");
  const whatIDo = findSection(doc, "What I do");
  const why = findSection(doc, "Why it's worth doing");
  const pricing = findSection(doc, "Pricing");
  const privacy = findSection(doc, "Privacy and control");
  const howSummary = findSection(doc, "How it works (summary)");

  const whyCards = extractSubsectionsAsCards(why);

  const emptySection: MarkdownSection = { title: "", body: "", subsections: [] };
  const summarySteps = (sectionText(howSummary ?? emptySection) || "")
    .split(/\r?\n/)
    .filter((l) => l.trim().startsWith("- "))
    .map((l) => l.replace(/^\-\s+/, "").trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...rest] = line.split("—");
      return {
        title: (title ?? "").trim(),
        subtitle: rest.join("—").trim() || undefined,
        body: "",
      };
    });

  return (
    <div>
      <HeroWithPreviewStrip
        title={hero.title}
        subtitle={hero.subtitle}
        primaryCta={{ label: hero.primaryCtaLabel ?? "Get Started", href: "/contact" }}
        secondaryCta={{ label: "How it works", href: "/how-it-works" }}
      />

      <PillarsWithPills />

      <BentoGrid
        heading={{
          title: "A calm, careful process — designed for sensitive data",
          body: "Pseudonymisation early, encrypted storage, minimal access, and deletion after delivery. The goal is a record you can trust and reuse — without leaving you dependent on a system.",
          linkLabel: "Read the privacy notice",
          linkHref: "/privacy",
        }}
        items={[
          {
            title: "Catalog",
            body: "Everything in one place: consultations, prescriptions, results, letters, scans.",
            variant: "muted",
          },
          {
            title: "Workflows",
            body: "Cleaning, transcription (including handwritten notes), and standardisation into a usable record.",
          },
          {
            title: "Search",
            body: "Find what you need quickly: structured entries, references, and consistent terminology.",
          },
          {
            title: "Privacy",
            body: "Direct identifiers removed early, careful processing, and deletion after delivery.",
            variant: "accent",
          },
        ]}
      />

      <ProofHero />

      {problem ? (
        <FeatureSplit
          eyebrow="Problem"
          title={sectionText(findSubsection(problem, "H2") ?? problem)}
          body={sectionText(findSubsection(problem, "Body") ?? problem)}
          cards={[
            {
              title: "Distributed mess",
              body: "Results, letters, and context spread across portals, PDFs, and memory.",
              tone: "muted",
            },
            {
              title: "Hidden detail",
              body: "Your full GP record often includes reasoning and correspondence you never saw.",
            },
            {
              title: "AI needs context",
              body: "To ask good questions, you need a comprehensive, structured record.",
            },
            {
              title: "Be prepared",
              body: "When it matters, you don’t want to reconstruct your history from scratch.",
              tone: "muted",
            },
          ]}
        />
      ) : null}

      {whatIDo ? (
        <div className="mt-24 py-2">
          <ProcessRail
            eyebrow="What I do"
            title={sectionText(findSubsection(whatIDo, "H2") ?? whatIDo) || "What I do"}
            body={sectionText(findSubsection(whatIDo, "Body") ?? whatIDo)}
            steps={[
              {
                meta: "Step 1",
                title: "Request the full record",
                body: "Via Subject Access Request. You can submit it yourself using a template, or I can submit on your behalf as your authorised representative.",
              },
              {
                meta: "Step 2",
                title: "Transcribe and clean",
                body: "Older records may include scans and handwritten notes. These are transcribed into usable text and cleaned into a consistent form.",
              },
              {
                meta: "Step 3",
                title: "Structure and reference",
                body: "Everything is organised chronologically and standardised so it becomes searchable and easy to reference later.",
              },
              {
                meta: "Step 4",
                title: "Deliver, then delete",
                body: "You receive the files to keep. After review and follow-up, your health data is deleted from my devices.",
              },
            ]}
          />
        </div>
      ) : null}

      {whyCards.length ? (
        <BenefitsBento title="Why it's worth doing" items={whyCards} />
      ) : null}

      {howSummary && summarySteps.length ? (
        <HorizontalSteps
          heading="How it works"
          steps={summarySteps.map((s, i) => ({
            number: i + 1,
            title: s.title,
            subtitle: s.subtitle,
          }))}
          link={{ label: "See the full process", href: "/how-it-works" }}
        />
      ) : null}

      {pricing ? (
        <FeatureSplit
          eyebrow="Pricing"
          title="Pay what you think it was worth"
          body={stripRedundantLeadingLine(stripMarkdownHeadings(sectionText(pricing)), "Pricing")}
          cards={[
            { title: "No upfront payment", body: "You only decide after you’ve received your record.", tone: "muted" },
            { title: "No minimum", body: "Pay nothing if it wasn’t valuable to you.", tone: "muted" },
            { title: "Time-bounded", body: "Offer applies to the next set of clients.", tone: "muted" },
            { title: "Fixed later", body: "Pricing may move to a fixed rate in future.", tone: "muted" },
          ]}
        />
      ) : null}

      {privacy ? (
        <PrivacyPanel
          title="Privacy and control"
          body={stripRedundantLeadingLine(
            stripMarkdownHeadings(sectionText(privacy)),
            "Privacy and control"
          )}
          chips={["Privacy-first", "No cookies", "UK-based", "You own the files", "Deleted after delivery"]}
          points={[
            { title: "Pseudonymisation", body: "Direct identifiers removed early in processing." },
            { title: "Encrypted storage", body: "Sensitive files handled via encrypted systems." },
            { title: "Deletion", body: "Deleted after delivery and review." },
            { title: "No tracking", body: "This website uses no cookies or analytics." },
          ]}
          linkHref="/privacy"
          linkLabel="Read the privacy notice"
        />
      ) : null}

      <Quote
        quote="I feel *empowered* to have all my NHS records in one place. It's really helpful to know that whenever I need to *reference* my health history, everything's already there and *organised*."
        attribution="Clare Relton, early client"
      />

      <CTASection
        title="See what your health record could look like"
        body="Book a free introductory call — I'll show you an example record, answer your questions, and explain the process. No data sharing required, no commitment, no cost."
        cta={{ label: "Get in Touch", href: "/contact" }}
      />
    </div>
  );
}
