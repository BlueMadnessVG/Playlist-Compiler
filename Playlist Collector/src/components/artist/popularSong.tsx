import { useArtistStore } from "../../global";
import { MusicModel } from "../../models";
import ReproduceButton from "../../utils/Page utils/reproduceButton.utility";

function PopularSong({ song, index }: { song: MusicModel; index: number }) {
  const { artistSongs } = useArtistStore((state: any) => state);

  const date = new Date(song?.published_at);

  const day = date.getUTCDate().toString().padStart(2);
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  return (
    <tr className="text-gray-300 text-sm font-light border-b border-gray-500/20 group cursor-default grid grid-cols-5 items-center hover:bg-zinc-800">
      <td className="px-3 py-2 flex gap-3 items-center relative col-span-3">
        <h3 className="font-extralight text-md px-1"> {index + 1} </h3>
        <picture className="aspect-square w-16 h-16 relative">
          <ReproduceButton
            playlist={{ id: 0 }}
            song={index.toString()}
            song_id={song.music_id}
            songs={artistSongs}
          />
          <img
            src={song?.thumbnails.medium}
            alt={`Playlist from ${song?.title}`}
            className=" object-cover w-full h-full rounded-md "
          />
        </picture>
        <h3 className=" max-w-96 truncate text-md">{song?.title}</h3>
      </td>
      <td className="px-3 py-1 font-thin text-gray-300 max-w-72 truncate  justify-end">
        <h2 className="">{song?.artist.title.split("-")[0]}</h2>
      </td>
      <td className="px-3 py-1 font-thin text-gray-500 max-w-72 text-xs truncate  justify-self-end">
        <p className="">{`${day}/${month}/${year}`}</p>
      </td>
    </tr>
  );
}

export default PopularSong;
