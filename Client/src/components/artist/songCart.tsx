import { MusicModel } from "../../models";
import { useArtistStore, useSearchStore } from "../../global";
import ReproduceButton from "../../utils/Page utils/reproduceButton.utility";
import { useAnimate } from "framer-motion";
import MusicMotion, {
  BOTTOM_RIGHT_CLIP,
} from "../../utils/Motion/MusicMotion.utility";

function SongCart({
  song,
  type,
  index,
}: {
  song: MusicModel;
  type: string;
  index: number;
}) {
  const [scope, animate] = useAnimate();
  const { artistSongs } = useArtistStore((state: any) => state);
  const { musicSearch } = useSearchStore((state: any) => state);

  const date = new Date(song?.published_at);
  const year = date.getUTCFullYear();

  return (
    <MusicMotion scope={scope} animate={animate}>
      <div className="flex flex-col p-2 rounded-md w-56">
        <picture className="aspect-square w-52 h-52 flex-none relative">
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

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute w-52 h-52 left-2 top-2 grid place-content-center text-white border-md z-10 rounded-lg"
      >
        <ReproduceButton
          playlist={{ id: 0 }}
          song={index.toString()}
          song_id={song.music_id}
          songs={type === "artist" ? artistSongs : musicSearch}
        />
      </div>
    </MusicMotion>
  );
}

export default SongCart;
