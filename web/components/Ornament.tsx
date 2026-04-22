import type { CSSProperties } from "react";

type OrnamentName = "serversBolt" | "sparkles" | "pillCluster";

function colorStyle(opacity: number): CSSProperties {
  return {
    opacity,
    color: "color-mix(in srgb, var(--accent) 26%, transparent)",
  };
}

function ServersBolt() {
  return (
    <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 34h118c10 0 18 8 18 18v10c0 10-8 18-18 18H32c-10 0-18-8-18-18V52c0-10 8-18 18-18Z" />
        <path d="M32 90h118c10 0 18 8 18 18v0c0 10-8 18-18 18H32c-10 0-18-8-18-18v0c0-10 8-18 18-18Z" />
        <path d="M44 52h0" />
        <path d="M44 108h0" />
        <path d="M210 26l-22 42h26l-18 44" />
        <path d="M206 16l10 10" />
        <path d="M224 22l-14 14" />
      </g>
    </svg>
  );
}

function Sparkles() {
  return (
    <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M44 70c18 6 26 14 32 32 6-18 14-26 32-32-18-6-26-14-32-32-6 18-14 26-32 32Z" />
        <path d="M138 44c10 4 15 9 19 19 4-10 9-15 19-19-10-4-15-9-19-19-4 10-9 15-19 19Z" />
        <path d="M148 104c10 4 15 9 19 19 4-10 9-15 19-19-10-4-15-9-19-19-4 10-9 15-19 19Z" />
      </g>
    </svg>
  );
}

function PillCluster() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M58 80c18-18 48-18 66 0s18 48 0 66-48 18-66 0-18-48 0-66Z" />
        <path d="M142 62c16-16 42-16 58 0s16 42 0 58-42 16-58 0-16-42 0-58Z" />
        <path d="M186 26c14-14 36-14 50 0s14 36 0 50-36 14-50 0-14-36 0-50Z" />
        <path d="M92 116l34-34" />
        <path d="M164 98l30-30" />
        <path d="M204 60l20-20" />
      </g>
    </svg>
  );
}

export function Ornament({
  name,
  className,
  opacity = 0.28,
}: {
  name: OrnamentName;
  className: string;
  opacity?: number;
}) {
  const Svg =
    name === "serversBolt"
      ? ServersBolt
      : name === "sparkles"
        ? Sparkles
        : PillCluster;

  return (
    <div
      aria-hidden
      className={["pointer-events-none absolute", className].join(" ")}
      style={colorStyle(opacity)}
    >
      <Svg />
    </div>
  );
}

