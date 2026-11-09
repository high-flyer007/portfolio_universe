import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { RefObject } from "react";
import type { ScrollState } from "@/hooks/useScrollScene";
import type { DeviceQuality } from "@/hooks/useDeviceQuality";
import { CameraRig } from "./CameraRig";
import { ParticleField } from "./Particles";
import { Portal } from "./Portal";
import { Glow, LightShaft } from "./Glow";
import { ProjectMonoliths } from "./ProjectMonoliths";
import { EngineeringCore } from "./EngineeringCore";
import { JourneyPath } from "./JourneyPath";
import { BeyondObjects } from "./BeyondObjects";

const BOX = new THREE.BoxGeometry(1, 1, 1);
const EDGES = new THREE.EdgesGeometry(BOX);

function OriginInstallation() {
  const archive = useRef<THREE.Group>(null);
  const panels = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const angle = (i - 3) * 0.26;
        return {
          position: [
            Math.sin(angle) * 9.4,
            0.4 + (i % 2) * 0.7,
            -34.5 + Math.cos(angle) * 2.4,
          ] as [number, number, number],
          rotation: [0, -angle, 0] as [number, number, number],
          height: 4.4 + (i % 3) * 1.1,
        };
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (archive.current) {
      archive.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.05;
    }
  });

  return (
    <group position={[0, 0, -31]} ref={archive}>
      <Glow
        color="#1fd695"
        size={27}
        intensity={0.2}
        falloff={2.8}
        position={[0, 1, -3]}
      />
      <LightShaft
        color="#2be39b"
        height={22}
        radius={3.4}
        opacity={0.03}
        position={[1, 2, -2]}
      />
      <pointLight
        color="#2be39b"
        intensity={22}
        distance={26}
        position={[0, 2, 1]}
      />
      <pointLight
        color="#cfeee2"
        intensity={8}
        distance={18}
        position={[-5, -1, 3]}
      />

      {panels.map((panel, index) => (
        <group
          key={index}
          position={panel.position}
          rotation={panel.rotation}
        >
          <mesh geometry={BOX} scale={[1.5, panel.height, 0.14]}>
            <meshStandardMaterial
              color="#0b1512"
              metalness={0.9}
              roughness={0.36}
              emissive="#0b3325"
              emissiveIntensity={0.3}
            />
          </mesh>
          <lineSegments
            geometry={EDGES}
            scale={[1.5, panel.height, 0.14]}
          >
            <lineBasicMaterial
              color="#3f9c7d"
              transparent
              opacity={index === 3 ? 0.65 : 0.24}
              toneMapped={false}
            />
          </lineSegments>
          <mesh position={[0, panel.height / 2 - 0.5, 0.08]}>
            <boxGeometry args={[0.9, 0.015, 0.01]} />
            <meshBasicMaterial
              color="#2be39b"
              transparent
              opacity={0.6}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0.2, 2.5]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.6, 0.014, 6, 160]} />
        <meshBasicMaterial
          color="#2be39b"
          transparent
          opacity={0.22}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.2, 2.5]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6.8, 0.008, 6, 160]} />
        <meshBasicMaterial
          color="#c9f5e4"
          transparent
          opacity={0.1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/** Far-off megastructures that make the universe feel larger than the page. */
function DistantArchitecture() {
  const structures = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        return {
          position: [
            side * (14 + (i % 5) * 5.5),
            -6 + (i % 4) * 2.4,
            -6 - i * 11.5,
          ] as [number, number, number],
          scale: [
            1.6 + (i % 3) * 0.8,
            9 + (i % 6) * 4.5,
            1.6 + (i % 4) * 0.5,
          ] as [number, number, number],
          rotation: [0, side * 0.18, 0] as [number, number, number],
        };
      }),
    [],
  );

  return (
    <group>
      {structures.map((structure, index) => (
        <group
          key={index}
          position={structure.position}
          rotation={structure.rotation}
        >
          <mesh geometry={BOX} scale={structure.scale}>
            <meshStandardMaterial
              color="#080f0c"
              metalness={0.7}
              roughness={0.62}
            />
          </mesh>
          <lineSegments geometry={EDGES} scale={structure.scale}>
            <lineBasicMaterial
              color="#1f5d48"
              transparent
              opacity={0.16}
              toneMapped={false}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

function ContactMonument({ reduced }: { reduced: boolean }) {
  const monument = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (monument.current) {
      monument.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.03;
    }
  });

  return (
    <group ref={monument} position={[0, 0, -183]}>
      <Portal
        position={[0, 0.4, 0]}
        scale={1.42}
        shards={false}
        aura={0.9}
        reduced={reduced}
        motes={reduced ? 40 : 110}
      />
      <LightShaft
        color="#2be39b"
        height={30}
        radius={7}
        opacity={0.04}
        position={[0, 3, -2]}
      />
      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * 9.5, -2.5, -3]}
          rotation={[0, side * 0.35, 0]}
        >
          <mesh geometry={BOX} scale={[1.1, 13, 1.1]}>
            <meshStandardMaterial
              color="#0a1310"
              metalness={0.9}
              roughness={0.34}
            />
          </mesh>
          <lineSegments geometry={EDGES} scale={[1.1, 13, 1.1]}>
            <lineBasicMaterial
              color="#2f8a6b"
              transparent
              opacity={0.3}
              toneMapped={false}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

export function Universe({
  scrollRef,
  activeScene,
  focusProject,
  activeCategory,
  quality,
}: {
  scrollRef: RefObject<ScrollState>;
  activeScene: number;
  focusProject: number;
  activeCategory: number;
  quality: DeviceQuality;
}) {
  const near = (index: number) => Math.abs(activeScene - index) <= 1;

  return (
    <Canvas
      dpr={[1, quality.dpr]}
      gl={{
        antialias: quality.antialias,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.55, 9.6], fov: 55, near: 0.1, far: 420 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        gl.setClearColor("#050706");
      }}
      performance={{ min: 0.45 }}
    >
      <color attach="background" args={["#050706"]} />
      <fogExp2 attach="fog" args={["#050706", 0.0125]} />

      <ambientLight intensity={0.2} color="#8fd9bf" />
      <hemisphereLight args={["#2be39b", "#040806", 0.22]} />
      <directionalLight
        position={[9, 16, 8]}
        intensity={0.65}
        color="#ddfff2"
      />
      <directionalLight
        position={[-12, 4, -10]}
        intensity={0.25}
        color="#2be39b"
      />

      <CameraRig scrollRef={scrollRef} reduced={quality.reduced} />
      <ParticleField count={quality.particles} reduced={quality.reduced} />
      <DistantArchitecture />

      {near(0) && (
        <Portal
          position={
            quality.mobile ? [2.1, 2.5, -1.6] : [4.35, 1.05, -1.6]
          }
          scale={quality.mobile ? 0.78 : 1.06}
          aura={1}
          reduced={quality.reduced}
          motes={quality.tier === "low" ? 90 : 170}
        />
      )}
      {near(1) && <OriginInstallation />}
      {near(2) && (
        <ProjectMonoliths focus={focusProject} compact={quality.mobile} />
      )}
      {near(3) && (
        <EngineeringCore
          category={activeCategory}
          reduced={quality.reduced}
          compact={quality.mobile}
        />
      )}
      {near(4) && <JourneyPath />}
      {near(5) && <BeyondObjects compact={quality.mobile} />}
      {near(6) && <ContactMonument reduced={quality.reduced} />}
    </Canvas>
  );
}
