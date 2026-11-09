import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Github, Lock, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { Reveal, SceneMarker } from "@/components/common/Reveal";
import { ProjectSigil } from "@/components/common/ProjectSigil";

const GROUPS = [
  { id: "all", label: "All work" },
  { id: "featured", label: "Featured" },
  { id: "security", label: "Security" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web & design" },
  { id: "community", label: "Community" },
] as const;

const GROUP_BY_SLUG: Record<string, string> = {
  logx: "security",
  satyascan: "ai",
  "studylens-ai": "ai",
  "shadow-blade": "web",
  "janmitra-ai": "ai",
  seniorconnect: "community",
  aluminiconnect: "community",
  "nabha-sihat": "community",
  ruralcare: "community",
  "strawberry-little-star-school": "web",
  "strawberry-little-star-redesign": "web",
};

export function ProjectUniverse({
  focusIndex,
  onFocusProject,
  onOpenProject,
}: {
  focusIndex: number;
  onFocusProject: (index: number) => void;
  onOpenProject: (slug: string) => void;
}) {
  const [group, setGroup] = useState<(typeof GROUPS)[number]["id"]>("all");

  const visible = useMemo(() => {
    if (group === "all") return projects;
    if (group === "featured") return projects.filter((p) => p.priority);
    return projects.filter((p) => GROUP_BY_SLUG[p.slug] === group);
  }, [group]);

  const featured = visible.filter((project) => project.priority);
  const archive = visible.filter((project) => !project.priority);
  const focused = projects[focusIndex] ?? projects[0];
  const focusedIndex = projects.findIndex((p) => p.slug === focused.slug);

  useEffect(() => {
    if (visible.length === 0) return;
    if (!visible.some((project) => project.slug === focused.slug)) {
      onFocusProject(projects.findIndex((p) => p.slug === visible[0].slug));
    }
  }, [visible, focused.slug, onFocusProject]);

  const renderRow = (
    project: (typeof projects)[number],
    size: "featured" | "archive",
  ) => {
    const index = projects.findIndex((p) => p.slug === project.slug);
    const isFocused = index === focusIndex;
    return (
      <button
        key={project.slug}
        type="button"
        onMouseEnter={() => onFocusProject(index)}
        onFocus={() => onFocusProject(index)}
        onClick={() => onOpenProject(project.slug)}
        aria-label={`Open ${project.name} case study`}
        className="group grid w-full grid-cols-[2rem_1fr_auto] items-start gap-4 border-b border-white/[0.08] py-5 text-left transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.03] sm:grid-cols-[2.8rem_1fr_10rem_auto] sm:items-center sm:py-6"
      >
        <span
          className={`font-mono text-[10px] tracking-[0.14em] transition-colors ${
            isFocused ? "text-emerald" : "text-muted-foreground/50"
          }`}
        >
          {project.index}
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className={`font-display font-medium tracking-[-0.03em] transition-colors ${
                size === "featured"
                  ? "text-[clamp(1.6rem,3.4vw,3.1rem)] leading-[1.02]"
                  : "text-[clamp(1.2rem,2.1vw,1.65rem)] leading-tight"
              } ${isFocused ? "text-emerald" : "text-foreground"}`}
            >
              {project.name}
            </span>
            {project.verification === "pending" && (
              <span
                className="inline-flex items-center gap-1 rounded-full border border-amber-200/15 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-amber-100/45"
                title="Repository verification pending"
              >
                <Lock className="size-2" />
                pending
              </span>
            )}
          </span>
          {size === "featured" && (
            <span className="mt-2 block max-w-lg text-xs leading-relaxed text-muted-foreground transition-colors group-hover:text-[#c8d6cf] sm:text-[13px]">
              {project.summary}
            </span>
          )}
        </span>
        <span className="hidden flex-col gap-1 sm:flex">
          <span className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground/70">
            {project.category}
          </span>
          <span
            className={`font-mono text-[8px] uppercase tracking-[0.12em] ${
              isFocused ? "text-emerald/70" : "text-muted-foreground/35"
            }`}
          >
            {project.verification === "documented"
              ? "documented"
              : "unverified"}
          </span>
        </span>
        <span
          className={`mt-1 flex size-7 items-center justify-center rounded-full border transition-all duration-300 sm:mt-0 ${
            isFocused
              ? "border-emerald/60 bg-emerald/10 text-emerald"
              : "border-white/10 text-muted-foreground/60 group-hover:border-emerald/40 group-hover:text-emerald"
          }`}
          aria-hidden="true"
        >
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </button>
    );
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_40%,transparent_10%,rgba(5,7,6,0.55)_60%,rgba(5,7,6,0.9)_100%)]" />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <Reveal>
          <SceneMarker scene="03" label="The Project Universe" />
        </Reveal>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2
              id="projects-title"
              className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em]"
            >
              The Project
              <br />
              <span className="font-serif italic text-emerald">Universe.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="max-w-sm">
            <p className="text-sm leading-relaxed text-[#c8d6cf]">
              Eleven projects. Four flagship environments. Each project
              starts with a real problem and ends with something you can use,
              inspect or play.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/60">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald" /> documented
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full border border-amber-100/40" />{" "}
                verification pending
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div
            role="group"
            aria-label="Filter projects"
            className="mt-12 flex flex-wrap gap-2 border-y border-white/[0.08] py-4"
          >
            {GROUPS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setGroup(item.id)}
                aria-pressed={group === item.id}
                className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] transition-colors ${
                  group === item.id
                    ? "border-emerald/50 bg-emerald/10 text-emerald"
                    : "border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
            <span className="ml-auto hidden self-center font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/50 sm:block">
              {String(visible.length).padStart(2, "0")} shown
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            {featured.length > 0 && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="label-mono text-emerald/60">
                    Featured environments
                  </p>
                  <p className="label-mono text-muted-foreground/40">
                    01 — {String(featured.length).padStart(2, "0")}
                  </p>
                </div>
                <div className="border-t border-white/[0.1]">
                  {featured.map((project) => renderRow(project, "featured"))}
                </div>
              </div>
            )}

            {archive.length > 0 && (
              <div className="mt-10">
                <div className="mb-2 flex items-center justify-between">
                  <p className="label-mono text-muted-foreground/60">
                    Archive & related builds
                  </p>
                  <p className="label-mono text-muted-foreground/40">
                    {archive.length} projects
                  </p>
                </div>
                <div className="border-t border-white/[0.08]">
                  {archive.map((project) => renderRow(project, "archive"))}
                </div>
              </div>
            )}

            <Reveal delay={0.05}>
              <div className="mt-10 flex flex-col gap-4 border border-white/[0.08] bg-[#07100c]/60 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-[#c8d6cf]">
                    Every repository, unfiltered.
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/50">
                    Source code, commits and experiments
                  </p>
                </div>
                <a
                  href="https://github.com/high-flyer007?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-emerald/50 hover:text-emerald"
                >
                  <Github className="size-3.5" />
                  All repositories
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Focus panel */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <div className="border border-white/[0.1] bg-[#060f0b]/85 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => onOpenProject(focused.slug)}
                  className="group block w-full text-left"
                  aria-label={`Open ${focused.name} case study`}
                >
                  <div className="relative overflow-hidden">
                    <ProjectSigil
                      visual={focused.visual}
                      accent={focused.accent}
                      className="aspect-[3/2] w-full"
                    />
                    <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#050706]/70 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                      <Sparkles className="size-2.5" />
                      generative
                    </span>
                  </div>
                </button>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-emerald/70">
                      {focused.index} / {focused.category}
                    </p>
                    <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground/50">
                      {focused.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-tight">
                    {focused.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {focused.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {focused.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="border border-white/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-[#c8d6cf]/80"
                      >
                        {tech}
                      </span>
                    ))}
                    {focused.stack.length > 4 && (
                      <span className="px-2 py-1 font-mono text-[8px] text-muted-foreground/50">
                        +{focused.stack.length - 4}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenProject(focused.slug)}
                    className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-emerald transition-colors hover:text-white"
                  >
                    Enter case study
                    <ArrowUpRight className="size-3.5" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-right font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40">
                Hover the index to explore / click to enter
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
