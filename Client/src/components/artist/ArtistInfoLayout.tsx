import { ReactNode } from "react";
import { ArtistInfoModel } from "../../models";

interface ArtistInfoLayoutProps {
  artistInfo: ArtistInfoModel;
  children: ReactNode;
}

export function ArtistInfoLayout({ artistInfo, children }: ArtistInfoLayoutProps) {
  return (
    <>
      <div className="flex">
        <picture className="aspect-square w-full h-96 flex-none absolute inset-0">
          <img
            src={artistInfo.thumbnails.high}
            alt={`Playlist from ${artistInfo.title}`}
            className=" object-cover w-full h-full  shadow-lg"
          />
        </picture>
        <div className="absolute w-full h-96 bg-gradient-to-t from-zinc-900 from-[5%]"></div>
      </div>
      { children }

    </>
  );
}
