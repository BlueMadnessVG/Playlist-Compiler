import React, { useRef, useState } from "react";
import { Slider } from "./Slider";
import { usePlayerStore } from "../../../global/music.store";
import VolumeNoneIcon from "../../../assets/icons/volume_None";
import Volume1Icon from "../../../assets/icons/volume_1";
import Volume2Icon from "../../../assets/icons/volume_2";
import Volume3Icon from "../../../assets/icons/volume_3";

function VolumeController() {
  const volume = usePlayerStore((state: any) => state.volume);
  const setVolume = usePlayerStore((state: any) => state.setVolume);
  const previousVolumeRef = useRef(volume);

  const isVolumeSilences = volume == 0;

  const handleClickVolume = () => {
    if (isVolumeSilences) {
      setVolume(previousVolumeRef.current);
    } else {
      previousVolumeRef.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className="flex justify-center gap-x-2 text-white">
      <button onClick={handleClickVolume}>
        {isVolumeSilences ? (
          <VolumeNoneIcon />
        ) : volume < 0.3 ? (
          <Volume1Icon />
        ) : volume < 0.7 ? (
          <Volume2Icon />
        ) : (
          <Volume3Icon />
        )}
      </button>

      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        step={1}
        className="w-[95px]"
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeVal = newVolume / 100;
          setVolume(volumeVal);
        }}
      />
    </div>
  );
}

export default VolumeController;
