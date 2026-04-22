import type { ReactNode } from "react";

/**
 * Renders a string with *italic* segments.
 * Example: "Your *complete* health history" -> complete in <em>.
 */
export function EmphasisText({ text }: { text: string }): ReactNode {
  const parts = text.split("*");
  // Odd indices are emphasised segments.
  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 === 1 ? <em key={idx}>{part}</em> : <span key={idx}>{part}</span>
      )}
    </>
  );
}

