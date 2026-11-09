import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

const EASE = [0.22, 1, 0.36, 1] as const;

function RevealText({
  text,
  className,
  delay = 0,
  reduced,
}: {
  text: string;
  className?: string;
  delay?: number;
  reduced: boolean;
}) {
  return (
    <span aria-hidden="true" className={className}>
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={
            reduced ? false : { y: "112%", opacity: 0, rotate: 2.5 }
          }
          animate={{ y: "0%", opacity: 1, rotate: 0 }}
          transition={{
            duration: 1.05,
            delay: delay + index * 0.038,
            ease: EASE,
          }}
          className="inline-block will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/** A brief portal flare that carries the eye from the hero into the Origin. */
function PortalTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-[65] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 bg-[#050706]"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.86, 0.86, 0.15] }}
        transition={{
          duration: 1.45,
          times: [0, 0.35, 0.7, 1],
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.85, 0] }}
        transition={{ duration: 1.2, times: [0, 0.35, 1] }}
      >
        <span className="absolute left-1/2 top-1/2 h-px w-[120vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald/60 to-transparent" />
        <span className="absolute left-1/2 top-1/2 size-[68vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald/20" />
      </motion.div>

      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="absolute size-[34vmin] rounded-full border border-emerald/55"
          initial={{ scale: 0.2, opacity: 0.85 }}
          animate={{ scale: 8 + index * 3, opacity: 0 }}
          transition={{
            duration: 1.35,
            delay: 0.1 + index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: [8, 0, -4, -10] }}
        transition={{
          duration: 1.35,
          times: [0, 0.25, 0.7, 1],
          ease: "easeInOut",
        }}
      >
        <p className="label-mono text-emerald/70">Entering the universe</p>
        <p className="mt-3 font-display text-2xl font-medium tracking-[0.16em] text-foreground sm:text-3xl">
          02 / ORIGIN
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Awakening({
  onEnter,
  onViewProjects,
}: {
  onEnter: () => void;
  onViewProjects: () => void;
}) {
  const reduced = Boolean(useReducedMotion());
  const [entering, setEntering] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  const enter = () => {
    if (entering) return;
    if (reduced) {
      onEnter();
      return;
    }
    setEntering(true);
    timers.current.push(window.setTimeout(onEnter, 560));
    timers.current.push(window.setTimeout(() => setEntering(false), 1500));
  };

  return (
    <section
      id="awakening"
      aria-label="ALIVERSE — introduction"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-7 pt-24 sm:px-8 sm:pb-9 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#050706] via-[#050706]/72 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_75%_at_16%_62%,rgba(5,7,6,0.8),rgba(5,7,6,0.42)_46%,transparent_76%)]" />

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
          className="flex shrink-0 items-center gap-3"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-emerald" />
          <span className="label-mono text-muted-foreground">
            Scene 01 / Awakening
          </span>
        </motion.div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end pb-8 pt-14 sm:pb-10 sm:pt-16 lg:pb-14">
        <div className="w-full">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
            className="mb-4 flex items-center gap-4 sm:mb-5"
          >
            <span className="h-px w-10 bg-emerald/60" />
            <span className="label-mono text-[9px] text-emerald/80">
              Portfolio / Vol. 01
            </span>
            <span className="hidden label-mono text-[9px] text-muted-foreground/50 sm:block">
              Selected systems &amp; experiments
            </span>
          </motion.div>

          <h1 aria-label="Mohd Ali Pathan" className="select-none">
            <span className="block overflow-hidden pb-[0.04em]">
              <RevealText
                text="MOHD ALI"
                delay={0.38}
                reduced={reduced}
                className="block font-display text-[clamp(3.2rem,12.6vw,11.8rem)] font-medium leading-[0.8] tracking-[-0.055em] text-[#eef8f2] drop-shadow-[0_0_60px_rgba(43,227,155,0.07)]"
              />
            </span>

            <span className="mt-1 flex flex-col gap-4 sm:mt-2 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
              <span className="block overflow-hidden pb-[0.05em]">
                <RevealText
                  text="PATHAN"
                  delay={0.58}
                  reduced={reduced}
                  className="text-outline block font-display text-[clamp(3.2rem,12.6vw,11.8rem)] font-medium leading-[0.8] tracking-[-0.055em]"
                />
              </span>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.95, ease: EASE }}
                className="mb-1 max-w-[17rem] shrink-0 border-l border-emerald/30 pl-4 sm:pl-5 lg:mb-[0.9em] lg:max-w-[18rem] lg:border-l-0 lg:border-r lg:pl-0 lg:pr-5 lg:text-right"
              >
                <p className="label-mono text-[9px] text-emerald/90 sm:text-[10px]">
                  {profile.tagline}
                </p>
                <span className="mt-3 block h-px w-10 bg-gradient-to-r from-emerald/50 to-transparent lg:ml-auto" />
                <p className="mt-3 font-serif text-xl italic leading-tight text-[#dcebe3] sm:text-2xl lg:text-[1.65rem]">
                  {profile.role}
                </p>
              </motion.div>
            </span>
          </h1>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.12, ease: EASE }}
            className="mt-7 grid gap-6 border-t border-white/[0.09] pt-6 sm:mt-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14"
          >
            <div>
              <p className="max-w-xl text-sm leading-relaxed text-[#a7bbb0] sm:text-[15px]">
                {profile.heroStatement}
              </p>
              <p className="label-mono mt-4 text-[9px] text-muted-foreground/70">
                {profile.metadata}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={enter}
                  disabled={entering}
                  className="group relative flex min-h-11 items-center gap-3 overflow-hidden rounded-full border border-emerald/45 bg-emerald/[0.08] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald transition-all duration-300 hover:border-emerald hover:bg-emerald hover:text-[#03130c] disabled:opacity-70"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                  <span className="relative">Enter the universe</span>
                  <ArrowDownRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </button>
                <button
                  type="button"
                  onClick={onViewProjects}
                  className="group flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#dbe9e1] transition-all duration-300 hover:border-emerald/55 hover:text-emerald"
                >
                  View projects
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
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

      <AnimatePresence>{entering && <PortalTransition />}</AnimatePresence>
    </section>
  );
}
