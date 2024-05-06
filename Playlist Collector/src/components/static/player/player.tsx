import { useEffect, useRef, useState } from "react";
import PlayIcon from "../../../assets/icons/play";
import PauseIcon from "../../../assets/icons/pause";

import { usePlayerStore } from "../../../global/musicStore";
import VolumeController from "./Volume";
import YouTubePlayer from "react-player/youtube";
import { fetchYoutubePlaylistsItems } from "../../../services/YoutubeService";
import NextIcon from "../../../assets/icons/next";
import PrevIcon from "../../../assets/icons/prev";
import { MusicSlider } from "./MusicSlider";

function Player() {
  const { currentMusic, isPlaying, setIsPlaying, volume } = usePlayerStore(
    (state: any) => state
  );
  const audioRef = useRef<string>("");
  const playerRef = useRef<any>(null);
  const [time, setTime] = useState({
    played: 0,
    MaxTime: 0,
  });

  useEffect(() => {
    const getYoutubePlaylistItems = async () => {
      try {
        const result = await fetchYoutubePlaylistsItems(
          currentMusic.playList.id
        );

        currentMusic.songs = [];
        setTime({ ...time, played: 0 });

        for (let i = 0; i < result.items.length; i++) {
          currentMusic.songs.push({
            id: result.items[i].snippet.resourceId.videoId,
            img: result.items[i].snippet.thumbnails.default.url,
            name: result.items[i].snippet.title,
            artist: result.items[i].snippet.videoOwnerChannelTitle,
            channelID: result.items[i].snippet.videoOwnerChannelId,
          });
        }

        audioRef.current = currentMusic.songs[currentMusic.song].id;
        setIsPlaying(true);
      } catch (error) {
        console.log("error: " + error);
      }
    };

    if (currentMusic.playList) getYoutubePlaylistItems();
  }, [currentMusic]);

  useEffect(() => {}, [volume]);

  useEffect(() => {}, [isPlaying]);

  const handlePlay = () => {
    if (currentMusic?.playList) setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentMusic.song < currentMusic.songs.length - 1) {
      currentMusic.song++;
      setIsPlaying(false);
      audioRef.current = currentMusic.songs[currentMusic.song].id;
      setIsPlaying(true);
    }
  };

  const handlePre = () => {
    if (currentMusic.song > 0) {
      currentMusic.song--;
      setIsPlaying(false);
      audioRef.current = currentMusic.songs[currentMusic.song].id;
      setIsPlaying(true);
    }
  };

  const handleMusicEnded = () => {
    if (currentMusic.song == currentMusic.songs.length - 1) {
      currentMusic.song = 0;
      audioRef.current = currentMusic.songs[currentMusic.song].id;
      setIsPlaying(true);
    } else {
      handleNext();
    }
  };

  const handleOnProgress = (changeState: any) => {
    setTime({ ...time, played: changeState.playedSeconds });
  };

  const handleOnDuration = (state: any) => {
    console.log(state);
    setTime({ ...time, MaxTime: state });
  };

  const formatTime = (time: number) => {
    if (time == null || time == 0) return "0:00";

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="absolute bottom-0 rounded-t-lg right-4 overflow-hidden z-20 cursor-pointer">
      <div className=" group cursor-default">
        <div className="flex gap-5 place-content-center absolute bg-zinc-900/50 w-[28vw] h-[16vw] items-center opacity-0 group-hover:opacity-100">
          <button
            className="text-white hover:scale-110 transition duration-75"
            onClick={handlePre}
          >
            <PrevIcon />
          </button>
          <button
            className="bg-white rounded-full p-3 text-black hover:scale-110 transition duration-75"
            onClick={handlePlay}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            className="text-white hover:scale-110 transition duration-75"
            onClick={handleNext}
          >
            <NextIcon />
          </button>

          <div className=" absolute gap-x-1 text-xs font-abc bottom-2 left-2">
            <span>{formatTime(time.played)}</span>
            <span>/</span>
            <span>{formatTime(time.MaxTime)}</span>
          </div>
        </div>

        <YouTubePlayer
          ref={playerRef}
          url={`"https://www.youtube.com/watch?v=${audioRef.current}`}
          width={"28vw"}
          height={"16vw"}
          playing={isPlaying}
          controls={false}
          onEnded={handleMusicEnded}
          volume={volume}
          onProgress={handleOnProgress}
          onDuration={handleOnDuration}
          style={{ cursor: "default" }}
        />
      </div>

      <MusicSlider
        defaultValue={[0]}
        max={time.MaxTime}
        min={0}
        step={0.1}
        className="w-[100%]"
        value={[time.played]}
        onValueChange={(value) => {
          setTime({ ...time, played: value[0] });
        }}
        onValueCommit={(value) => {
          playerRef?.current?.seekTo(value[0]);
          setTime({ ...time, played: value[0] });
          if (!isPlaying) setIsPlaying(true);
        }}
      />

      <div className="flex flex-auto flex-col gap-1 justify-between w-[28vw] px-4 z-50 pb-2 pt-3 bg-zinc-800 font-abc cursor-default">
        <h2 className="text-md truncate">
          {currentMusic.songs[currentMusic.song]?.name}
        </h2>

        <div className="flex items-end justify-between">
          <a
            onClick={() => {
              window.open(
                `https://www.youtube.com/channel/${
                  currentMusic.songs[currentMusic.song]?.channelID
                }`,
                "_blank"
              );
            }}
            className="text-xs font-thin text-gray-400 border-0 hover:text-gray-300 cursor-pointer"
          >
            {currentMusic.songs[currentMusic.song]?.artist.split("-")[0]}
          </a>

          <VolumeController />
        </div>
      </div>
    </div>
  );
}

export default Player;
