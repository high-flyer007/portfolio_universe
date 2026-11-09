import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Glow } from "./Glow";

const horizonVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const horizonFragment = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uEnergy;

  float band(float r, float centre, float width) {
    return pow(max(0.0, 1.0 - abs(r - centre) / width), 3.0);
  }

  void main() {
    vec2 p = vUv - 0.5;
    float displacement = sin(p.y * 21.0 + uTime * 1.15) * 0.011
      + sin(p.x * 17.0 - uTime * 0.8) * 0.011;
    vec2 q = p + vec2(displacement, -displacement);
    float r = length(q) * 2.0;
    float angle = atan(q.y, q.x);

    float swirl = sin(angle * 5.0 + r * 13.0 - uTime * 0.7) * 0.5 + 0.5;
    float fine = sin(angle * 17.0 - r * 34.0 + uTime * 1.4) * 0.5 + 0.5;
    float filaments = pow(fine, 5.0);
    float core = pow(max(0.0, 1.0 - r), 3.2);
    float rim = band(r, 0.9, 0.065) * 0.95 + band(r, 0.68, 0.022) * 0.35;
    float wave = 0.5 + 0.5 * sin(r * 42.0 - uTime * 2.6);

    vec3 deep = vec3(0.002, 0.012, 0.009);
    vec3 emerald = vec3(0.17, 0.89, 0.58);
    vec3 pale = vec3(0.66, 1.0, 0.86);

    vec3 col = deep;
    col += emerald * (swirl * 0.4 + filaments * 0.55) * (0.22 + core);
    col += pale * rim;
    col += emerald * wave * 0.055 * smoothstep(0.98, 0.12, r);

    float edge = smoothstep(1.0, 0.9, r);
    float alpha = edge * (0.14 + core * 0.32 + swirl * 0.28 + rim * 0.7);
    gl_FragColor = vec4(col * uEnergy, alpha);
  }
`;

const TAU = Math.PI * 2;
const TICK_COUNT = 72;
const BLADE_COUNT = 16;
const SHARD_COUNT = 44;

type RingSpec = {
  radius: number;
  tube: number;
  arc: number;
  speed: number;
  phase: number;
  tilt: [number, number];
  color: string;
  opacity: number;
};

/** Independently animated arcs that give the gateway its machined depth. */
const RING_SPECS: RingSpec[] = [
  {
    radius: 3.4,
    tube: 0.02,
    arc: Math.PI * 0.72,
    speed: 0.1,
    phase: 0,
    tilt: [0.1, 0.16],
    color: "#7dffd6",
    opacity: 0.85,
  },
  {
    radius: 3.66,
    tube: 0.016,
    arc: Math.PI * 0.46,
    speed: -0.062,
    phase: 2.1,
    tilt: [-0.14, 0.1],
    color: "#2be39b",
    opacity: 0.55,
  },
  {
    radius: 4.14,
    tube: 0.012,
    arc: TAU,
    speed: 0.042,
    phase: 1.2,
    tilt: [0.28, 0.1],
    color: "#bfe8d8",
    opacity: 0.26,
  },
  {
    radius: 4.52,
    tube: 0.009,
    arc: Math.PI * 1.42,
    speed: -0.032,
    phase: 3.6,
    tilt: [0.36, -0.12],
    color: "#2be39b",
    opacity: 0.2,
  },
  {
    radius: 2.88,
    tube: 0.015,
    arc: Math.PI * 0.3,
    speed: 0.15,
    phase: 4.4,
    tilt: [0.05, -0.1],
    color: "#d9fff1",
    opacity: 0.7,
  },
];

type MoteState = {
  angle: number;
  radius: number;
  speed: number;
  z: number;
  offset: number;
};

/** Dust pulled out of the surrounding space and into the event horizon. */
function InfallMotes({
  count,
  reduced,
}: {
  count: number;
  reduced: boolean;
}) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(count * 3), 3),
    );
    return geo;
  }, [count]);

  const motes = useMemo<MoteState[]>(
    () =>
      Array.from({ length: count }, () => ({
        angle: Math.random() * TAU,
        radius: 0.9 + Math.random() * 4.4,
        speed: 0.14 + Math.random() * 0.26,
        z: (Math.random() - 0.5) * 1.6,
        offset: Math.random() * TAU,
      })),
    [count],
  );

  useLayoutEffect(() => {
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    motes.forEach((mote, index) => {
      attribute.setXYZ(
        index,
        Math.cos(mote.angle) * mote.radius,
        Math.sin(mote.angle) * mote.radius * 0.94,
        mote.z,
      );
    });
    attribute.needsUpdate = true;
  }, [geometry, motes]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (reduced) return;
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const step = Math.min(delta, 0.05);
    for (let i = 0; i < motes.length; i += 1) {
      const mote = motes[i];
      mote.radius -= mote.speed * step * (0.85 + mote.radius * 0.32);
      mote.angle += step * (0.28 + 0.9 / Math.max(0.8, mote.radius));
      if (mote.radius < 0.62) {
        mote.radius = 4.4 + Math.random() * 1.5;
        mote.angle = Math.random() * TAU;
        mote.z = (Math.random() - 0.5) * 1.6;
      }
      attribute.setXYZ(
        i,
        Math.cos(mote.angle) * mote.radius,
        Math.sin(mote.angle) * mote.radius * 0.94,
        mote.z + Math.sin(mote.angle * 2 + mote.offset) * 0.12,
      );
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        size={0.055}
        color="#8dffd6"
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

/** Custom metallic dimensional portal: the signature object of ALIVERSE. */
export function Portal({
  position = [0, 0, 0],
  scale = 1,
  shards = true,
  aura = 1,
  reduced = false,
  motes = 160,
}: {
  position?: [number, number, number];
  scale?: number;
  shards?: boolean;
  aura?: number;
  reduced?: boolean;
  motes?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const floatGroup = useRef<THREE.Group>(null);
  const iris = useRef<THREE.Group>(null);
  const shardField = useRef<THREE.Group>(null);
  const instanced = useRef<THREE.InstancedMesh>(null);
  const ticks = useRef<THREE.InstancedMesh>(null);
  const pulseRings = useRef<Array<THREE.Mesh | null>>([]);
  const ringRefs = useRef<Array<THREE.Group | null>>([]);
  const pointerRef = useRef({ x: 0, y: 0 });

  const uniforms = useMemo<Record<string, THREE.IUniform>>(
    () => ({ uTime: { value: 0 }, uEnergy: { value: aura } }),
    [aura],
  );

  const shardGeometry = useMemo(() => new THREE.TetrahedronGeometry(0.11), []);
  const shardMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8fa39b",
        metalness: 0.92,
        roughness: 0.34,
        emissive: new THREE.Color("#0a2c21"),
        emissiveIntensity: 0.8,
      }),
    [],
  );

  const machinedMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#7e8f88",
        metalness: 0.95,
        roughness: 0.27,
        emissive: new THREE.Color("#08251b"),
        emissiveIntensity: 0.55,
      }),
    [],
  );

  const darkMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#101b17",
        metalness: 0.92,
        roughness: 0.32,
        emissive: new THREE.Color("#0b3325"),
        emissiveIntensity: 0.4,
      }),
    [],
  );

  const bladeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#14211c",
        metalness: 0.9,
        roughness: 0.3,
        emissive: new THREE.Color("#0f4632"),
        emissiveIntensity: 0.55,
      }),
    [],
  );

  const tickGeometry = useMemo(
    () => new THREE.BoxGeometry(0.012, 0.13, 0.018),
    [],
  );
  const tickMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#63dcb0",
        transparent: true,
        opacity: 0.45,
        toneMapped: false,
      }),
    [],
  );

  useLayoutEffect(() => {
    const mesh = instanced.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < SHARD_COUNT; i += 1) {
      const angle = (i / SHARD_COUNT) * TAU + Math.random() * 0.4;
      const radius = 4.1 + Math.random() * 2.6;
      dummy.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4.4,
        Math.sin(angle) * radius * 0.55,
      );
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.scale.setScalar(0.45 + Math.random() * 1.5);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useLayoutEffect(() => {
    const mesh = ticks.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < TICK_COUNT; i += 1) {
      const angle = (i / TICK_COUNT) * TAU;
      dummy.position.set(Math.cos(angle) * 3.33, Math.sin(angle) * 3.33, 0.04);
      dummy.rotation.set(0, 0, angle - Math.PI / 2);
      dummy.scale.set(1, i % 6 === 0 ? 1.9 : 0.85, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduced]);

  useEffect(() => {
    return () => {
      shardGeometry.dispose();
      shardMaterial.dispose();
      machinedMaterial.dispose();
      darkMetalMaterial.dispose();
      bladeMaterial.dispose();
      tickGeometry.dispose();
      tickMaterial.dispose();
    };
  }, [
    shardGeometry,
    shardMaterial,
    machinedMaterial,
    darkMetalMaterial,
    bladeMaterial,
    tickGeometry,
    tickMaterial,
  ]);

  useFrame(({ clock }, delta) => {
    const time = clock.elapsedTime;
    uniforms.uTime.value = reduced ? 0 : time;

    if (group.current) {
      if (!reduced) {
        group.current.rotation.y = THREE.MathUtils.damp(
          group.current.rotation.y,
          pointerRef.current.x * 0.3 + Math.sin(time * 0.12) * 0.05,
          2.2,
          delta,
        );
        group.current.rotation.x = THREE.MathUtils.damp(
          group.current.rotation.x,
          -pointerRef.current.y * 0.15 + Math.cos(time * 0.1) * 0.025,
          2.2,
          delta,
        );
      } else {
        group.current.rotation.set(0.02, 0.04, 0);
      }
    }

    if (floatGroup.current) {
      floatGroup.current.position.y = reduced ? 0 : Math.sin(time * 0.42) * 0.17;
      floatGroup.current.position.x = reduced ? 0 : Math.cos(time * 0.31) * 0.06;
      floatGroup.current.rotation.z = reduced
        ? 0
        : Math.sin(time * 0.24) * 0.014;
    }

    RING_SPECS.forEach((spec, index) => {
      const ring = ringRefs.current[index];
      if (!ring) return;
      ring.rotation.z =
        spec.phase + (reduced ? 0 : time * spec.speed);
      ring.rotation.x =
        spec.tilt[0] + (reduced ? 0 : Math.sin(time * 0.35 + spec.phase) * 0.05);
      ring.rotation.y =
        spec.tilt[1] + (reduced ? 0 : Math.cos(time * 0.29 + spec.phase) * 0.05);
    });

    if (iris.current) {
      iris.current.rotation.z = reduced ? 0 : time * 0.03;
    }

    pulseRings.current.forEach((ring, index) => {
      if (!ring) return;
      const phase = reduced ? 0.2 + index * 0.22 : (time * 0.07 + index * 0.33) % 1;
      const ringScale = 0.82 + phase * 0.62;
      ring.scale.setScalar(ringScale);
    });

    if (shardField.current) {
      shardField.current.rotation.y = reduced ? 0 : -time * 0.045;
      shardField.current.rotation.x = reduced
        ? 0
        : Math.sin(time * 0.12) * 0.06;
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <Glow
        color="#1fd695"
        size={19}
        intensity={0.4 * aura}
        falloff={2.6}
        position={[0, 1.1, -2.6]}
      />
      <Glow
        color="#9affe0"
        size={7.5}
        intensity={0.35 * aura}
        falloff={3.4}
        position={[0, 0.4, -0.6]}
      />

      <pointLight
        color="#28e3a0"
        intensity={26 * aura}
        distance={24}
        position={[0, 1.6, 3]}
      />
      <pointLight
        color="#d7fff0"
        intensity={7 * aura}
        distance={12}
        position={[-3.4, -1.2, 4]}
      />
      <pointLight
        color="#2be39b"
        intensity={11 * aura}
        distance={16}
        position={[3.6, 2.4, -3.2]}
      />

      <group ref={floatGroup}>
        {/* event horizon */}
        <mesh position={[0, 0, -0.15]}>
          <planeGeometry args={[5.7, 5.7]} />
          <shaderMaterial
            uniforms={uniforms}
            vertexShader={horizonVertex}
            fragmentShader={horizonFragment}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* anamorphic energy streak */}
        <mesh position={[0, 0, -1.1]} renderOrder={-2}>
          <planeGeometry args={[11, 0.045]} />
          <meshBasicMaterial
            color="#2be39b"
            transparent
            opacity={0.16}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0, -1.12]} renderOrder={-2}>
          <planeGeometry args={[7.4, 0.14]} />
          <meshBasicMaterial
            color="#9affe0"
            transparent
            opacity={0.055}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        {/* outer machined collar */}
        <mesh material={machinedMaterial}>
          <torusGeometry args={[3.15, 0.17, 24, 192]} />
        </mesh>
        <mesh material={darkMetalMaterial} position={[0, 0, 0.2]}>
          <torusGeometry args={[2.98, 0.055, 12, 180]} />
        </mesh>
        <mesh material={darkMetalMaterial} position={[0, 0, -0.42]}>
          <torusGeometry args={[3.42, 0.045, 10, 180]} />
        </mesh>
        <mesh position={[0, 0, -0.35]}>
          <ringGeometry args={[2.72, 3.16, 160]} />
          <meshStandardMaterial
            color="#07100c"
            metalness={0.95}
            roughness={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* emissive containment lip */}
        <mesh position={[0, 0, 0.34]}>
          <torusGeometry args={[2.52, 0.026, 10, 180]} />
          <meshBasicMaterial color="#8dffd6" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.3]}>
          <torusGeometry args={[2.34, 0.008, 6, 160]} />
          <meshBasicMaterial
            color="#2be39b"
            transparent
            opacity={0.5}
            toneMapped={false}
          />
        </mesh>

        {/* aperture iris */}
        <group ref={iris}>
          {Array.from({ length: BLADE_COUNT }, (_, index) => {
            const angle = (index / BLADE_COUNT) * TAU;
            return (
              <mesh
                key={index}
                material={bladeMaterial}
                position={[
                  Math.cos(angle) * 2.4,
                  Math.sin(angle) * 2.4,
                  0.22,
                ]}
                rotation={[0, 0, angle + 0.58]}
              >
                <boxGeometry args={[0.74, 0.042, 0.03]} />
              </mesh>
            );
          })}
        </group>

        {/* machined ticks */}
        <instancedMesh
          ref={ticks}
          args={[tickGeometry, tickMaterial, TICK_COUNT]}
        />

        {/* independently animated arcs */}
        {RING_SPECS.map((spec, index) => (
          <group
            key={index}
            ref={(node) => {
              ringRefs.current[index] = node;
            }}
          >
            <mesh>
              <torusGeometry
                args={[spec.radius, spec.tube, 8, 168, spec.arc]}
              />
              <meshBasicMaterial
                color={spec.color}
                transparent
                opacity={spec.opacity}
                toneMapped={false}
              />
            </mesh>
            <mesh position={[spec.radius, 0, 0]}>
              <sphereGeometry args={[0.028, 8, 8]} />
              <meshBasicMaterial color="#eafff7" toneMapped={false} />
            </mesh>
          </group>
        ))}

        {/* expanding distortion rings */}
        {[0, 1, 2].map((index) => (
          <mesh
            key={index}
            ref={(node) => {
              pulseRings.current[index] = node;
            }}
            position={[0, 0, 0.05]}
          >
            <torusGeometry args={[2.42, 0.006, 4, 140]} />
            <meshBasicMaterial
              color="#7dffd6"
              transparent
              opacity={0.22 - index * 0.06}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* dust falling toward the centre */}
        <InfallMotes count={motes} reduced={reduced} />

        {/* shards orbiting the portal */}
        {shards && (
          <group ref={shardField}>
            <instancedMesh
              ref={instanced}
              args={[shardGeometry, shardMaterial, SHARD_COUNT]}
            />
          </group>
        )}

        {/* base rings */}
        <group position={[0, -3.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[3.4, 0.02, 6, 160]} />
            <meshBasicMaterial
              color="#2be39b"
              transparent
              opacity={0.4}
              toneMapped={false}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[4.6, 0.012, 6, 160]} />
            <meshBasicMaterial
              color="#9fe8cd"
              transparent
              opacity={0.16}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
