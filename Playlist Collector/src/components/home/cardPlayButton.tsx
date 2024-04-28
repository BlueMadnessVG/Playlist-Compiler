import React from "react";
import PlayIcon from "../../assets/icons/play";

import { usePlayerStore } from "../../global/musicStore";
import PauseIcon from "../../assets/icons/pause";

function CardPlayButton({ id }: { id: string }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state: any) => state);

  let isPlayingPlaylist = isPlaying && currentMusic?.playList.id == id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    setCurrentMusic({
      playList: { id },
    });
  };

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full  p-2 text-white hover:scale-110 transition  bg-violet-800 hover:bg-violet-500"
    >
      {isPlayingPlaylist ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}

export default CardPlayButton;
