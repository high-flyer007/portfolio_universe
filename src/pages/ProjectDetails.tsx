import { useEffect, useRef } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Lock,
  Sparkles,
  X,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { getProjectNeighbours } from "@/data/projects";
import { ProjectSigil } from "@/components/common/ProjectSigil";

export function ProjectDetails({
  project,
  onClose,
  onOpen,
}: {
  project: Project;
  onClose: () => void;
  onOpen: (slug: string) => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const { previous, next } = getProjectNeighbours(project.slug);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    if (container.current) container.current.scrollTop = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !container.current) return;
      const focusable = container.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [project.slug]);

  return (
    <div
      ref={container}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-title-${project.slug}`}
      data-lenis-prevent
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-[#050706]"
    >
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(80%_50%_at_70%_0%,rgba(43,227,155,0.08),transparent_60%)]" />

      <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#050706]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-emerald"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Back to the universe</span>
            <span className="sm:hidden">Back</span>
            <kbd className="ml-1 hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[8px] text-muted-foreground/50 sm:inline">
              ESC
            </kbd>
          </button>

          <div className="flex items-center gap-2">
            {previous && (
              <button
                type="button"
                onClick={() => onOpen(previous.slug)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-emerald/40 hover:text-emerald"
                aria-label={`Previous project: ${previous.name}`}
              >
                <ArrowLeft className="size-3" />
                <span className="hidden sm:inline">Prev</span>
              </button>
            )}
            {next && (
              <button
                type="button"
                onClick={() => onOpen(next.slug)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-emerald/40 hover:text-emerald"
                aria-label={`Next project: ${next.name}`}
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="size-3" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-1 flex size-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-emerald/40 hover:text-emerald"
              aria-label="Close project"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
        <p className="label-mono flex flex-wrap items-center gap-2 text-emerald/70">
          <span>Project {project.index}</span>
          <span className="h-px w-5 bg-emerald/30" />
          <span className="text-muted-foreground">
            {project.category}
          </span>
        </p>

        <h1
          id={`project-title-${project.slug}`}
          className="mt-5 font-display text-[clamp(2.8rem,8vw,6.5rem)] font-medium leading-[0.86] tracking-[-0.055em]"
        >
          {project.name}
          <span className="text-emerald">.</span>
        </h1>

        <p className="mt-5 max-w-2xl font-serif text-xl italic leading-snug text-[#dcebe3] sm:text-2xl">
          {project.tagline}
        </p>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {project.summary}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/[0.07] px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-emerald transition-colors hover:bg-emerald hover:text-[#03130c]"
          >
            <Github className="size-3.5" />
            View source
            <ArrowUpRight className="size-3" />
          </a>
          {project.live && (
            <a
              href={project.live.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-emerald/50 hover:text-emerald"
            >
              <ExternalLink className="size-3.5" />
              Live site
            </a>
          )}
          {project.extraRepos?.map((repo) => (
            <a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-emerald/50 hover:text-emerald"
            >
              <Github className="size-3.5" />
              {repo.label}
            </a>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-white/[0.09] bg-white/[0.07] sm:grid-cols-4">
          <MetaCell label="Status" value={project.status} />
          <MetaCell
            label="Verification"
            value={
              project.verification === "documented"
                ? "Documented"
                : "Pending"
            }
          />
          <MetaCell label="Build type" value={project.category} />
          <MetaCell
            label="Repo count"
            value={String(1 + (project.extraRepos?.length ?? 0))}
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Section title="The problem" index="01">
              <p className="text-sm leading-relaxed text-[#c8d6cf]">
                {project.problem}
              </p>
            </Section>

            <Section title="What it does" index="02">
              {project.features.length > 0 ? (
                <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#c8d6cf]"
                    >
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-emerald" />
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <Placeholder>
                  Feature list pending repository verification. This entry is
                  intentionally left unembellished rather than guessed.
                </Placeholder>
              )}
            </Section>

            <Section title="Technical case study" index="03">
              <div className="space-y-6">
                {project.caseStudy.map((entry) => (
                  <div
                    key={entry.title}
                    className="border-l border-emerald/20 pl-4"
                  >
                    <h4 className="font-display text-base font-medium tracking-tight text-foreground">
                      {entry.title}
                    </h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                      {entry.body}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Roadmap" index="04">
              {project.roadmap.length > 0 ? (
                <ol className="space-y-3">
                  {project.roadmap.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[13px] leading-relaxed text-[#c8d6cf]"
                    >
                      <span className="mt-1 font-mono text-[9px] text-emerald/60">
                        →
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              ) : (
                <Placeholder>
                  No future roadmap is published for this project. Roadmap
                  features are not claimed here — this panel is ready for
                  planned work to be documented.
                </Placeholder>
              )}
            </Section>

            <Section title="My contribution" index="05">
              {project.contribution ? (
                <p className="text-sm leading-relaxed text-[#c8d6cf]">
                  {project.contribution}
                </p>
              ) : (
                <Placeholder>
                  Contribution record pending. Add a short, specific note here
                  describing what was designed, built and shipped.
                </Placeholder>
              )}
            </Section>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-24">
              <div className="border border-white/[0.09] bg-[#07100c]/70 p-5">
                <p className="label-mono text-muted-foreground/60">
                  Technology
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-white/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-[#c8d6cf]/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-4">
                  <p className="label-mono text-muted-foreground/60">
                    Repository
                  </p>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block break-all text-xs text-emerald/80 transition-colors hover:text-emerald"
                  >
                    {project.repo.replace("https://", "")}
                  </a>
                </div>

                {project.live && (
                  <div className="mt-4">
                    <p className="label-mono text-muted-foreground/60">
                      Live deployment
                    </p>
                    <a
                      href={project.live.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block break-all text-xs text-emerald/80 transition-colors hover:text-emerald"
                    >
                      {project.live.label}
                    </a>
                    <p className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.08em] text-amber-100/40">
                      {project.live.note}
                    </p>
                  </div>
                )}

                <div className="mt-6 border-t border-white/[0.08] pt-4">
                  <p className="label-mono text-muted-foreground/60">
                    Status note
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {project.statusNote}
                  </p>
                </div>
              </div>

              <div
                className={`mt-4 border p-4 ${
                  project.verification === "documented"
                    ? "border-emerald/20 bg-emerald/[0.04]"
                    : "border-amber-100/15 bg-amber-100/[0.03]"
                }`}
              >
                <p className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground/70">
                  {project.verification === "documented" ? (
                    <Sparkles className="size-3 text-emerald/70" />
                  ) : (
                    <Lock className="size-3 text-amber-100/50" />
                  )}
                  Verification note
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  {project.verificationNote}
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 border-t border-white/[0.08] pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-mono text-muted-foreground/60">
                Project imagery
              </p>
              <p className="mt-2 max-w-lg text-xs leading-relaxed text-muted-foreground/70">
                Actual screenshots were not supplied with this build. The panels
                below are generative art, clearly labelled — replace them with
                real captures from the repository.
              </p>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-amber-100/40">
              <AlertCircle className="size-3" />
              placeholders
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.artifacts.map((artifact) => (
              <figure
                key={artifact.label}
                className="group border border-white/[0.09] bg-[#07100c]"
              >
                <div className="overflow-hidden">
                  <ProjectSigil
                    visual={project.visual}
                    accent={project.accent}
                    className="aspect-[3/2] w-full transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="border-t border-white/[0.07] p-3">
                  <p className="text-xs text-[#c8d6cf]">{artifact.label}</p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground/40">
                    {artifact.note} · screenshot pending
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {next && (
          <button
            type="button"
            onClick={() => onOpen(next.slug)}
            className="group mt-16 flex w-full flex-col items-start justify-between gap-4 border-t border-white/[0.09] py-8 text-left sm:flex-row sm:items-end"
          >
            <div>
              <p className="label-mono text-muted-foreground/60">
                Next project
              </p>
              <p className="mt-2 font-display text-3xl font-medium tracking-tight transition-colors group-hover:text-emerald sm:text-5xl">
                {next.name}
              </p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/50">
                {next.category}
              </p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-full border border-white/15 text-muted-foreground transition-all group-hover:border-emerald/50 group-hover:text-emerald">
              <ArrowRight className="size-4" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#060f0b] p-4">
      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/50">
        {label}
      </p>
      <p className="mt-1.5 text-xs leading-snug text-[#c8d6cf]">{value}</p>
    </div>
  );
}

function Section({
  title,
  index,
  children,
}: {
  title: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 border-t border-white/[0.09] pt-5">
      <h3 className="font-display text-xl font-medium tracking-tight text-foreground">
        <span className="mr-2 font-mono text-[9px] tracking-[0.14em] text-emerald/50">
          {index}
        </span>
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-dashed border-amber-100/15 bg-amber-100/[0.02] p-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-amber-100/40">
      {children}
    </p>
  );
}
