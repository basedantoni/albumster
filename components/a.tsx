"use client";

import { Album } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import Image from "next/image";

const getTopAlbums = async () => {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=basedantoni&api_key=346fc4f9e9d3a87499ace876fd691447&format=json`
  );
  return response.json();
};

export default function A() {
  const { data, isLoading } = useQuery({
    queryKey: ["topAlbums"],
    queryFn: getTopAlbums,
  });

  if (isLoading) return null;

  const {
    topalbums: { album },
  } = data;

  return (
    <>
      {album.map((album: Album) => {
        return (
          <Image
            key={`${album.mbid}-${nanoid()}`}
            src={album.image[3]["#text"]}
            alt={album.name}
            width={100}
            height={100}
          />
        );
      })}
    </>
  );
}
