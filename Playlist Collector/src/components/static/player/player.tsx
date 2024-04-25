import React, { useEffect, useRef, useState } from "react";
import PlayIcon from "../../../assets/icons/play";
import PauseIcon from "../../../assets/icons/pause";

import song from "../../../assets/music/song_1.mp3";

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    audioRef.current.src = song;
  }, []);

  const handleClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        audioRef.current.volume = 0.1;
      }
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div className="grid place-content-center gap-4 ">
        <div className="flex justify-between">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {!isPlaying ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>
      </div>
      <div>current song.......</div>
      <div className="grid place-content-center">volume</div>
    </div>
  );
}

export default Player;
