import { MusicModel } from "../../models";
import SongCart from "./songCart";

interface PublicationsSectionsProps {
  songs: MusicModel[];
  hasMore: boolean;
}

export function PublicationsSections({
  songs,
  hasMore,
}: PublicationsSectionsProps) {
  return (
    <div className="pt-10">
      <div className="flex justify-between pt-4 pl-4">
        <h2 className="text-xl">Publications</h2>
      </div>
      <div className="gap-[10px] p-2 flex flex-wrap">
        {songs.map((song, index) => (
          <SongCart key={index} song={song} type="artist" index={index} />
        ))}
      </div>
      <div className="flex flex-col">{hasMore && <div> Load more </div>}</div>
    </div>
  );
}
