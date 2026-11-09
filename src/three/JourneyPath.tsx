import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Glow } from "./Glow";

const STEP_COUNT = 8;

/** An ascending metallic pathway with a light at the end of the climb. */
export function JourneyPath() {
  const markers = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Mesh>(null);

  const steps = useMemo(
    () =>
      Array.from({ length: STEP_COUNT }, (_, i) => ({
        position: [
          Math.sin(i * 0.75) * 2.1,
          -5.4 + i * 1.45,
          -124 + i * 1.15,
        ] as [number, number, number],
        rotation: [0.03, Math.sin(i * 0.75) * 0.16, 0.02] as [
          number,
          number,
          number,
        ],
      })),
    [],
  );

  const line = useMemo(() => {
    const points = steps.map(
      (step, index) =>
        new THREE.Vector3(
          step.position[0] + (index % 2 === 0 ? 2.8 : -2.8),
          step.position[1] + 0.7,
          step.position[2] + 0.4,
        ),
    );
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color("#2be39b"),
      transparent: true,
      opacity: 0.32,
    });
    return new THREE.Line(geometry, material);
  }, [steps]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (markers.current) {
      markers.current.children.forEach((child, index) => {
        child.rotation.y = t * 0.25 + index;
      });
    }
    if (beam.current) {
      const material = beam.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.05 + Math.sin(t * 0.7) * 0.015;
    }
  });

  return (
    <group position={[0, 1, 0]}>
      <Glow
        color="#1fd695"
        size={30}
        intensity={0.16}
        falloff={3}
        position={[3, 10.5, -118]}
      />
      <pointLight
        color="#2be39b"
        intensity={26}
        distance={34}
        position={[2, 6, -118]}
      />

      {steps.map((step, index) => (
        <group key={index} position={step.position} rotation={step.rotation}>
          <mesh>
            <boxGeometry args={[4.4, 0.16, 1.5]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? "#14241e" : "#0c1613"}
              metalness={0.88}
              roughness={0.32}
              emissive="#0d3b2b"
              emissiveIntensity={index % 3 === 0 ? 0.5 : 0.2}
            />
          </mesh>
          <mesh position={[0, 0.09, 0.72]}>
            <boxGeometry args={[4.4, 0.02, 0.03]} />
            <meshBasicMaterial
              color="#2be39b"
              transparent
              opacity={index % 3 === 0 ? 0.8 : 0.32}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      <group ref={markers}>
        {steps.map((step, index) => (
          <group
            key={index}
            position={[
              step.position[0] + (index % 2 === 0 ? 2.8 : -2.8),
              step.position[1] + 0.7,
              step.position[2] + 0.4,
            ]}
          >
            <mesh>
              <octahedronGeometry args={[index === STEP_COUNT - 1 ? 0.3 : 0.16, 0]} />
              <meshBasicMaterial
                color={index === STEP_COUNT - 1 ? "#eafff8" : "#3ee3aa"}
                toneMapped={false}
              />
            </mesh>
            <mesh position={[0, -0.7, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 1.3, 4]} />
              <meshBasicMaterial
                color="#2be39b"
                transparent
                opacity={0.28}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
      </group>

      <primitive object={line} />

      <mesh ref={beam} position={[3, 9.6, -118]} rotation={[0, 0, 0]}>
        <planeGeometry args={[3.4, 10]} />
        <meshBasicMaterial
          color="#2be39b"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
