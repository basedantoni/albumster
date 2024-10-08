"use client";

import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

const CameraHelper = () => {
  const camera = new THREE.PerspectiveCamera(60, 1, 1, 3);
  return (
    <group position={[0, 0, 8]}>
      <cameraHelper args={[camera]} />
    </group>
  );
};

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 8], zoom: 100 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <OrbitControls />

      {children}
    </Canvas>
  );
}
