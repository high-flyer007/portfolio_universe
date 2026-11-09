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

  void main() {
    vec2 p = vUv - 0.5;
    float r = length(p) * 2.0;
    float angle = atan(p.y, p.x);
    float swirl = sin(angle * 5.0 + r * 13.0 - uTime * 0.7) * 0.5 + 0.5;
    float fine = sin(angle * 11.0 - r * 30.0 + uTime * 1.1) * 0.5 + 0.5;
    float rim = pow(max(0.0, 1.0 - abs(r - 0.88) * 7.0), 3.0);

    vec3 deep = vec3(0.003, 0.016, 0.012);
    vec3 emerald = vec3(0.17, 0.89, 0.58);
    vec3 col = mix(deep, emerald, swirl * 0.34 + fine * 0.08);
    col += vec3(0.35, 0.98, 0.72) * rim * 0.9;

    float edge = smoothstep(1.0, 0.94, r);
    float alpha = edge * (0.22 + swirl * 0.4 + rim * 0.55);
    gl_FragColor = vec4(col, alpha);
  }
`;

const SHARD_COUNT = 44;

/** Custom metallic dimensional portal: the signature object of ALIVERSE. */
export function Portal({
  position = [0, 0, 0],
  scale = 1,
  shards = true,
  aura = 1,
}: {
  position?: [number, number, number];
  scale?: number;
  shards?: boolean;
  aura?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const shardField = useRef<THREE.Group>(null);
  const instanced = useRef<THREE.InstancedMesh>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const uniforms = useMemo<Record<string, THREE.IUniform>>(
    () => ({ uTime: { value: 0 } }),
    [],
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

  useLayoutEffect(() => {
    const mesh = instanced.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < SHARD_COUNT; i += 1) {
      const angle = (i / SHARD_COUNT) * Math.PI * 2 + Math.random() * 0.4;
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

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame(({ clock }, delta) => {
    uniforms.uTime.value = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        pointerRef.current.x * 0.28,
        2.2,
        delta,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -pointerRef.current.y * 0.14,
        2.2,
        delta,
      );
    }
    if (rings.current) {
      rings.current.rotation.z = clock.elapsedTime * 0.075;
    }
    if (shardField.current) {
      shardField.current.rotation.y = -clock.elapsedTime * 0.045;
      shardField.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.06;
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

      {/* event horizon */}
      <mesh>
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

      {/* outer machined ring */}
      <mesh>
        <torusGeometry args={[3.15, 0.17, 24, 180]} />
        <meshStandardMaterial color="#7e8f88" metalness={0.95} roughness={0.27} />
      </mesh>

      {/* inner containment ring */}
      <mesh>
        <torusGeometry args={[2.55, 0.035, 10, 160]} />
        <meshBasicMaterial color="#8dffd6" toneMapped={false} />
      </mesh>

      {/* segmented arcs */}
      <group ref={rings}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[3.62, 0.018, 6, 120, Math.PI * 0.55]} />
          <meshBasicMaterial color="#2be39b" transparent opacity={0.8} toneMapped={false} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[3.62, 0.018, 6, 120, Math.PI * 0.32]} />
          <meshBasicMaterial color="#2be39b" transparent opacity={0.45} toneMapped={false} />
        </mesh>
        <mesh rotation={[0.5, 0.2, 0]}>
          <torusGeometry args={[4.15, 0.012, 6, 160]} />
          <meshBasicMaterial color="#bfe8d8" transparent opacity={0.28} toneMapped={false} />
        </mesh>
        <mesh rotation={[-0.65, 0.35, 0]}>
          <torusGeometry args={[4.5, 0.01, 6, 160]} />
          <meshBasicMaterial color="#2be39b" transparent opacity={0.22} toneMapped={false} />
        </mesh>
      </group>

      {/* radial fins */}
      {[0, 1, 2, 3, 4, 5].map((fin) => {
        const angle = (fin / 6) * Math.PI * 2;
        return (
          <mesh
            key={fin}
            position={[Math.cos(angle) * 3.45, Math.sin(angle) * 3.45, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.34, 0.06, 0.5]} />
            <meshStandardMaterial
              color="#6f8079"
              metalness={0.95}
              roughness={0.35}
            />
          </mesh>
        );
      })}

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
          <meshBasicMaterial color="#2be39b" transparent opacity={0.4} toneMapped={false} />
        </mesh>
        <mesh>
          <torusGeometry args={[4.6, 0.012, 6, 160]} />
          <meshBasicMaterial color="#9fe8cd" transparent opacity={0.16} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
