import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ markdown }: { markdown: string }) {
  return (
    <div className="prose max-w-none prose-headings:scroll-mt-28 prose-headings:font-serif prose-headings:tracking-tight prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-p:leading-7 prose-li:leading-7 prose-strong:text-[var(--foreground)] prose-hr:border-[var(--border)] prose-blockquote:border-[var(--border)] prose-blockquote:text-[var(--muted)]">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}

