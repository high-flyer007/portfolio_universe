import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { SCENE_NAMES, SECTIONS } from "@/data/sections";

function PortalGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="16" cy="16" r="12.5" stroke="#2be39b" strokeOpacity="0.5" />
      <circle cx="16" cy="16" r="8.5" stroke="#2be39b" strokeOpacity="0.85" />
      <circle cx="16" cy="16" r="3" fill="#2be39b" />
      <path
        d="M16 1.5v5M16 25.5v5M1.5 16h5M25.5 16h5"
        stroke="#2be39b"
        strokeOpacity="0.6"
      />
    </svg>
  );
}

export function SiteNav({
  activeScene,
  onNavigate,
}: {
  activeScene: number;
  onNavigate: (id: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setShowTop(window.scrollY > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  const activeLabel =
    SCENE_NAMES[Math.min(Math.max(activeScene, 0), SCENE_NAMES.length - 1)];

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-emerald"
        style={{ scaleX: progress }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "border-b border-white/[0.06] bg-[#050706]/78 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-6 px-5 sm:h-20 sm:px-8 lg:px-12">
          <a
            href="#awakening"
            onClick={(event) => {
              event.preventDefault();
              go("awakening");
            }}
            className="group flex items-center gap-3"
            aria-label="ALIVERSE — back to the awakening"
          >
            <PortalGlyph className="h-7 w-7 transition-transform duration-700 group-hover:rotate-90" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] font-semibold tracking-[0.34em] text-foreground">
                ALIVERSE
              </span>
              <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Mohd Ali Pathan
              </span>
            </span>
          </a>

          <nav
            aria-label="Scenes"
            className="hidden items-center gap-1 lg:flex"
          >
            {SECTIONS.map((section) => {
              const isActive =
                activeScene === Number(section.index) - 1 ||
                (section.id === "origin" && activeScene === 1);
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    go(section.id);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors ${
                    isActive
                      ? "text-emerald"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="mr-1.5 font-mono text-[9px] opacity-50">
                    {section.index}
                  </span>
                  {section.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-[1px] h-px bg-emerald/60"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                go("contact");
              }}
              className="hidden items-center gap-2 rounded-full border border-emerald/25 bg-emerald/[0.06] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-emerald transition-colors hover:border-emerald/60 hover:bg-emerald/10 sm:flex"
            >
              Say hello
              <ArrowUpRight className="size-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 text-foreground transition-colors hover:border-emerald/50 hover:text-emerald lg:hidden"
              aria-label="Open navigation"
              aria-expanded={menuOpen}
            >
              <Menu className="size-4" />
            </button>
            <span className="hidden items-center gap-2 xl:flex">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald" />
              <span className="label-mono text-muted-foreground">
                Pune, IN
              </span>
            </span>
          </div>
        </div>
      </header>

      {/* Scene indicator rail (desktop) */}
      <aside
        aria-label="Current scene"
        className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
      >
        <span className="label-mono text-muted-foreground/60">
          {String(activeScene + 1).padStart(2, "0")} / 07
        </span>
        <div className="relative h-36 w-px bg-white/10">
          <motion.span
            aria-hidden="true"
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-emerald"
            style={{ height: "100%", scaleY: progress, originY: 0 }}
          />
          {SECTIONS.map((section, i) => (
            <span
              key={section.id}
              className={`absolute -left-[3px] size-[7px] rounded-full border transition-colors ${
                activeScene === i + 1
                  ? "border-emerald bg-emerald"
                  : "border-white/25 bg-[#050706]"
              }`}
              style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%` }}
            />
          ))}
        </div>
        <span className="max-w-[7rem] text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-emerald/70">
          {activeLabel}
        </span>
      </aside>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => go("awakening")}
            className="fixed bottom-5 right-5 z-40 flex size-10 items-center justify-center rounded-full border border-white/12 bg-[#050706]/80 text-muted-foreground backdrop-blur-md transition-colors hover:border-emerald/50 hover:text-emerald"
            aria-label="Return to the top"
          >
            <ArrowUp className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-[#050706]/97 backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="flex h-full flex-col px-5 py-5 sm:px-8">
              <div className="flex items-center justify-between">
                <span className="label-mono text-muted-foreground">
                  ALIVERSE / INDEX
                </span>
                <button
                  ref={closeButton}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 text-foreground"
                  aria-label="Close navigation"
                >
                  <X className="size-4" />
                </button>
              </div>

              <nav
                aria-label="Scenes"
                className="mt-10 flex flex-1 flex-col justify-center gap-2"
              >
                {SECTIONS.map((section, index) => (
                  <motion.a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      go(section.id);
                    }}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.045 }}
                    className="group flex items-baseline justify-between border-b border-white/[0.07] py-3"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-emerald/60">
                        {section.index}
                      </span>
                      <span className="font-display text-3xl font-medium tracking-tight text-foreground group-hover:text-emerald sm:text-4xl">
                        {section.label}
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </motion.a>
                ))}
              </nav>

              <div className="flex flex-col gap-5 border-t border-white/[0.08] pt-5">
                <div className="flex items-center gap-4">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-emerald"
                  >
                    <Github className="size-4" /> GitHub
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-emerald"
                  >
                    <Linkedin className="size-4" /> LinkedIn
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-emerald"
                  >
                    <Mail className="size-4" /> Email
                  </a>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                  {profile.tagline}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
