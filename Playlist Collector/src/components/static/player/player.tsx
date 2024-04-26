import React, { useEffect, useRef, useState } from "react";
import PlayIcon from "../../../assets/icons/play";
import PauseIcon from "../../../assets/icons/pause";

import song from "../../../assets/music/song_1.mp3";
import { usePlayerStore } from "../../../global/musicStore";
import { Slider } from "./Slider";
import VolumeController from "./Volume";

function Player() {
  const { currentMusic, isPlaying, setIsPlaying, volume } = usePlayerStore(
    (state: any) => state
  );
  const audioRef = useRef(new Audio());

  useEffect(() => {
    audioRef.current.src = song;
    audioRef.current.volume = volume;
    audioRef.current.play();
  }, [currentMusic]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const handleClick = () => {
    if (currentMusic?.playList) setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50 py-3">
      <div className="grid place-content-center gap-4 ">
        <div className="flex justify-between">
          <button
            className="bg-white rounded-full p-2 text-black"
            onClick={handleClick}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
      <div>current song.......</div>
      <div className="grid place-content-center">
        <VolumeController />
      </div>
    </div>
  );
}

export default Player;
