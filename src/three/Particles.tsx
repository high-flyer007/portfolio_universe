import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * An infinite emerald dust field that follows the camera, so the universe keeps
 * moving without ever loading thousands of world-space points.
 */
export function ParticleField({
  count = 900,
  reduced = false,
}: {
  count?: number;
  reduced?: boolean;
}) {
  const group = useRef<THREE.Points>(null);
  const dust = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const total = reduced ? Math.min(count, 260) : count;
    const pos = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);
    const emerald = new THREE.Color("#2be39b");
    const silver = new THREE.Color("#cfe8dd");
    for (let i = 0; i < total; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 46;
      // Keep points in front of the camera so nothing blooms across the lens.
      pos[i * 3 + 2] = -4 - Math.random() * 52;
      const mix = Math.random();
      const color = emerald.clone().lerp(silver, mix > 0.82 ? 0.85 : mix * 0.35);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, [count, reduced]);

  const dustPositions = useMemo(() => {
    const total = reduced ? 40 : 150;
    const pos = new Float32Array(total * 3);
    for (let i = 0; i < total; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 2] = -4 - Math.random() * 36;
    }
    return pos;
  }, [reduced]);

  useFrame(({ camera, clock }) => {
    if (group.current) {
      group.current.position.copy(camera.position);
      if (!reduced) {
        group.current.rotation.y = clock.elapsedTime * 0.008;
        group.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.03;
      }
    }
    if (dust.current) {
      dust.current.position.copy(camera.position);
      dust.current.rotation.y = -clock.elapsedTime * 0.015;
    }
  });

  return (
    <>
      <points ref={group} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>

      <points ref={dust} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#6ef0bd"
          sizeAttenuation
          transparent
          opacity={0.32}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </>
  );
}
