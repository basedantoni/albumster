"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { ThreeElements } from "@react-three/fiber";
import {
  Decal,
  useScroll,
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

  const zOffset = 0.03;

  const scroll = useScroll();

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true, label: "Backside" },
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={() => setActive(!active)}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      <boxGeometry args={[1, 1, zOffset]} />
      <MeshTransmissionMaterial {...materialProps} />
      {/* <Decal
        position={[0, 0, zOffset]}
        rotation={[0, 0, 0]}
        scale={[0.9, 0.9, 0.9]}
        polygonOffsetFactor={10}
      >
        <meshPhysicalMaterial
          map={texture}
          roughness={0.05}
          transmission={1}
          reflectivity={0.1}
          opacity={0.75}
          transparent
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </Decal> */}
    </mesh>
  );
};

export default Box;
