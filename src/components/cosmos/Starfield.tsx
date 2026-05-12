"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarLayerProps {
  count: number;
  radius: number;
  size: number;
  color: string;
  speed: number;
  seed: number;
}

/** Mulberry32 — deterministic, idempotent PRNG. Safe inside useMemo. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function StarLayer({ count, radius, size, color, speed, seed }: StarLayerProps) {
  const ref = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const rand = mulberry32(seed);
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = radius * (0.6 + rand() * 0.4);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      const idx = i * 3;
      pos[idx] = x;
      pos[idx + 1] = y;
      pos[idx + 2] = z;
      sz[i] = size * (0.4 + rand() * 1.6);
    }
    return { positions: pos, sizes: sz };
  }, [count, radius, size, seed]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x += delta * speed * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NebulaBlob({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[scale, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

interface StarfieldProps {
  className?: string;
  intensity?: "ambient" | "dense";
}

export function Starfield({ className, intensity = "ambient" }: StarfieldProps) {
  const dense = intensity === "dense";
  return (
    <div
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75, near: 0.01, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#03020a"]} />
        <fog attach="fog" args={["#03020a", 5, 40]} />

        <StarLayer
          count={dense ? 1200 : 700}
          radius={8}
          size={0.025}
          color="#ffffff"
          speed={0.005}
          seed={0x9e3779b1}
        />
        <StarLayer
          count={dense ? 800 : 400}
          radius={15}
          size={0.04}
          color="#a8c8ff"
          speed={0.003}
          seed={0x85ebca6b}
        />
        <StarLayer
          count={dense ? 400 : 200}
          radius={25}
          size={0.08}
          color="#ffd9c0"
          speed={0.0015}
          seed={0xc2b2ae35}
        />

        <NebulaBlob position={[6, 3, -8]} color="#8b5cff" scale={5} />
        <NebulaBlob position={[-7, -2, -10]} color="#6dd5ff" scale={6} />
        <NebulaBlob position={[2, -5, -6]} color="#ff5edb" scale={4} />
      </Canvas>
    </div>
  );
}
