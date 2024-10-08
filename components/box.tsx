"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { ThreeElements } from "@react-three/fiber";
import {
  useTexture,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { useControls } from "leva";

const Box = ({
  imageUrl,
  ...props
}: ThreeElements["mesh"] & { imageUrl: string }) => {
  const texture = useTexture(imageUrl);

  const meshRef = useRef<THREE.Mesh>(null);

  const [active, setActive] = useState(false);

  const zOffset = 0.02;

  const materialProps = useControls({
    thickness: { value: 0.05, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },
    transmission: { value: 0.4, min: 0, max: 1, step: 0.1 },
    ior: { value: 0.9, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.16, min: 0, max: 1 },
    backside: { value: false, label: "Backside" },
  });

  const handlePointerEnter = () => {
    if (!meshRef.current) return;

    meshRef.current.position.x += 1
  };

  const handlePointerOut = () => {
    if (!meshRef.current) return;

    meshRef.current.position.x -= 1
  };

  return (
      <mesh
        {...props}
        ref={meshRef}
        onClick={() => setActive(!active)}
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[1, 1, zOffset]} />
        <MeshTransmissionMaterial map={texture} {...materialProps} />
      </mesh>
  );
};

export default Box;
