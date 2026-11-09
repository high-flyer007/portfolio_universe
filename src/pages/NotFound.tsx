import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050706] px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[38vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[20vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,227,155,0.22),transparent_70%)]"
      />

      <div className="relative max-w-md text-center">
        <p className="label-mono text-emerald/70">Signal lost / 404</p>
        <h1 className="mt-5 font-display text-[clamp(3rem,12vw,6rem)] font-medium leading-none tracking-[-0.06em]">
          Off the map.
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          This coordinate does not exist in the ALIVERSE. The universe is still
          there — head back to the awakening.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/[0.07] px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-emerald transition-colors hover:bg-emerald hover:text-[#03130c]"
        >
          <ArrowLeft className="size-3.5" />
          Return to ALIVERSE
        </a>
      </div>
    </main>
  );
}
