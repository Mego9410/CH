import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { readCopyDoc, findSection, sectionText } from "@/lib/content";
import { extractPageHeader } from "@/lib/extract";

export default function ContactPage() {
  const doc = readCopyDoc("06-contact.md");
  const header = extractPageHeader(doc);

  const security = findSection(doc, "A note on security");

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "[email protected]";
  const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/";

  return (
    <div>
      <Hero
        title={header.title}
        subtitle={header.intro}
        primaryCta={{ label: "Email me", href: `mailto:${email}` }}
        secondaryCta={{ label: "WhatsApp", href: "/contact#whatsapp" }}
      />

      <Container className="mt-32">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr] lg:items-start">
          <ContactForm email={email} whatsappHref={whatsappHref} />

          <div
            id="whatsapp"
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_18px_45px_rgba(15,18,25,0.10)] sm:p-10"
          >
            <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--muted)]">
              WhatsApp
            </div>
            <div className="mt-2 font-serif text-[22px] tracking-tight">
              Often the quickest way to reach me
            </div>
            <p className="mt-3 text-[14px] leading-7 text-[var(--muted)]">
              Feel free to introduce yourself and share what you’re looking for —
              for example which GP practice you’re registered with, whether you’ve
              already requested your records, or any questions you have.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button href={whatsappHref} size="lg" variant="secondary">
                Chat on WhatsApp
              </Button>
              <Button href={`mailto:${email}`} size="lg">
                Prefer email instead
              </Button>
            </div>
          </div>
        </div>

        {security ? (
          <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 text-[14px] leading-7 text-[var(--muted)] shadow-[0_18px_45px_rgba(15,18,25,0.08)] sm:p-10">
            {sectionText(security)}
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Email or WhatsApp Chronicle Health to ask questions or get started. No commitment and no data sharing required for an introductory conversation.",
};

