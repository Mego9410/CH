import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/Container";
import { Markdown } from "@/components/Markdown";
import { CTASection } from "@/components/sections/CTASection";
import { readCopyDoc, sectionText } from "@/lib/content";

export default function AboutPage() {
  const doc = readCopyDoc("05-about.md");

  const bodyMarkdown = doc.sections
    .map((s) => {
      if (s.title === "Page body") return `${sectionText(s)}\n`;
      return `## ${s.title}\n\n${sectionText(s)}\n`;
    })
    .join("\n");

  return (
    <div>
      <Hero
        title="About"
        subtitle="Chronicle Health is run by one person, start to finish."
        primaryCta={{ label: "Get in Touch", href: "/contact" }}
        secondaryCta={{ label: "Privacy", href: "/privacy" }}
      />
      <Container className="mt-32">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_22px_65px_rgba(15,18,25,0.12)] sm:p-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative h-28 w-28 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-2)] shadow-sm shadow-black/5">
              <Image
                src="/people/thomas.jpg"
                alt="Portrait photo"
                fill
                className="object-cover"
                sizes="112px"
                priority
              />
            </div>
            <div className="min-w-0 text-center sm:text-left">
              <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                Founder
              </div>
              <div className="mt-2 font-serif text-[22px] leading-7 tracking-tight">
                Thomas
              </div>
              <div className="mt-2 max-w-2xl text-pretty text-[14px] leading-7 text-[var(--muted)]">
                I handle your record personally, end to end — retrieval, organisation, delivery, and deletion.
              </div>
            </div>
          </div>

          <div className="mt-10">
          <Markdown markdown={bodyMarkdown} />
          </div>
        </div>
      </Container>

      <CTASection
        title="Want to ask a question first?"
        body="Get in touch and I’ll walk you through how it works."
        cta={{ label: "Get in Touch", href: "/contact" }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "About",
  description:
    "Chronicle Health is founded and run by Thomas. Learn why the service exists, how it’s delivered, and why a sole-operator privacy model is deliberate.",
};

