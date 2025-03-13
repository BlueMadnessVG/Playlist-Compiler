import { PlaylistModel } from "../../models";
import CarouselMotion from "../../utils/Motion/carouselMotion.utility";
import PlaylistCart from "./playlistCart";

interface PlaylistSectionProps {
  playlists: PlaylistModel[];
}

export function PlaylistSection({ playlists }: PlaylistSectionProps) {
  return (
    <div className="mt-4 bg-zinc-950/40 drop-shadow-xl shadow-inner shadow-zinc-900/90">
      <div className="pt-4 pl-4">
        <h2 className="text-xl"> Playlists </h2>
      </div>
      <div className="px-2">
        <CarouselMotion items_length={playlists.length}>
          {playlists.map((playlist, index) => (
            <PlaylistCart key={index} playlist={playlist} />
          ))}
        </CarouselMotion>
      </div>
    </div>
  );
}
