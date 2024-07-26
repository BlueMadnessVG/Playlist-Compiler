import { MusicModel } from "../../models";
import { useArtistStore } from "../../global";
import ReproduceButton from "../../utils/Page utils/reproduceButton.utility";

function SongCart({ song, index }: { song: MusicModel; index: number }) {
  const { artistSongs } = useArtistStore((state: any) => state);

  const date = new Date(song?.published_at);
  const year = date.getUTCFullYear();

  return (
    <div className="group relative">
      <div className="flex flex-col hover:bg-zinc-800/80 p-2 rounded-md w-full">
        <picture className="aspect-square w-full h-[40%] flex-none relative">
          <ReproduceButton
            playlist={{ id: 0 }}
            song={index.toString()}
            songs={artistSongs}
          />
          <img
            src={song?.thumbnails.high}
            alt={`Song from ${song?.artist.title}`}
            className=" object-none w-full h-full shadow-lg rounded-md "
          />
        </picture>

        <div className="flex flex-auto flex-col pt-2 pl-1 gap-2">
          <h4 className="truncate"> {song?.title} </h4>
          <span className="text-xs text-gray-500"> {year} </span>
        </div>
      </div>
    </div>
  );
}

export default SongCart;
