import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Frontmatter = Record<string, unknown>;

export type MarkdownSection = {
  title: string;
  body: string;
  subsections: MarkdownSection[];
};

export type MarkdownDoc = {
  slug?: string;
  title?: string;
  frontmatter: Frontmatter;
  raw: string;
  sections: MarkdownSection[];
};

const COPY_DIR = path.join(process.cwd(), "content", "copy");

function splitSections(markdown: string, heading = "## "): MarkdownSection[] {
  const lines = markdown.split(/\r?\n/);
  const sections: MarkdownSection[] = [];

  let currentTitle: string | null = null;
  let currentBody: string[] = [];

  const flush = () => {
    if (!currentTitle) return;
    const body = currentBody.join("\n").trim() + "\n";
    sections.push({
      title: currentTitle,
      body,
      subsections: splitSections(body, "### "),
    });
    currentTitle = null;
    currentBody = [];
  };

  for (const line of lines) {
    if (line.startsWith(heading)) {
      flush();
      currentTitle = line.slice(heading.length).trim();
      continue;
    }
    if (currentTitle) currentBody.push(line);
  }

  flush();
  return sections;
}

export function readCopyDoc(filename: string): MarkdownDoc {
  const fullPath = path.join(COPY_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);

  const frontmatter = parsed.data as Frontmatter;
  const title =
    typeof frontmatter.title === "string" ? frontmatter.title : undefined;
  const slug = typeof frontmatter.slug === "string" ? frontmatter.slug : undefined;

  const sections = splitSections(parsed.content.trim() + "\n");

  return {
    slug,
    title,
    frontmatter,
    raw: parsed.content,
    sections,
  };
}

export function findSection(
  doc: MarkdownDoc,
  title: string
): MarkdownSection | undefined {
  return doc.sections.find((s) => s.title === title);
}

export function findSubsection(
  section: MarkdownSection,
  title: string
): MarkdownSection | undefined {
  return section.subsections.find((s) => s.title === title);
}

export function sectionText(section: MarkdownSection): string {
  return section.body.trim();
}

