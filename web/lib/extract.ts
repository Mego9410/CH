import {
  findSection,
  findSubsection,
  sectionText,
  type MarkdownDoc,
  type MarkdownSection,
} from "@/lib/content";

export function extractHeroFromHome(doc: MarkdownDoc): {
  title: string;
  subtitle?: string;
  primaryCtaLabel?: string;
} {
  const hero = findSection(doc, "Hero");
  if (!hero) return { title: doc.title ?? "Chronicle Health" };

  const title = sectionText(findSubsection(hero, "H1") ?? hero) || (doc.title ?? "Chronicle Health");
  const subtitle = sectionText(findSubsection(hero, "Subhead") ?? hero) || undefined;
  const primaryCtaLabel = sectionText(findSubsection(hero, "Primary CTA") ?? hero) || undefined;

  return { title, subtitle, primaryCtaLabel };
}

export function extractPageHeader(doc: MarkdownDoc): {
  title: string;
  intro?: string;
} {
  const header = findSection(doc, "Page header");
  if (!header) return { title: doc.title ?? "Chronicle Health" };

  const title =
    sectionText(findSubsection(header, "H1") ?? header) ||
    (doc.title ?? "Chronicle Health");
  const intro = sectionText(findSubsection(header, "Intro") ?? header) || undefined;

  return { title, intro };
}

export function extractSubsectionsAsCards(section?: MarkdownSection): {
  title: string;
  body: string;
}[] {
  if (!section) return [];
  return section.subsections
    .map((s) => ({ title: s.title, body: stripMarkdownHeadings(sectionText(s)) }))
    .filter((x) => {
      const title = x.title?.trim();
      if (!title) return false;
      if (!x.body?.trim()) return false;

      // Our copy docs include helper subsections like "H1", "H2", "Subhead".
      // These should never render as content cards.
      if (/^H[1-6]$/i.test(title)) return false;
      if (title.toLowerCase() === "subhead") return false;
      if (title.toLowerCase() === "primary cta") return false;
      if (title.toLowerCase() === "intro") return false;
      if (title.toLowerCase() === "heading") return false;

      return true;
    });
}

export function stripMarkdownHeadings(md: string): string {
  return md
    .split(/\r?\n/)
    .filter((line) => !/^\s*#{1,6}\s+/.test(line))
    .filter((line) => !/^\s*H[1-6]\s*$/i.test(line.trim()))
    .join("\n")
    .trim();
}

export function stripRedundantLeadingLine(md: string, lineToStrip: string): string {
  const lines = md.split(/\r?\n/);
  let i = 0;
  while (i < lines.length && !lines[i]?.trim()) i++;
  if ((lines[i] ?? "").trim() === lineToStrip.trim()) {
    lines.splice(i, 1);
  }
  return lines.join("\n").trim();
}

