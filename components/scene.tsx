"use client";

import * as THREE from "three";
import { ScrollControls } from '@react-three/drei';
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { useState } from "react";
import Albums from './albums';

export default function Scene() {
  const [albumCount, setAlbumCount] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);
  
  const pagesCount = Math.ceil(albumCount / (visibleRows * visibleRows));
  const cameraPosition = new THREE.Vector3(500, 150, 600);

  return (
    <>
      <Canvas
        orthographic
        camera={{ position: cameraPosition, zoom: 120 }}
        style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}
      >
        <ambientLight intensity={2.8} />

        <ScrollControls infinite pages={pagesCount > 0 ? pagesCount : 1} damping={0.1}>
          <Albums 
            setAlbumCount={setAlbumCount} 
            setVisibleRows={setVisibleRows} 
            cameraPosition={cameraPosition}
          />
        </ScrollControls>
      </Canvas>
      <Leva collapsed />
    </>
  );
}
