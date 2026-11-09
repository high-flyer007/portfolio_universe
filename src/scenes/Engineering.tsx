import { useState } from "react";
import { ArrowUpRight, Circle } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Reveal, SceneMarker } from "@/components/common/Reveal";

export function Engineering({
  activeCategory,
  onActiveCategory,
}: {
  activeCategory: number;
  onActiveCategory: (index: number) => void;
}) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const category = skillCategories[activeCategory] ?? skillCategories[0];
  const activeTech =
    category.nodes.find((node) => node.name === hoveredTech) ??
    category.nodes[0];

  return (
    <section
      id="engineering"
      aria-labelledby="engineering-title"
      className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_5%,rgba(5,7,6,0.5)_55%,rgba(5,7,6,0.85)_100%)]" />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <Reveal>
          <SceneMarker scene="04" label="The Engineering Core" />
        </Reveal>

        <div className="mt-10 max-w-3xl">
          <Reveal delay={0.05}>
            <h2
              id="engineering-title"
              className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em]"
            >
              The Engineering
              <br />
              <span className="font-serif italic text-emerald">Core.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#c8d6cf]">
              A foundation, not a scorecard. Select a layer to see the tools I
              work with and the job each one does. No percentages, no invented
              proficiency levels.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4" delay={0.05}>
            <div role="tablist" aria-label="Technology categories" className="border-t border-white/[0.1]">
              {skillCategories.map((item, index) => {
                const isActive = index === activeCategory;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="engineering-panel"
                    id={`tech-tab-${item.id}`}
                    type="button"
                    onClick={() => onActiveCategory(index)}
                    onMouseEnter={() => onActiveCategory(index)}
                    className={`group flex w-full items-center gap-4 border-b border-white/[0.08] py-4 text-left transition-colors ${
                      isActive ? "text-emerald" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono text-[9px] tracking-[0.14em] opacity-60">
                      {item.index}
                    </span>
                    <span className="flex-1 font-display text-xl font-medium tracking-tight sm:text-2xl">
                      {item.label}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] opacity-40">
                      {item.code}
                    </span>
                    <span
                      className={`size-1.5 rounded-full transition-all ${
                        isActive
                          ? "bg-emerald shadow-[0_0_10px_rgba(43,227,155,0.9)]"
                          : "bg-white/20 group-hover:bg-white/40"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-6 border border-white/[0.08] bg-[#07100c]/60 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/50">
                Currently closest to
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#c8d6cf]">
                React, Python and FastAPI — the stack behind the security and AI
                projects in this universe.
              </p>
            </div>
          </Reveal>

          <div
            id="engineering-panel"
            role="tabpanel"
            aria-labelledby={`tech-tab-${category.id}`}
            className="lg:col-span-7 lg:col-start-6"
          >
            <Reveal delay={0.1}>
              <div className="flex items-start justify-between gap-6 border-t border-emerald/25 pt-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald/70">
                    Layer {category.index} / {category.code}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                    {category.label}
                  </h3>
                  <p className="mt-3 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                    {category.summary}
                  </p>
                </div>
                <Circle className="mt-1 size-3 shrink-0 text-emerald/40" />
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {category.nodes.map((node, index) => {
                const isHovered = node.name === activeTech.name;
                return (
                  <Reveal key={node.name} delay={0.03 * index} y={14}>
                    <button
                      type="button"
                      onMouseEnter={() => setHoveredTech(node.name)}
                      onFocus={() => setHoveredTech(node.name)}
                      onClick={() => setHoveredTech(node.name)}
                      className={`group flex w-full items-center justify-between gap-3 border px-3.5 py-3 text-left transition-all duration-300 ${
                        isHovered
                          ? "border-emerald/40 bg-emerald/[0.06]"
                          : "border-white/[0.09] bg-[#07100c]/50 hover:border-white/20"
                      }`}
                    >
                      <span
                        className={`text-[13px] font-medium transition-colors ${
                          isHovered ? "text-emerald" : "text-foreground"
                        }`}
                      >
                        {node.name}
                      </span>
                      <ArrowUpRight
                        className={`size-3 transition-all ${
                          isHovered
                            ? "text-emerald"
                            : "text-muted-foreground/40 group-hover:text-muted-foreground"
                        }`}
                      />
                    </button>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-6 min-h-[5.5rem] border-l border-emerald/30 pl-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/50">
                {activeTech.name} / in use
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#c8d6cf]">
                {activeTech.note}
              </p>
            </div>

            <p className="mt-6 font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground/40">
              Hover or tap a technology to read its role. The core responds to
              the active layer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
