import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Glow, LightShaft } from "./Glow";

const ACCENTS = ["#2be39b", "#64f0c4", "#a6f7da", "#46ddb0", "#8affd9", "#cdf7e8"];

const nodeGeometry = new THREE.SphereGeometry(0.075, 8, 8);

/** A live engineering foundation: core, orbital nodes and category-reactive light. */
export function EngineeringCore({
  category,
  reduced = false,
  compact = false,
}: {
  category: number;
  reduced?: boolean;
  compact?: boolean;
}) {
  const core = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const orbit = useRef<THREE.Group>(null);
  const counterOrbit = useRef<THREE.Group>(null);
  const accent = ACCENTS[category % ACCENTS.length];

  const nodes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const theta = i * 2.399963;
        const phi = Math.acos(1 - (2 * (i + 0.5)) / 30);
        const radius = 3.9 + (i % 4) * 0.35;
        return {
          position: [
            Math.sin(phi) * Math.cos(theta) * radius,
            Math.cos(phi) * radius * 0.72,
            Math.sin(phi) * Math.sin(theta) * radius,
          ] as [number, number, number],
          size: 0.55 + ((i * 7) % 5) * 0.12,
          hot: i % 5 === 0,
        };
      }),
    [],
  );

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    if (core.current) {
      core.current.rotation.y += delta * (reduced ? 0.03 : 0.16 + category * 0.02);
      core.current.rotation.x = Math.sin(t * 0.2) * 0.16;
      const pulse = 1 + Math.sin(t * 1.1) * (reduced ? 0.008 : 0.035);
      core.current.scale.setScalar(pulse);
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.1;
    }
    if (orbit.current) {
      orbit.current.rotation.y += delta * (reduced ? 0.02 : 0.09 + category * 0.012);
      orbit.current.rotation.x = Math.sin(t * 0.16) * 0.12;
    }
    if (counterOrbit.current) {
      counterOrbit.current.rotation.y -= delta * 0.045;
      counterOrbit.current.rotation.z = Math.cos(t * 0.1) * 0.18;
    }
  });

  return (
    <group position={[0, 0, -97]} scale={compact ? 0.76 : 1}>
      <Glow
        color={accent}
        size={26}
        intensity={0.32}
        falloff={2.7}
        position={[0, 0, 0]}
      />
      <Glow
        color="#ddfff3"
        size={7}
        intensity={0.22}
        falloff={3.4}
        position={[0, 0, 0]}
      />
      <LightShaft
        color="#2be39b"
        height={26}
        radius={5}
        opacity={0.035}
        position={[0, 2, 0]}
      />
      <pointLight
        color={accent}
        intensity={34}
        distance={28}
        position={[0, 2, 3]}
      />
      <pointLight
        color="#d5fff0"
        intensity={16}
        distance={20}
        position={[5, -3, 5]}
      />

      {/* machined housing */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color="#0d241c"
          metalness={0.92}
          roughness={0.3}
          emissive={accent}
          emissiveIntensity={0.45}
        />
      </mesh>
      <mesh ref={inner} scale={0.72}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.5} toneMapped={false} />
      </mesh>

      {/* structural cage */}
      <mesh>
        <icosahedronGeometry args={[3.05, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.16} toneMapped={false} />
      </mesh>

      {[3.7, 4.4, 5.1].map((radius, index) => (
        <mesh
          key={radius}
          rotation={[Math.PI / 2 + index * 0.32, index * 0.5, 0]}
        >
          <torusGeometry args={[radius, 0.012, 6, 180]} />
          <meshBasicMaterial
            color={index === 1 ? "#d9fff1" : accent}
            transparent
            opacity={0.3 - index * 0.06}
            toneMapped={false}
          />
        </mesh>
      ))}

      <group ref={orbit}>
        {nodes.map((node, index) => (
          <group key={index} position={node.position} scale={node.size}>
            <mesh geometry={nodeGeometry}>
              <meshBasicMaterial
                color={node.hot ? "#eafff8" : accent}
                transparent
                opacity={node.hot ? 0.95 : 0.55}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
      </group>

      <group ref={counterOrbit}>
        {[0, 1, 2, 3].map((index) => {
          const angle = (index / 4) * Math.PI * 2;
          return (
            <mesh
              key={index}
              position={[Math.cos(angle) * 6.2, Math.sin(angle) * 2.6, Math.sin(angle) * 3]}
              rotation={[0.4, angle, 0]}
            >
              <boxGeometry args={[0.9, 0.06, 0.9]} />
              <meshStandardMaterial
                color="#6f8179"
                metalness={0.9}
                roughness={0.35}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
