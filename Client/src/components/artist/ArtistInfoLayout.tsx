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

      <header
        className="flex flex-col top-0 px-4 pt-6 pb-6 justify-between h-96"
        style={{
          backgroundImage: `${artistInfo.thumbnails.high}`,
        }}
      >
        { children }

        <h1 className="z-10 text-7xl bg-gradient-to-r from-white from-10% via-indigo-600 via-90% to-violet-800 to-30% inline-block text-transparent bg-clip-text">
          {artistInfo.title.split("-")[0]}
        </h1>
      </header>
    </>
  );
}
