import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { RefObject } from "react";
import type { ScrollState } from "@/hooks/useScrollScene";

type Keyframe = {
  position: [number, number, number];
  target: [number, number, number];
};

/**
 * One coherent camera timeline for the entire site. Every scene has a fixed
 * home in world space; scroll progress is interpolated between them.
 */
const KEYFRAMES: Keyframe[] = [
  { position: [0, 0.55, 9.6], target: [1.1, 0.4, 0] }, // awakening
  { position: [1.6, 0.35, -20.5], target: [0, 0.2, -31] }, // origin
  { position: [-1.4, 1.5, -46], target: [0, 0.6, -62] }, // projects
  { position: [2.1, 0.4, -86], target: [0, 0.2, -97] }, // engineering
  { position: [-2.2, 1.4, -111], target: [0.6, 2.4, -121] }, // journey
  { position: [0.3, 1.1, -142], target: [0, 0.4, -156] }, // beyond
  { position: [0, 0.7, -171.5], target: [0, 0.5, -182] }, // contact
];

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function CameraRig({
  scrollRef,
  reduced,
}: {
  scrollRef: RefObject<ScrollState>;
  reduced: boolean;
}) {
  const { camera, size } = useThree();
  const lookAt = useRef(new THREE.Vector3(1.1, 0.4, 0));
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    const fov = size.width < 768 ? 68 : 55;
    const perspective = camera as THREE.PerspectiveCamera;
    if (perspective.isPerspectiveCamera && perspective.fov !== fov) {
      perspective.fov = fov;
      perspective.updateProjectionMatrix();
    }
  }, [camera, size.width]);

  useFrame((_, delta) => {
    const state = scrollRef.current;
    const raw = state ? state.pos : 0;
    const clamped = THREE.MathUtils.clamp(raw, 0, KEYFRAMES.length - 1);
    const lower = Math.floor(clamped);
    const upper = Math.min(lower + 1, KEYFRAMES.length - 1);
    const mix = smoothstep(clamped - lower);
    const from = KEYFRAMES[lower];
    const to = KEYFRAMES[upper];

    desiredPosition.set(
      THREE.MathUtils.lerp(from.position[0], to.position[0], mix),
      THREE.MathUtils.lerp(from.position[1], to.position[1], mix),
      THREE.MathUtils.lerp(from.position[2], to.position[2], mix),
    );
    desiredTarget.set(
      THREE.MathUtils.lerp(from.target[0], to.target[0], mix),
      THREE.MathUtils.lerp(from.target[1], to.target[1], mix),
      THREE.MathUtils.lerp(from.target[2], to.target[2], mix),
    );

    const mobile = size.width < 768;
    if (mobile) {
      desiredPosition.x *= 0.35;
      desiredPosition.z += 3.2;
      desiredTarget.x *= 0.5;
    }

    if (!reduced) {
      desiredPosition.x += pointer.current.x * (mobile ? 0.5 : 1.35);
      desiredPosition.y += pointer.current.y * 0.55;
      desiredTarget.x += pointer.current.x * 0.55;
      desiredTarget.y += pointer.current.y * 0.3;
    }

    const damping = reduced ? 50 : 2.6;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      desiredPosition.x,
      damping,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      desiredPosition.y,
      damping,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      desiredPosition.z,
      reduced ? 50 : 2.2,
      delta,
    );

    lookAt.current.x = THREE.MathUtils.damp(
      lookAt.current.x,
      desiredTarget.x,
      damping,
      delta,
    );
    lookAt.current.y = THREE.MathUtils.damp(
      lookAt.current.y,
      desiredTarget.y,
      damping,
      delta,
    );
    lookAt.current.z = THREE.MathUtils.damp(
      lookAt.current.z,
      desiredTarget.z,
      reduced ? 50 : 2.4,
      delta,
    );

    camera.lookAt(lookAt.current);
  });

  return null;
}
