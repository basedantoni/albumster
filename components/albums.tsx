"use client";

import * as THREE from "three";
import Box from "@/components/box";
import { nanoid } from "nanoid";
import { getTopAlbums } from "@/lib/lastfm";
import { Album } from "@/types";
import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Albums({ 
  setAlbumCount, 
  setVisibleRows, 
  cameraPosition 
}: { 
  setAlbumCount: (count: number) => void,
  setVisibleRows: (rows: number) => void,
  cameraPosition: THREE.Vector3
}) {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const { data, isLoading } = useQuery({
    queryKey: ["topAlbums"],
    queryFn: () => getTopAlbums("basedantoni", "overall", 20, 1),
  });

  const offset = 1.1; // Spacing between boxes

  const { visibleRows, scrollFactorX, scrollFactorY, scrollFactorZ } = useMemo(() => {
    if (data?.topalbums?.album) {
      const albumCount = data.topalbums.album.length;
      const rows = Math.ceil(Math.sqrt(albumCount));
      
      // Calculate base scroll factor
      const baseScrollFactor = albumCount * (15 / 7);
      
      // Adjust scroll factors based on camera position
      const { x: cameraX, y: cameraY, z: cameraZ } = cameraPosition;
      const cameraRatio = Math.sqrt(cameraX * cameraX + cameraZ * cameraZ) / cameraY;
      
      return { 
        visibleRows: rows, 
        scrollFactorX: baseScrollFactor * 0.1, // Significantly reduced horizontal movement
        scrollFactorY: baseScrollFactor / Math.sqrt(cameraRatio),
        scrollFactorZ: baseScrollFactor * Math.pow(cameraRatio, 0.1)
      };
    }
    return { visibleRows: 0, scrollFactorX: 1.5, scrollFactorY: 15, scrollFactorZ: 15 };
  }, [data, cameraPosition]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x = -scroll.offset * scrollFactorX;
    groupRef.current.position.y = -scroll.offset * scrollFactorY;
    groupRef.current.position.z = scroll.offset * scrollFactorZ;
  });

  useEffect(() => {
    if (data?.topalbums?.album) {
      setAlbumCount(data.topalbums.album.length);
      setVisibleRows(visibleRows);
    }
  }, [data, setAlbumCount, setVisibleRows, visibleRows]);

  if (isLoading) return null;

  const { topalbums: { album } } = data;

  return (
    <Scroll>
      <group dispose={null} ref={groupRef}>
        {album.map((album: Album, index: number) => {
          const imageUrl = album.image.reduce((acc, img) => {
            return (img && img["#text"]) || acc;
          }, "");

          const position = new THREE.Vector3(
            index * offset,
            index * offset,
            -index * offset
          );

          return (
            <Box
              scale={4}
              key={nanoid()}
              imageUrl={imageUrl}
              position={position}
            />
          );
        })}
      </group>
    </Scroll>
  );
}
