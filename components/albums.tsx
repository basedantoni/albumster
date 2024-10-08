"use client";

import * as THREE from "three";
import gsap from "gsap";
import Box from "@/components/box";
import { nanoid } from "nanoid";
import { getTopAlbums } from "@/lib/lastfm";
import { Album } from "@/types";
import { Scroll, ScrollControls, useScroll, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Albums() {
  const groupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    let tl = gsap.timeline();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["topAlbums"],
    queryFn: () => getTopAlbums("basedantoni", "overall", 3, 1),
  });

  if (isLoading) return null;

  const {
    topalbums: { album },
  } = data;

  return (
    <ScrollControls horizontal pages={album.length} damping={0.1}>
      <Text position={[0, 0, -1]}>Albums</Text>
      <group dispose={null} ref={groupRef}>
        <Scroll>
          {album.map((album: Album, index: number) => {
            // Get the largest available image (last in the array)
            const imageUrl = album.image.reduce((acc, img) => {
              return (img && img["#text"]) || acc;
            }, "");

            // Calculate position offset for each box
            const offset = 1.1; // Adjust this value to control spacing
            const position = new THREE.Vector3(
              index * offset,
              index * offset,
              0
            );

            return (
              <Box
                scale={4}
                rotation={[0.2, -Math.PI / 5, 0]}
                key={nanoid()}
                imageUrl={imageUrl}
                position={position} // Ensure position is a tuple of three numbers
              />
            );
          })}
        </Scroll>
      </group>
    </ScrollControls>
  );
}
