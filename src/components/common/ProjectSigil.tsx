import { useId } from "react";
import type { ProjectVisual } from "@/data/projects";

/**
 * A generative project sigil — abstract, deterministic artwork used where a
 * real screenshot belongs. It is labelled as generated in the UI and never
 * presented as a product capture.
 */
export function ProjectSigil({
  visual,
  accent,
  className,
}: {
  visual: ProjectVisual;
  accent: string;
  className?: string;
}) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gridId = `grid-${rawId}`;
  const glowId = `glow-${rawId}`;
  const lineId = `line-${rawId}`;

  return (
    <svg
      viewBox="0 0 600 400"
      className={className}
      role="img"
      aria-label={`Generative ${visual} artwork — not a product screenshot`}
    >
      <defs>
        <pattern id={gridId} width="30" height="30" patternUnits="userSpaceOnUse">
          <path
            d="M30 0H0V30"
            fill="none"
            stroke={accent}
            strokeOpacity="0.09"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id={glowId} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.34" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.06" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={lineId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.05" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#eafff7" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <rect width="600" height="400" fill="#05100c" />
      <rect width="600" height="400" fill={`url(#${gridId})`} />
      <ellipse cx="300" cy="200" rx="260" ry="170" fill={`url(#${glowId})`} />

      <g>{motif(visual, accent, lineId)}</g>

      <g
        fontFamily="'JetBrains Mono', monospace"
        fontSize="10"
        letterSpacing="3"
        fill={accent}
        opacity="0.7"
      >
        <text x="28" y="34">{visual.toUpperCase()}</text>
        <text x="572" y="34" textAnchor="end">
          ALIVERSE / 3D
        </text>
        <text x="28" y="378" opacity="0.6">
          GENERATIVE SIGIL — CAPTURE PENDING
        </text>
      </g>
      <rect
        x="0.5"
        y="0.5"
        width="599"
        height="399"
        fill="none"
        stroke={accent}
        strokeOpacity="0.16"
      />
    </svg>
  );
}

function motif(visual: ProjectVisual, accent: string, lineId: string) {
  switch (visual) {
    case "telemetry":
      return (
        <>
          {Array.from({ length: 14 }, (_, i) => {
            const y = 70 + i * 19;
            const width = 150 + ((i * 97) % 330);
            return (
              <g key={i}>
                <line
                  x1="150"
                  y1={y}
                  x2={150 + width}
                  y2={y}
                  stroke={accent}
                  strokeOpacity={0.16 + (i % 4) * 0.08}
                />
                <circle
                  cx={150 + width}
                  cy={y}
                  r={i % 5 === 0 ? 4 : 2}
                  fill={i % 5 === 0 ? "#eafff7" : accent}
                  opacity={0.85}
                />
              </g>
            );
          })}
          <line
            x1="120"
            y1="52"
            x2="120"
            y2="352"
            stroke={accent}
            strokeOpacity="0.5"
          />
          <path
            d="M120 200 L160 200 L175 165 L195 235 L215 185 L235 200 L480 200"
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            opacity="0.75"
          />
          <rect
            x="388"
            y="70"
            width="128"
            height="88"
            fill="#05100c"
            stroke={accent}
            strokeOpacity="0.3"
          />
          <path
            d="M400 140 L418 118 L436 132 L454 96 L472 122 L490 104"
            fill="none"
            stroke={accent}
            strokeWidth="1.3"
          />
        </>
      );
    case "scan":
      return (
        <>
          <g stroke={accent} strokeOpacity="0.65" fill="none" strokeWidth="2">
            <path d="M180 100h-40v40" />
            <path d="M420 100h40v40" />
            <path d="M180 300h-40v-40" />
            <path d="M420 300h40v-40" />
          </g>
          <rect
            x="215"
            y="118"
            width="170"
            height="164"
            fill="none"
            stroke={accent}
            strokeOpacity="0.45"
            strokeDasharray="4 6"
          />
          <rect x="240" y="146" width="120" height="106" fill={`url(#${lineId})`} opacity="0.16" />
          <line x1="300" y1="80" x2="300" y2="320" stroke="#eafff7" strokeOpacity="0.5" />
          <line
            x1="150"
            y1="200"
            x2="450"
            y2="200"
            stroke={accent}
            strokeWidth="1.4"
            opacity="0.85"
          />
          {Array.from({ length: 5 }, (_, i) => (
            <rect
              key={i}
              x="400"
              y={132 + i * 26}
              width={90 - i * 9}
              height="4"
              fill={accent}
              opacity={0.5 - i * 0.06}
            />
          ))}
          <circle cx="300" cy="200" r="6" fill="#eafff7" />
        </>
      );
    case "library":
      return (
        <>
          {Array.from({ length: 4 }, (_, i) => (
            <rect
              key={i}
              x={170 + i * 18}
              y={110 + i * 14}
              width="230"
              height="150"
              fill="#07140f"
              stroke={accent}
              strokeOpacity={0.34 - i * 0.05}
            />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line
              key={i}
              x1="206"
              y1={158 + i * 15}
              x2={340 + (i % 3) * 30}
              y2={158 + i * 15}
              stroke={accent}
              strokeOpacity="0.35"
            />
          ))}
          <line x1="420" y1="70" x2="420" y2="330" stroke={accent} strokeOpacity="0.35" />
          <circle cx="420" cy="120" r="22" fill="none" stroke={accent} strokeOpacity="0.5" />
          <circle cx="420" cy="200" r="14" fill="none" stroke={accent} strokeOpacity="0.4" />
          <circle cx="420" cy="270" r="18" fill="none" stroke={accent} strokeOpacity="0.3" />
        </>
      );
    case "blade":
      return (
        <>
          <path
            d="M205 310 L380 70 L400 88 L277 330 Z"
            fill={`url(#${lineId})`}
            opacity="0.5"
            stroke={accent}
            strokeOpacity="0.8"
          />
          <path d="M310 130 L388 130 L350 186 Z" fill={accent} opacity="0.55" />
          <circle cx="300" cy="210" r="130" fill="none" stroke={accent} strokeOpacity="0.22" />
          <circle
            cx="300"
            cy="210"
            r="152"
            fill="none"
            stroke={accent}
            strokeOpacity="0.12"
            strokeDasharray="2 10"
          />
          {Array.from({ length: 10 }, (_, i) => (
            <circle
              key={i}
              cx={300 + Math.cos((i / 10) * Math.PI * 2) * 130}
              cy={210 + Math.sin((i / 10) * Math.PI * 2) * 130}
              r={i % 3 === 0 ? 3 : 1.5}
              fill={accent}
              opacity="0.6"
            />
          ))}
        </>
      );
    case "civic":
      return (
        <>
          <path
            d="M300 100 C210 100 160 170 160 250 L160 300 L440 300 L440 250 C440 170 390 100 300 100 Z"
            fill="none"
            stroke={accent}
            strokeOpacity="0.5"
          />
          <path
            d="M300 132 C235 132 195 188 195 250 L195 286 L405 286 L405 250 C405 188 365 132 300 132 Z"
            fill="none"
            stroke={accent}
            strokeOpacity="0.3"
          />
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={i}
              x1={210 + i * 45}
              y1="250"
              x2={210 + i * 45}
              y2="300"
              stroke={accent}
              strokeOpacity="0.4"
            />
          ))}
          <circle cx="300" cy="205" r="14" fill={accent} opacity="0.55" />
          {Array.from({ length: 6 }, (_, i) => (
            <circle
              key={i}
              cx={160 + i * 56}
              cy={330 - (i % 2) * 18}
              r="2.5"
              fill={accent}
              opacity="0.65"
            />
          ))}
        </>
      );
    case "network":
    case "alumni": {
      const points =
        visual === "network"
          ? [
              [180, 130], [290, 96], [400, 150], [230, 230], [350, 250], [470, 300], [160, 310],
            ]
          : [
              [150, 200], [230, 120], [310, 210], [390, 110], [470, 205], [300, 310], [420, 320],
            ];
      return (
        <>
          {visual === "alumni" &&
            [100, 150, 200].map((r) => (
              <circle
                key={r}
                cx="300"
                cy="210"
                r={r}
                fill="none"
                stroke={accent}
                strokeOpacity="0.16"
              />
            ))}
          {points.map(([x, y], i) =>
            points.slice(i + 1).map(([x2, y2], j) => {
              const distance = Math.hypot(x - x2, y - y2);
              if (distance > 170) return null;
              return (
                <line
                  key={`${i}-${j}`}
                  x1={x}
                  y1={y}
                  x2={x2}
                  y2={y2}
                  stroke={accent}
                  strokeOpacity={0.2 + (distance < 100 ? 0.15 : 0)}
                />
              );
            }),
          )}
          {points.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={i % 3 === 0 ? 7 : 4} fill="#05100c" stroke={accent} strokeOpacity="0.8" />
              <circle cx={x} cy={y} r="1.8" fill={accent} />
            </g>
          ))}
        </>
      );
    }
    case "health":
      return (
        <>
          <rect x="170" y="110" width="260" height="180" rx="14" fill="none" stroke={accent} strokeOpacity="0.35" />
          <path
            d="M185 215 H235 L252 180 L272 252 L292 200 H320 L334 224 L352 215 H415"
            fill="none"
            stroke={accent}
            strokeWidth="1.6"
            opacity="0.85"
          />
          <path
            d="M300 140 v42 M279 161 h42"
            stroke={accent}
            strokeWidth="2"
            opacity="0.5"
          />
          {Array.from({ length: 4 }, (_, i) => (
            <line
              key={i}
              x1="185"
              y1={260 + i * 8}
              x2={200 + i * 30}
              y2={260 + i * 8}
              stroke={accent}
              strokeOpacity="0.25"
            />
          ))}
        </>
      );
    case "rural":
      return (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M80 ${300 - i * 34} C 190 ${220 - i * 26}, 250 ${340 - i * 40}, 330 ${268 - i * 30} S 470 ${200 - i * 22}, 540 ${250 - i * 26}`}
              fill="none"
              stroke={accent}
              strokeOpacity={0.35 - i * 0.05}
            />
          ))}
          <circle cx="330" cy="200" r="46" fill="none" stroke={accent} strokeOpacity="0.5" />
          <path d="M300 210 l24 -32 l18 20 l14 -12" fill="none" stroke={accent} strokeOpacity="0.8" />
          <circle cx="330" cy="200" r="3" fill={accent} />
        </>
      );
    case "school":
      return (
        <>
          <path d="M300 90 L450 168 H150 Z" fill="none" stroke={accent} strokeOpacity="0.5" />
          <rect x="180" y="180" width="240" height="130" fill="none" stroke={accent} strokeOpacity="0.4" />
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={200 + i * 60}
              y1="190"
              x2={200 + i * 60}
              y2="300"
              stroke={accent}
              strokeOpacity="0.3"
            />
          ))}
          <rect x="270" y="240" width="60" height="70" fill={accent} opacity="0.22" />
          <circle cx="300" cy="150" r="10" fill={accent} opacity="0.5" />
          <line x1="120" y1="315" x2="480" y2="315" stroke={accent} strokeOpacity="0.35" />
        </>
      );
    case "school-redesign":
      return (
        <>
          <circle cx="300" cy="190" r="90" fill="none" stroke={accent} strokeOpacity="0.4" />
          <circle cx="300" cy="190" r="56" fill={`url(#${lineId})`} opacity="0.18" />
          <rect x="150" y="250" width="300" height="70" fill="none" stroke={accent} strokeOpacity="0.3" />
          {Array.from({ length: 6 }, (_, i) => (
            <line key={i} x1={150 + i * 60} y1="250" x2={150 + i * 60} y2="320" stroke={accent} strokeOpacity="0.16" />
          ))}
          <path d="M250 190 a50 50 0 0 1 100 0" fill="none" stroke={accent} strokeOpacity="0.7" />
          <circle cx="300" cy="190" r="4" fill={accent} />
        </>
      );
    default:
      return null;
  }
}
