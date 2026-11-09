import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const glowVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragment = /* glsl */ `
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uFalloff;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float a = pow(max(0.0, 1.0 - d), uFalloff) * uIntensity;
    gl_FragColor = vec4(uColor, a);
  }
`;

/** Soft additive light bloom, billboarded toward the camera. */
export function Glow({
  color = "#2be39b",
  size = 12,
  intensity = 0.4,
  falloff = 2.4,
  position = [0, 0, 0],
}: {
  color?: string;
  size?: number;
  intensity?: number;
  falloff?: number;
  position?: [number, number, number];
}) {
  const group = useRef<THREE.Group>(null);
  const uniforms = useMemo(() => {
    const values: Record<string, THREE.IUniform> = {
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: intensity },
      uFalloff: { value: falloff },
    };
    return values;
  }, [color, intensity, falloff]);

  useFrame(({ camera }) => {
    group.current?.lookAt(camera.position);
  });

  return (
    <group ref={group} position={position}>
      <mesh renderOrder={-1}>
        <planeGeometry args={[size, size]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/** A cheap volumetric-looking shaft of light. */
export function LightShaft({
  color = "#2be39b",
  height = 18,
  radius = 4,
  opacity = 0.05,
  position = [0, 0, 0],
}: {
  color?: string;
  height?: number;
  radius?: number;
  opacity?: number;
  position?: [number, number, number];
}) {
  return (
    <mesh position={position}>
      <coneGeometry args={[radius, height, 32, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
