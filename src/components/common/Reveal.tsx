import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -10% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SceneMarker({
  scene,
  label,
  className,
}: {
  scene: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`label-mono flex items-center gap-3 text-emerald/75 ${className ?? ""}`}
    >
      <span className="text-emerald">SCENE {scene}</span>
      <span className="h-px w-8 bg-emerald/35" aria-hidden="true" />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
