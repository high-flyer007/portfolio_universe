import { ArrowDown, ArrowUpRight } from "lucide-react";
import { milestones } from "@/data/experience";
import { Reveal, SceneMarker } from "@/components/common/Reveal";

export function Journey() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_50%,rgba(5,7,6,0.92)_0%,rgba(5,7,6,0.6)_45%,transparent_80%)]" />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <Reveal>
          <SceneMarker scene="05" label="The Journey" />
        </Reveal>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2
              id="journey-title"
              className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em]"
            >
              A path, still
              <br />
              <span className="font-serif italic text-emerald">ascending.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="max-w-xs">
            <p className="text-sm leading-relaxed text-[#c8d6cf]">
              Education, academics, leadership and the projects that connect
              them. Some dates are intentionally left as editable placeholders
              rather than invented.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-amber-100/40">
              <span className="h-px w-6 bg-amber-100/25" />
              dashed labels = placeholder date
            </div>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b from-emerald/50 via-white/10 to-transparent sm:left-[11px]" />
          <ol className="space-y-1">
            {milestones.map((milestone, index) => (
              <li key={milestone.id} className="relative">
                <Reveal delay={0.02 * index}>
                  <article
                    className={`group relative grid gap-x-6 gap-y-4 border-t border-white/[0.08] py-8 pl-8 sm:pl-12 lg:grid-cols-[1fr_15rem] lg:items-start lg:py-10 ${
                      index % 2 === 1 ? "lg:pl-20" : ""
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-[3px] top-12 size-[9px] rounded-full border border-emerald/60 bg-[#050706] transition-all duration-500 group-hover:bg-emerald group-hover:shadow-[0_0_16px_rgba(43,227,155,0.8)] sm:left-[7px]"
                    />

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald/70">
                          {milestone.chapter}
                        </span>
                        <span className="h-px w-5 bg-white/15" />
                        <span className="font-mono text-[9px] tracking-[0.14em] text-muted-foreground/40">
                          {milestone.index}
                        </span>
                      </div>
                      <h3 className="mt-3 max-w-2xl font-display text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-foreground transition-colors group-hover:text-emerald">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/60">
                        {milestone.meta}
                      </p>
                      <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-[#c8d6cf]/90 sm:text-sm">
                        {milestone.body}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {milestone.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-white/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-row items-start justify-between gap-4 lg:flex-col lg:items-end lg:justify-start lg:text-right">
                      <span
                        className={`inline-flex items-center gap-2 px-2.5 py-1.5 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] ${
                          milestone.editable
                            ? "border border-dashed border-amber-100/20 text-amber-100/50"
                            : "border border-emerald/20 text-emerald/60"
                        }`}
                      >
                        <span className="size-1 rounded-full bg-current opacity-70" />
                        {milestone.dateNote}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-display text-4xl font-medium tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(200,231,218,0.12)] transition-all duration-500 group-hover:[-webkit-text-stroke:1px_rgba(43,227,155,0.35)] lg:text-6xl"
                      >
                        {milestone.index}
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 border border-white/[0.09] bg-[#07100c]/70 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-serif text-2xl italic text-[#dcebe3]">
                The best chapter is still unbuilt.
              </p>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/50">
                Next: more systems, more scale, more useful software
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-emerald/50 hover:text-emerald"
              >
                Revisit the work
                <ArrowUpRight className="size-3.5" />
              </a>
              <ArrowDown className="hidden size-4 text-emerald/40 sm:block" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
