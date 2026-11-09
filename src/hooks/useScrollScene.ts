import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

export type ScrollState = {
  /** Continuous camera-timeline position, e.g. 2.4 = 40% from Projects to Engineering. */
  pos: number;
  /** Whole-document scroll progress 0..1. */
  progress: number;
  active: number;
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Converts document scroll into a scene timeline. The scene whose section is
 * crossing the viewport centre owns the camera; the rest of the timeline is
 * interpolated continuously between section homes.
 */
export function useScrollScene(sectionIds: readonly string[]): {
  scrollRef: RefObject<ScrollState>;
  active: number;
} {
  const scrollRef = useRef<ScrollState>({ pos: 0, progress: 0, active: 0 });
  const [active, setActive] = useState(0);
  const idsKey = sectionIds.join("|");

  useEffect(() => {
    const ids = idsKey.split("|");
    let frame = 0;

    const measure = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const doc = document.documentElement;
      const total = Math.max(1, doc.scrollHeight - viewportHeight);
      const progress = clamp(scrollY / total, 0, 1);
      const centre = scrollY + viewportHeight * 0.5;

      let index = 0;
      let local = 0.5;

      ids.forEach((id, i) => {
        const element = document.getElementById(id);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const top = rect.top + scrollY;
        if (centre >= top) {
          index = i;
          local = clamp((centre - top) / Math.max(1, rect.height), 0, 1);
        }
      });

      const pos = clamp(index + local - 0.5, 0, ids.length - 1);
      scrollRef.current = { pos, progress, active: Math.round(pos) };
      setActive((current) =>
        current === scrollRef.current.active ? current : scrollRef.current.active,
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [idsKey]);

  return { scrollRef, active };
}
