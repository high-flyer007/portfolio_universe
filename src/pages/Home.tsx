import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import Lenis from "lenis";
import { Atmosphere } from "@/components/common/Atmosphere";
import { SiteNav } from "@/components/navigation/SiteNav";
import { Awakening } from "@/scenes/Awakening";
import { Origin } from "@/scenes/Origin";
import { ProjectUniverse } from "@/scenes/ProjectUniverse";
import { Engineering } from "@/scenes/Engineering";
import { Journey } from "@/scenes/Journey";
import { Beyond } from "@/scenes/Beyond";
import { ContactPortal } from "@/scenes/ContactPortal";
import { ProjectDetails } from "@/pages/ProjectDetails";
import { getProject, projects } from "@/data/projects";
import { SECTION_IDS } from "@/data/sections";
import { useScrollScene } from "@/hooks/useScrollScene";
import { useDeviceQuality } from "@/hooks/useDeviceQuality";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Universe = lazy(() =>
  import("@/three/Universe").then((module) => ({ default: module.Universe })),
);

export default function Home() {
  const quality = useDeviceQuality();
  const reduced = useReducedMotion();
  const { scrollRef, active } = useScrollScene(SECTION_IDS);
  const [focusProject, setFocusProject] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeProject = getProject(searchParams.get("project"));

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    if (activeProject) {
      const index = projects.findIndex((p) => p.slug === activeProject.slug);
      if (index >= 0) setFocusProject(index);
    }
  }, [activeProject]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (activeProject) {
      lenis?.stop();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
        lenis?.start();
      };
    }
    lenis?.start();
    return undefined;
  }, [activeProject]);

  const scrollTo = useCallback(
    (id: string) => {
      if (id === "awakening") {
        if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.6 });
        else
          window.scrollTo({
            top: 0,
            behavior: reduced ? "auto" : "smooth",
          });
        return;
      }
      const element = document.getElementById(id);
      if (!element) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: -12, duration: 1.5 });
      } else {
        element.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      }
    },
    [reduced],
  );

  const openProject = useCallback(
    (slug: string) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          next.set("project", slug);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const closeProject = useCallback(() => {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        next.delete("project");
        return next;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  return (
    <div className="relative min-h-screen bg-[#050706]">
      <a
        href="#main"
        className="sr-only z-[100] rounded bg-emerald px-4 py-2 text-xs font-semibold text-[#03130c] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#050706]" />
        {quality.webgl ? (
          <Suspense fallback={<Atmosphere />}>
            <Universe
              scrollRef={scrollRef}
              activeScene={active}
              focusProject={focusProject}
              activeCategory={activeCategory}
              quality={quality}
            />
          </Suspense>
        ) : (
          <Atmosphere />
        )}
        <div className="vignette absolute inset-0" />
      </div>

      <SiteNav activeScene={active} onNavigate={scrollTo} />

      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <Awakening
          onEnter={() => scrollTo("origin")}
          onViewProjects={() => scrollTo("projects")}
        />
        <Origin />
        <ProjectUniverse
          focusIndex={focusProject}
          onFocusProject={setFocusProject}
          onOpenProject={openProject}
        />
        <Engineering
          activeCategory={activeCategory}
          onActiveCategory={setActiveCategory}
        />
        <Journey />
        <Beyond />
        <ContactPortal onNavigate={scrollTo} />
      </main>

      {activeProject && (
        <ProjectDetails
          project={activeProject}
          onClose={closeProject}
          onOpen={openProject}
        />
      )}
    </div>
  );
}
