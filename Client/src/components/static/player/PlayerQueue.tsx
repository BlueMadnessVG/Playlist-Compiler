import { Reorder } from "framer-motion";
import { PlayerItem } from ".";
import { memo } from "react";

interface PlayerQueueProps {
  songs: any[];
  onReorder: (songs: any[]) => void;
}

export const PlayerQueue = memo(({ songs, onReorder }: PlayerQueueProps) => {
  console.log("im re rendering");

  return (
    <div className="flex flex-col py-2 w-full bg-zinc-900">
      <h1 className="text-lg font-medium uppercase pl-4 border-b border-zinc-600">
        Playlist queue
      </h1>
      <Reorder.Group
        axis="y"
        values={songs}
        onReorder={onReorder}
        style={{ overflowY: "auto" }}
        className="h-[34rem]"
      >
        {songs.map((music, index) => (
          <PlayerItem
            key={music.music_id}
            music={music}
            type="youtube"
            index={index.toString()}
          />
        ))}
      </Reorder.Group>
    </div>
  );
});
