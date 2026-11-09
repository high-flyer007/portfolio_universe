import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal, SceneMarker } from "@/components/common/Reveal";
import { milestones } from "@/data/experience";


export function Origin() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const leadership = milestones.filter((item) =>
    ["ieee", "startup", "sih"].includes(item.id),
  );

  return (
    <section
      ref={ref}
      id="origin"
      aria-labelledby="origin-title"
      className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44"
    >
      <div className="pointer-events-none absolute inset-0 scene-scrim" />

      <div className="relative mx-auto w-full max-w-[1500px]">
        <Reveal>
          <SceneMarker scene="02" label="The Origin" />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 xl:col-span-7">
            <Reveal delay={0.05}>
              <h2
                id="origin-title"
                className="font-display text-[clamp(2.6rem,5.6vw,5.4rem)] font-medium leading-[0.96] tracking-[-0.045em]"
              >
                I&apos;m{" "}
                <span className="font-serif italic text-emerald">Mohd Ali</span>
                <br />
                Pathan.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-2xl text-lg leading-[1.65] text-[#c8d6cf] sm:text-xl lg:text-[1.4rem]">
                {profile.summary}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Computer Engineering at{" "}
                <span className="text-foreground">
                  Ajeenkya DY Patil School of Engineering
                </span>
                , under Savitribai Phule Pune University. Expected graduation{" "}
                <span className="text-foreground">2028</span>, with a reported
                CGPA of <span className="text-emerald">9.55</span> and a
                first-year college topper record.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.09] pt-8 sm:grid-cols-4">
                {profile.facts.map((fact) => (
                  <li key={fact.label}>
                    <p className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                      {fact.value}
                    </p>
                    <p className="mt-2 text-[11px] leading-snug text-[#c8d6cf]">
                      {fact.label}
                    </p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/60">
                      {fact.note}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.15} y={40}>
              <figure className="group relative">
                <div className="relative overflow-hidden border border-white/12 bg-[#08110d]">
                  <motion.img
                    src={profile.portrait}
                    alt={profile.portraitAlt}
                    width={900}
                    height={1120}
                    loading="lazy"
                    style={reduced ? undefined : { y: imageY, scale: imageScale }}
                    className="aspect-[4/5] w-full object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent opacity-70" />
                  <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(43,227,155,0.03)_3px)]" />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald" />
                    <span className="label-mono text-[8px] text-emerald/80">
                      Subject / 01
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <p className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.18em] text-white/60">
                      Portrait placeholder
                      <br />
                      Add public/portrait.jpg
                    </p>
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-emerald/70">
                      Editable
                    </span>
                  </div>
                  <span className="pointer-events-none absolute left-0 top-0 size-5 border-l border-t border-emerald/50" />
                  <span className="pointer-events-none absolute bottom-0 right-0 size-5 border-b border-r border-emerald/50" />
                </div>
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/60">
                  <span>Engineering student / builder</span>
                  <span>Pune, IN</span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 border border-white/[0.09] bg-[#07100c]/70 p-5 backdrop-blur-sm">
                <p className="label-mono text-emerald/70">Current focus</p>
                <ul className="mt-4 space-y-2.5">
                  {profile.focus.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] leading-snug text-[#c8d6cf]"
                    >
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-emerald/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/[0.09] pt-10 lg:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="label-mono text-muted-foreground">Leadership</p>
            <p className="mt-3 max-w-[13rem] font-serif text-2xl italic leading-tight text-[#dcebe3]">
              Rooms where ideas have to survive other people.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-8 lg:col-start-5">
            {leadership.map((item, index) => (
              <Reveal key={item.id} delay={0.06 * index}>
                <article className="group border-t border-white/12 pt-4 transition-colors hover:border-emerald/50">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald/60">
                    {item.chapter} / {item.index}
                  </p>
                  <h3 className="mt-3 text-[15px] font-medium leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {item.meta}
                  </p>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.24} className="sm:col-span-3">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.07] pt-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/60">
                  Also
                </span>
                <span className="text-xs text-[#c8d6cf]">
                  Freelance development
                </span>
                <span className="size-1 rounded-full bg-emerald/40" />
                <span className="text-xs text-[#c8d6cf]">
                  Debate team participation
                </span>
                <a
                  href="#journey"
                  className="ml-auto inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-emerald/80 transition-colors hover:text-emerald"
                >
                  Read the journey
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
