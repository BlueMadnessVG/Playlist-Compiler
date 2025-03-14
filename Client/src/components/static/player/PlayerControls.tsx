import { memo } from "react";
import { PrevIcon, PauseIcon, PlayIcon, NextIcon } from "../../../assets/icons";

interface PlayerControlsProps {
  onPlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  isPlaying: boolean;
}

export const PlayerControls = memo(
  ({ onPlay, onNext, onPrev, isPlaying }: PlayerControlsProps) => {

    return (
      <div className="flex gap-5 place-content-center">
        <button
          className="text-white hover:scale-110 transition duration-75"
          onClick={onPrev}
        >
          <PrevIcon />
        </button>
        <button
          className="bg-white rounded-full p-3 text-black hover:scale-110 transition duration-150"
          onClick={onPlay}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className="text-white hover:scale-110 transition duration-75"
          onClick={onNext}
        >
          <NextIcon />
        </button>
      </div>
    );
  }
);
