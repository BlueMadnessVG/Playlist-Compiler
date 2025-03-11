import YouTubePlayer from "react-player/youtube";
import { MusicSlider } from "./MusicSlider";
import { memo } from "react";

interface PlayerContentProps {
  audioRef: string;
  isPlaying: boolean;
  volume: number;
  onProgress: (state: any) => void;
  onDuration: (state: number) => void;
  onEnded: () => void;
  playedTime: number;
  maxTime: number;
  onSeek: (value: number) => void;
}

export const PlayerContent = memo(
  ({
    audioRef,
    isPlaying,
    volume,
    onProgress,
    onDuration,
    onEnded,
    playedTime,
    maxTime,
    onSeek,
  }: PlayerContentProps) => {
    console.log("im re rendering");

    return (
      <>
        <YouTubePlayer
          url={`https://www.youtube.com/watch?v=${audioRef}`}
          width={"100%"}
          height={"16vw"}
          playing={isPlaying}
          controls={false}
          onEnded={onEnded}
          volume={volume}
          onProgress={onProgress}
          onDuration={onDuration}
          style={{ cursor: "default" }}
        />
        <MusicSlider
          defaultValue={[0]}
          max={maxTime}
          min={0}
          step={0.1}
          className="w-full"
          value={[playedTime]}
          onValueChange={(value) => onSeek(value[0])}
        />
      </>
    );
  }
);
