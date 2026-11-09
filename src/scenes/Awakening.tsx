import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Awakening({ onEnter }: { onEnter: () => void }) {
  const reduced = useReducedMotion();

  return (
    <section
      id="awakening"
      aria-label="ALIVERSE — introduction"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-7 pt-24 sm:px-8 sm:pb-9 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#050706] via-[#050706]/70 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-[1600px] items-start justify-between gap-6">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="label-mono max-w-[19rem] text-muted-foreground"
        >
          A universe built by imagination,
          <br />
          engineering and code.
        </motion.p>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-emerald" />
          <span className="label-mono text-muted-foreground">
            Scene 01 / Awakening
          </span>
        </motion.div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 items-end pb-10 pt-12 sm:pt-[22vh] lg:pb-16 lg:pt-[28vh]">
        <div className="w-full">
          <h1 className="select-none">
            <span className="block overflow-hidden">
              <motion.span
                initial={reduced ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.15, delay: 0.35, ease: EASE }}
                className="block font-display text-[clamp(3.6rem,13.5vw,12.5rem)] font-medium leading-[0.8] tracking-[-0.055em] text-foreground"
              >
                MOHD ALI
              </motion.span>
            </span>
            <span className="mt-1 flex flex-wrap items-end gap-x-6 gap-y-2 sm:mt-2">
              <span className="overflow-hidden">
                <motion.span
                  initial={reduced ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.15, delay: 0.5, ease: EASE }}
                  className="block font-display text-[clamp(3.6rem,13.5vw,12.5rem)] font-medium leading-[0.8] tracking-[-0.055em] text-outline"
                >
                  PATHAN
                </motion.span>
              </span>
              <motion.span
                aria-hidden="true"
                initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
                className="mb-[0.6em] hidden size-3 rounded-full bg-emerald shadow-[0_0_28px_rgba(43,227,155,0.9)] sm:block lg:size-4"
              />
              <motion.span
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.95, ease: EASE }}
                className="mb-[0.9em] max-w-[13rem] font-serif text-lg italic leading-snug text-emerald sm:text-xl lg:ml-auto lg:max-w-[15rem] lg:text-2xl"
              >
                Building beyond the ordinary.
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: EASE }}
            className="mt-8 flex flex-col justify-between gap-7 border-t border-white/[0.09] pt-6 sm:flex-row sm:items-end lg:mt-10"
          >
            <div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Engineer. Builder. Innovator. I turn ambitious ideas into
                working digital products — AI applications, security platforms
                and interactive software experiences.
              </p>
              <p className="label-mono mt-4 text-[9px] text-muted-foreground/70">
                {profile.metadata}
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:items-end">
              <button
                type="button"
                onClick={onEnter}
                className="group flex items-center gap-3 rounded-full border border-emerald/40 bg-emerald/[0.07] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald transition-all duration-300 hover:border-emerald hover:bg-emerald hover:text-[#03130c]"
              >
                Enter the universe
                <ArrowDownRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                github.com/{profile.githubHandle}
                <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4">
        <p className="label-mono text-[9px] text-muted-foreground/70">
          2026 / Personal Universe
        </p>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 sm:block">
            Scroll to travel
          </span>
          <span className="relative h-10 w-px overflow-hidden bg-white/12">
            <span className="sweep-line absolute inset-x-0 top-0 h-4 bg-emerald" />
          </span>
        </div>
        <p className="label-mono hidden text-[9px] text-muted-foreground/70 sm:block">
          18.5204° N / 73.8567° E
        </p>
      </div>
    </section>
  );
}
