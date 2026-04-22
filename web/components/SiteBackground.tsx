import { Ornament } from "@/components/Ornament";

export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Base gradients */}
      <div className="absolute inset-0 bg-[var(--background)]" />

      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_15%_-10%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_85%_5%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_50%_25%,rgba(255,255,255,0.42),transparent_62%)]" />

      {/* Subtle vertical flow so it feels continuous */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.18)_35%,transparent_70%)]" />

      {/* Big blurred accent blobs (very soft, no hard edges) */}
      <div className="absolute left-[-180px] top-[520px] h-[520px] w-[520px] rounded-full bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] blur-[90px]" />
      <div className="absolute right-[-220px] top-[760px] h-[620px] w-[620px] rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] blur-[110px]" />
      <div className="absolute left-[10%] top-[1120px] h-[520px] w-[720px] -rotate-[8deg] rounded-[999px] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] blur-[120px]" />
      <div className="absolute right-[6%] top-[1520px] h-[460px] w-[560px] rotate-[12deg] rounded-[999px] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] blur-[120px]" />

      {/* Ornaments sprinkled across the whole page (very low opacity) */}
      <Ornament
        name="pillCluster"
        className="left-[-80px] top-[120px] h-36 w-64 -rotate-[10deg]"
        opacity={0.12}
      />
      <Ornament
        name="sparkles"
        className="right-[-70px] top-[260px] h-28 w-52 rotate-[8deg]"
        opacity={0.12}
      />
      <Ornament
        name="serversBolt"
        className="right-[-90px] top-[920px] h-44 w-72 rotate-[4deg]"
        opacity={0.10}
      />
      <Ornament
        name="sparkles"
        className="left-[-60px] top-[1400px] h-28 w-52 -rotate-[6deg]"
        opacity={0.10}
      />
      <Ornament
        name="pillCluster"
        className="right-[-110px] top-[1680px] h-36 w-64 rotate-[12deg]"
        opacity={0.09}
      />
    </div>
  );
}

