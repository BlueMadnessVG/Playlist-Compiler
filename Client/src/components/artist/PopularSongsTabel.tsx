import { MusicModel } from "../../models";
import PopularSong from "./popularSong";

interface PopularSongsTableProps {
  songs: MusicModel[];
}

export function PopularSongsTable({ songs }: PopularSongsTableProps) {
  return (
    <>
      <h2 className="text-xl px-4"> Popular Songs </h2>
      <table className="table-auto text-left min-w-full divide-y-2 divide-gray-500/50 ">
        <tbody>
          {songs.slice(0, 5).map((song, index) => (
            <PopularSong key={index} song={song} index={index} />
          ))}
        </tbody>
      </table>
    </>
  );
}
