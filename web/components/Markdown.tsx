import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ markdown }: { markdown: string }) {
  return (
    <div className="prose max-w-none prose-headings:scroll-mt-28 prose-headings:font-serif prose-headings:tracking-tight prose-a:text-[var(--accent)] prose-a:no-underline prose-a:break-words hover:prose-a:underline prose-p:leading-7 prose-li:leading-7 prose-strong:text-[var(--foreground)] prose-hr:border-[var(--border)] prose-blockquote:border-[var(--border)] prose-blockquote:text-[var(--muted)] prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:border prose-pre:border-[var(--border)] prose-pre:bg-[var(--surface-2)]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <div className="not-prose overflow-x-auto">
              <table className="min-w-[720px]">{children}</table>
            </div>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
              {children}
            </pre>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

