import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Glow } from "./Glow";
import { projects } from "@/data/projects";

const BOX = new THREE.BoxGeometry(1, 1, 1);
const EDGES = new THREE.EdgesGeometry(BOX);

type MonolithProps = {
  x: number;
  z: number;
  height: number;
  width: number;
  active: boolean;
  accent: string;
  delay: number;
};

function Monolith({ x, z, height, width, active, accent, delay }: MonolithProps) {
  const group = useRef<THREE.Group>(null);
  const marker = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const t = clock.elapsedTime + delay;
    const targetY = active ? 0.55 : 0;
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      targetY + Math.sin(t * 0.6) * 0.09,
      2,
      delta,
    );
    const targetScale = active ? 1.035 : 1;
    group.current.scale.x = THREE.MathUtils.damp(
      group.current.scale.x,
      targetScale,
      3,
      delta,
    );
    group.current.scale.z = group.current.scale.x;
    if (marker.current) {
      marker.current.rotation.y = t * (active ? 0.9 : 0.35);
      marker.current.position.y =
        height / 2 + 0.55 + Math.sin(t * 1.1) * 0.08;
    }
  });

  return (
    <group ref={group} position={[x, 0, z]}>
      <mesh geometry={BOX} scale={[width, height, width * 0.72]}>
        <meshStandardMaterial
          color={active ? "#16241f" : "#0d1613"}
          metalness={0.86}
          roughness={active ? 0.28 : 0.45}
          emissive={accent}
          emissiveIntensity={active ? 0.16 : 0.04}
        />
      </mesh>
      <lineSegments
        geometry={EDGES}
        scale={[width, height, width * 0.72]}
      >
        <lineBasicMaterial
          color={active ? accent : "#2d5c4c"}
          transparent
          opacity={active ? 0.9 : 0.35}
          toneMapped={false}
        />
      </lineSegments>

      <mesh ref={marker} position={[0, height / 2 + 0.55, 0]}>
        <octahedronGeometry args={[active ? 0.16 : 0.09, 0]} />
        <meshBasicMaterial
          color={active ? accent : "#5c8f7c"}
          toneMapped={false}
        />
      </mesh>

      {active && (
        <Glow
          color={accent}
          size={7}
          intensity={0.42}
          falloff={2.6}
          position={[0, height * 0.22, 0.3]}
        />
      )}
    </group>
  );
}

/** The project constellation: one metallic marker per build, focus driven by UI. */
export function ProjectMonoliths({
  focus,
  compact = false,
}: {
  focus: number;
  compact?: boolean;
}) {
  const nodes = useMemo(() => {
    const arranged = projects.map((project, index) => {
      const center = (projects.length - 1) / 2;
      return {
        project,
        x: (index - center) * 2.75,
        z: -63 + Math.cos(index * 1.9) * 3.2,
        height: 3.1 + Math.abs(Math.sin(index * 2.05)) * 6.4,
        width: 1.05 + (index % 3) * 0.16,
        delay: index * 0.37,
      };
    });
    return arranged;
  }, []);

  return (
    <group scale={compact ? 0.72 : 1}>
      <Glow
        color="#1fd695"
        size={46}
        intensity={0.16}
        falloff={2.8}
        position={[0, 6, -68]}
      />
      <pointLight
        color="#2be39b"
        intensity={40}
        distance={48}
        position={[0, 8, -52]}
      />
      <pointLight
        color="#b9e8d5"
        intensity={16}
        distance={30}
        position={[-12, 3, -56]}
      />
      <gridHelper
        args={[76, 38, "#0e3428", "#071a14"]}
        position={[0, -1.9, -63]}
      />
      {nodes.map((node) => (
        <Monolith
          key={node.project.slug}
          x={node.x}
          z={node.z}
          height={node.height}
          width={node.width}
          active={focus === projects.indexOf(node.project)}
          accent={node.project.accent}
          delay={node.delay}
        />
      ))}
    </group>
  );
}
