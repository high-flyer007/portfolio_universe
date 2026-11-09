import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";
import { Glow } from "./Glow";
import { interests } from "@/data/experience";

function Drift({
  position,
  children,
  speed = 0.5,
  tilt = 0,
  scale = 1,
}: {
  position: [number, number, number];
  children: ReactNode;
  speed?: number;
  tilt?: number;
  scale?: number;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime * speed;
    group.current.position.y = position[1] + Math.sin(t) * 0.3;
    group.current.rotation.y = tilt + Math.sin(t * 0.6) * 0.22;
  });
  return (
    <group ref={group} position={position} scale={scale}>
      {children}
    </group>
  );
}

function MetalMaterial({ color = "#77897f" }: { color?: string }) {
  return <meshStandardMaterial color={color} metalness={0.92} roughness={0.3} />;
}

function ChessKnight() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.5, 0);
    shape.lineTo(0.46, 0);
    shape.lineTo(0.4, 0.2);
    shape.quadraticCurveTo(0.16, 0.3, 0.14, 0.48);
    shape.quadraticCurveTo(0.6, 0.58, 0.62, 0.98);
    shape.quadraticCurveTo(0.3, 1.08, 0.1, 0.86);
    shape.lineTo(0.0, 1.14);
    shape.quadraticCurveTo(-0.26, 1.2, -0.32, 0.9);
    shape.quadraticCurveTo(-0.2, 0.66, -0.04, 0.58);
    shape.lineTo(-0.32, 0.42);
    shape.quadraticCurveTo(-0.56, 0.26, -0.5, 0.02);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.34,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.03,
      bevelThickness: 0.03,
      steps: 1,
      curveSegments: 12,
    });
    geo.center();
    geo.scale(1.35, 1.35, 1.35);
    return geo;
  }, []);

  return (
    <group position={[0, -0.35, 0]}>
      <mesh geometry={geometry}>
        <MetalMaterial color="#93a59d" />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.52, 0.66, 0.18, 12]} />
        <MetalMaterial />
      </mesh>
      <mesh position={[0.02, 0.35, 0.19]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshBasicMaterial color="#d9fff0" toneMapped={false} />
      </mesh>
    </group>
  );
}

function MmaGloves() {
  return (
    <group rotation={[0.2, 0.2, 0]}>
      {[-0.5, 0.5].map((x) => (
        <group key={x} position={[x, 0, 0]} scale={[1, 0.9, 1.15]}>
          <mesh>
            <sphereGeometry args={[0.44, 24, 20]} />
            <meshStandardMaterial color="#54242b" roughness={0.55} metalness={0.15} />
          </mesh>
          <mesh position={[0, -0.2, -0.62]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.34, 0.4, 16]} />
            <MetalMaterial color="#7d8b83" />
          </mesh>
          <mesh position={[-0.3, 0.1, 0.2]} scale={[0.32, 0.28, 0.35]}>
            <sphereGeometry args={[1, 14, 12]} />
            <meshStandardMaterial color="#63303a" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.16, 0.36]}>
            <boxGeometry args={[0.16, 0.34, 0.02]} />
            <meshBasicMaterial color="#2be39b" transparent opacity={0.5} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CricketBall() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.5, 32, 24]} />
        <meshStandardMaterial
          color="#cbbfa4"
          roughness={0.62}
          metalness={0.18}
          emissive="#201a10"
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh rotation={[0.6, 0.4, 0.5]}>
        <torusGeometry args={[0.49, 0.012, 6, 64]} />
        <meshBasicMaterial color="#e9dfc7" transparent opacity={0.65} toneMapped={false} />
      </mesh>
      <mesh rotation={[0.6, 0.4, 0.5]} scale={1.005}>
        <torusGeometry args={[0.46, 0.02, 6, 64, Math.PI * 0.2]} />
        <meshBasicMaterial color="#d8c9a8" transparent opacity={0.45} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <torusGeometry args={[1.15, 0.006, 4, 120]} />
        <meshBasicMaterial color="#2be39b" transparent opacity={0.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Headphones() {
  return (
    <group rotation={[0.15, 0, 0]}>
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.62, 0.055, 12, 64, Math.PI]} />
        <MetalMaterial color="#8c9c94" />
      </mesh>
      {[-0.62, 0.62].map((x) => (
        <group key={x} position={[x, 0.2, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.18, 20]} />
            <meshStandardMaterial color="#16231e" metalness={0.8} roughness={0.4} />
          </mesh>
          <mesh position={[x > 0 ? 0.1 : -0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.02, 20]} />
            <meshBasicMaterial color="#2be39b" transparent opacity={0.7} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
        <mesh key={x} position={[x, 0.55 + Math.sin(i * 1.7) * 0.2, 0]}>
          <boxGeometry args={[0.03, 0.24 + i * 0.12, 0.03]} />
          <meshBasicMaterial color="#2be39b" transparent opacity={0.5} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Mountains() {
  return (
    <group position={[0, -0.6, 0]}>
      {[
        { x: -0.65, h: 1.7, r: 0.85 },
        { x: 0.15, h: 2.2, r: 1.0 },
        { x: 0.9, h: 1.3, r: 0.7 },
      ].map((peak, index) => (
        <group key={index} position={[peak.x, peak.h / 2, index * 0.2]}>
          <mesh>
            <coneGeometry args={[peak.r, peak.h, 4]} />
            <meshStandardMaterial
              color="#14221d"
              metalness={0.55}
              roughness={0.62}
              flatShading
            />
          </mesh>
          <mesh position={[0, peak.h / 2 - 0.16, 0]}>
            <coneGeometry args={[peak.r * 0.3, peak.h * 0.02, 4]} />
            <meshBasicMaterial color="#8dffd6" toneMapped={false} />
          </mesh>
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <torusGeometry args={[1.5, 0.006, 4, 100]} />
        <meshBasicMaterial color="#2be39b" transparent opacity={0.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Globe() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.78, 16, 12]} />
        <meshBasicMaterial color="#2be39b" wireframe transparent opacity={0.32} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.74, 32, 24]} />
        <meshStandardMaterial
          color="#0a1c16"
          transparent
          opacity={0.55}
          metalness={0.7}
          roughness={0.35}
          emissive="#0c3a2b"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[1.02, 0.009, 6, 96]} />
        <meshBasicMaterial color="#bdf7e4" transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <mesh rotation={[0.4, 1.2, 0.8]}>
        <torusGeometry args={[1.18, 0.006, 6, 96]} />
        <meshBasicMaterial color="#2be39b" transparent opacity={0.3} toneMapped={false} />
      </mesh>
    </group>
  );
}

function InterestArt({ kind }: { kind: (typeof interests)[number]["object"] }) {
  switch (kind) {
    case "chess":
      return <ChessKnight />;
    case "mma":
      return <MmaGloves />;
    case "cricket":
      return <CricketBall />;
    case "hiphop":
      return <Headphones />;
    case "trekking":
      return <Mountains />;
    case "travel":
      return <Globe />;
    default:
      return null;
  }
}

/** A quieter, more artistic ring of objects: the human behind the code. */
export function BeyondObjects({ compact = false }: { compact?: boolean }) {
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ring.current) {
      ring.current.rotation.z = clock.elapsedTime * 0.02;
    }
  });

  return (
    <group scale={compact ? 0.62 : 1}>
      <Glow
        color="#1fd695"
        size={44}
        intensity={0.13}
        falloff={3}
        position={[0, 2, -158]}
      />
      <pointLight
        color="#2be39b"
        intensity={38}
        distance={42}
        position={[0, 3, -146]}
      />
      <pointLight
        color="#cfe8dd"
        intensity={16}
        distance={26}
        position={[-8, -2, -150]}
      />

      <mesh ref={ring} position={[0, 1.5, -156]}>
        <torusGeometry args={[12, 0.014, 6, 220]} />
        <meshBasicMaterial color="#2be39b" transparent opacity={0.14} toneMapped={false} />
      </mesh>

      {interests.map((interest, index) => {
        const angle = (index / interests.length) * Math.PI * 2 + 0.35;
        const position: [number, number, number] = [
          Math.sin(angle) * 10.4,
          0.4 + Math.sin(index * 1.4) * 1.4,
          -156 + Math.cos(angle) * 5.4,
        ];
        return (
          <group key={interest.id}>
            <Drift
              position={position}
              speed={0.45 + index * 0.06}
              tilt={index * 0.7}
              scale={0.82}
            >
              <InterestArt kind={interest.object} />
            </Drift>
            <Glow
              color="#2be39b"
              size={5}
              intensity={0.22}
              falloff={3}
              position={[position[0], position[1], position[2] + 0.4]}
            />
          </group>
        );
      })}

      <mesh position={[0, -2.7, -156]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[16, 64]} />
        <meshBasicMaterial color="#06110d" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}
