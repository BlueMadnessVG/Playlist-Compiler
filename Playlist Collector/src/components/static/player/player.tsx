import React, { useEffect, useRef, useState } from "react";
import PlayIcon from "../../../assets/icons/play";
import PauseIcon from "../../../assets/icons/pause";

import song from "../../../assets/music/song_1.mp3";
import { usePlayerStore } from "../../../global/musicStore";
import { Slider } from "./Slider";
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
  const [currentImg, setCurrentImg] = useState("");

  useEffect(() => {
    const getYoutubePlaylistItems = async () => {
      try {
        const result = await fetchYoutubePlaylistsItems(
          currentMusic.playList.id
        );

        currentMusic.songs = [];
        setTime({ ...time, played: 0 });

        for (let i = 0; i < result.items.length; i++) {
          console.log(result.items[i]);
          currentMusic.songs.push({
            id: result.items[i].snippet.resourceId.videoId,
            img: result.items[i].snippet.thumbnails.default.url,
            name: result.items[i].snippet.title,
            artist: result.items[i].snippet.videoOwnerChannelTitle,
            channelID: result.items[i].snippet.videoOwnerChannelId,
          });
        }

        audioRef.current = currentMusic.songs[currentMusic.song].id;
        setCurrentImg(currentMusic.songs[currentMusic.song].img);
        setIsPlaying(true);
      } catch (error) {
        console.log("error: " + error);
      }
    };

    console.log(currentMusic);
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
      setCurrentImg(currentMusic.songs[currentMusic.song].img);
      audioRef.current = currentMusic.songs[currentMusic.song].id;
      setIsPlaying(true);
    }
  };

  const handlePre = () => {
    if (currentMusic.song > 0) {
      currentMusic.song--;
      setIsPlaying(false);
      setCurrentImg(currentMusic.songs[currentMusic.song].img);
      audioRef.current = currentMusic.songs[currentMusic.song].id;
      setIsPlaying(true);
    }
  };

  const handleMusicEnded = () => {
    handleNext();
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
    <>
      <div className="absolute bottom-24 left-4 rounded-lg overflow-hidden z-20 cursor-pointer">
        <YouTubePlayer
          ref={playerRef}
          url={`"https://www.youtube.com/watch?v=${audioRef.current}`}
          width={"16vw"}
          height={"16vw"}
          playing={isPlaying}
          controls={false}
          onEnded={handleMusicEnded}
          volume={volume}
          onProgress={handleOnProgress}
          onDuration={handleOnDuration}
        />
      </div>

      <div className="pb-2 bg-zinc-800">
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
      </div>
      <div className="flex flex-row justify-between w-full px-4 z-50 pb-4 pt-1  bg-zinc-800">
        <div className="flex gap-4 place-content-center items-center">
          <div className="flex gap-5 place-content-center">
            <button
              className="text-gray-400 hover:text-white transition duration-75"
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
              className="text-gray-400 hover:text-white transition duration-75"
              onClick={handleNext}
            >
              <NextIcon />
            </button>
          </div>

          <div className="flex gap-x-1 text-xs  font-abc">
            <span className="opacity-50">{formatTime(time.played)}</span>
            <span className="opacity-50">/</span>
            <span className="opacity-50">{formatTime(time.MaxTime)}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <picture className="h-12 w-12 flex-none">
            <img
              src={currentImg}
              className="object-cover w-full h-full rounded-lg "
            />
          </picture>

          <div className="font-abc">
            <h2 className="text-md">
              {currentMusic.songs[currentMusic.song]?.name}
            </h2>
            <a
              onClick={() => {
                window.open(
                  `https://www.youtube.com/channel/${
                    currentMusic.songs[currentMusic.song]?.channelID
                  }`,
                  "_blank"
                );
              }}
              className="text-sm font-thin text-gray-400 border-0 hover:border-b border-gray-400 cursor-pointer"
            >
              {currentMusic.songs[currentMusic.song]?.artist.split("-")[0]}
            </a>
          </div>
        </div>

        <div className="grid place-content-center">
          <VolumeController />
        </div>
      </div>
    </>
  );
}

export default Player;
