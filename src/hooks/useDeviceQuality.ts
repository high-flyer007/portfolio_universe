import { useMemo } from "react";
import { useReducedMotion } from "./useReducedMotion";

export type DeviceQuality = {
  tier: "low" | "mid" | "high";
  dpr: number;
  particles: number;
  antialias: boolean;
  reduced: boolean;
  webgl: boolean;
  mobile: boolean;
};

function detectWebgl() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

export function useDeviceQuality(): DeviceQuality {
  const reduced = useReducedMotion();

  return useMemo(() => {
    const webgl = detectWebgl();
    const mobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent));
    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    const cores = navigator.hardwareConcurrency ?? 4;
    const lowPower = mobile || cores <= 4 || (memory ?? 8) <= 4;

    if (!webgl) {
      return {
        tier: "low" as const,
        dpr: 1,
        particles: 0,
        antialias: false,
        reduced,
        webgl,
        mobile,
      };
    }

    return {
      tier: lowPower ? ("low" as const) : ("high" as const),
      dpr: lowPower ? 1.35 : 1.8,
      particles: reduced ? 220 : lowPower ? 520 : 1100,
      antialias: !lowPower,
      reduced,
      webgl,
      mobile,
    };
  }, [reduced]);
}
