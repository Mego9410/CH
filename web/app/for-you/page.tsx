import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { readCopyDoc, findSection } from "@/lib/content";
import { extractPageHeader, extractSubsectionsAsCards } from "@/lib/extract";
import { FaqAccordion } from "@/components/sections/incident/FaqAccordion";

export default function ForYouPage() {
  const doc = readCopyDoc("02-for-you.md");
  const header = extractPageHeader(doc);
  const sections = findSection(doc, "Sections");
  const items = extractSubsectionsAsCards(sections);

  return (
    <div>
      <Hero
        title={header.title}
        subtitle={header.intro}
        primaryCta={{ label: "Get in Touch", href: "/contact" }}
      />

      <FaqAccordion
        items={items.map((x) => ({ q: x.title, a: x.body }))}
      />

      <CTASection
        title="Not sure? Ask."
        body="If any of this resonates or if you're not sure and want to ask, get in touch. There's no commitment and no pressure."
        cta={{ label: "Get in Touch", href: "/contact" }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "For You?",
  description:
    "Is this for you? Whether you like to be prepared, want to use AI with your health data, have been through complex treatment, or are relocating—Chronicle Health helps you organise your complete record.",
};

