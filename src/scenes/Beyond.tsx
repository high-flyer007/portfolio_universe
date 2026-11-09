import {
  CircleDot,
  Globe2,
  Grid3X3,
  Headphones,
  Mountain,
  Swords,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { interests } from "@/data/experience";
import { Reveal, SceneMarker } from "@/components/common/Reveal";

const ICONS: Record<string, LucideIcon> = {
  chess: Grid3X3,
  mma: Swords,
  cricket: CircleDot,
  hiphop: Headphones,
  trekking: Mountain,
  travel: Globe2,
};

const OFFSETS = ["", "lg:mt-14", "lg:mt-5", "", "lg:mt-16", "lg:mt-8"];

export function Beyond() {
  return (
    <section
      id="beyond"
      aria-labelledby="beyond-title"
      className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_55%,transparent_20%,rgba(5,7,6,0.45)_60%,rgba(5,7,6,0.8)_100%)]" />

      <div className="relative mx-auto w-full max-w-[1500px]">
        <Reveal>
          <SceneMarker scene="06" label="Beyond the Screen" />
        </Reveal>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2
              id="beyond-title"
              className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em]"
            >
              Beyond the
              <br />
              <span className="font-serif italic text-emerald">screen.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="max-w-sm">
            <p className="text-sm leading-relaxed text-[#c8d6cf]">
              The human behind the code. The board, the octagon, the pitch, the
              beat, the trail and the map — each one shapes how I think about
              problems and pace.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest, index) => {
            const Icon = ICONS[interest.object] ?? CircleDot;
            return (
              <Reveal
                key={interest.id}
                delay={0.04 * index}
                className={OFFSETS[index]}
              >
                <article className="group relative border-t border-white/[0.1] pt-5 transition-colors hover:border-emerald/40">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors group-hover:border-emerald/40 group-hover:text-emerald">
                        <Icon className="size-4" strokeWidth={1.4} />
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/50">
                        {interest.index}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className="font-display text-5xl font-medium leading-none text-transparent [-webkit-text-stroke:1px_rgba(200,231,218,0.1)] transition-all duration-500 group-hover:[-webkit-text-stroke:1px_rgba(43,227,155,0.3)]"
                    >
                      {interest.index}
                    </span>
                  </div>

                  <h3 className="mt-8 font-serif text-4xl italic leading-none text-[#e4f1ea] transition-colors group-hover:text-emerald">
                    {interest.label}
                  </h3>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-emerald/60">
                    {interest.line}
                  </p>
                  <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
                    {interest.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-24 border-y border-white/[0.08] py-5">
            <div className="flex w-max marquee-track gap-10 whitespace-nowrap">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex items-center gap-10"
                >
                  {interests.map((interest) => (
                    <span key={`${copy}-${interest.id}`} className="flex items-center gap-10">
                      <span className="font-display text-3xl font-medium tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(200,231,218,0.22)] sm:text-4xl">
                        {interest.label.toUpperCase()}
                      </span>
                      <span className="size-1 rounded-full bg-emerald/50" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
