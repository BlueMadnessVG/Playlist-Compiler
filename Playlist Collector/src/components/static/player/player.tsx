import { useEffect, useRef, useState } from "react";
import PlayIcon from "../../../assets/icons/play";
import PauseIcon from "../../../assets/icons/pause";

import { usePlayerStore } from "../../../global/music.store";
import VolumeController from "./Volume";
import YouTubePlayer from "react-player/youtube";
import { fetchYoutubePlaylistsItems } from "../../../services/Youtube/Youtube.service";
import NextIcon from "../../../assets/icons/next";
import PrevIcon from "../../../assets/icons/prev";
import CloseIcon from "../../../assets/icons/close";
import { MusicSlider } from "./MusicSlider";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import ArrowUpIcon from "../../../assets/icons/arrowUp";

function Player() {
  const navigate = useNavigate();
  const {
    currentMusic,
    playlistType,
    isPlaying,
    setIsPlaying,
    setCurrentMusic,
    volume,
  } = usePlayerStore((state: any) => state);

  const audioRef = useRef<string>("");
  const playerRef = useRef<any>();
  const currentPlaylistRef = useRef<string>("");
  const [time, setTime] = useState({
    played: 0,
    MaxTime: 0,
  });

  const getYoutubePlaylistItems = async () => {
    let result;

    if (
      currentPlaylistRef.current == currentMusic.playlist.id &&
      currentMusic.songs.length > 0
    ) {
      result = currentMusic.songs;
    } else {
      result = await fetchYoutubePlaylistsItems(currentMusic.playlist.id);
    }

    currentMusic.songs = result;
    setTime({ ...time, played: 0 });
    audioRef.current = currentMusic.songs[currentMusic.song].music_id;
    setIsPlaying(true);
  };

  const reproduceArtistItems = () => {
    setTime({ ...time, played: 0 });
    console.log(currentMusic.songs[currentMusic.song]);
    audioRef.current = currentMusic.songs[currentMusic.song].music_id;
    setIsPlaying(true);
  };

  useEffect(() => {
    console.log(currentMusic);
    setIsPlaying(false);
    if (currentMusic.playlist) {
      if (currentMusic.playlist.id == 0) {
        reproduceArtistItems();
        return;
      }
      if (playlistType == "youtube") getYoutubePlaylistItems();
    }
    currentPlaylistRef.current = currentMusic.playlist.id;
  }, [currentMusic]);

  const handlePlay = () => {
    if (currentMusic?.playlist) setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentMusic.song < currentMusic.songs.length - 1) {
      currentMusic.song++;
      setIsPlaying(false);
      audioRef.current = currentMusic.songs[currentMusic.song].music_id;
      setIsPlaying(true);
    }
  };

  const handlePre = () => {
    if (currentMusic.song > 0) {
      currentMusic.song--;
      setIsPlaying(false);
      audioRef.current = currentMusic.songs[currentMusic.song].music_id;
      setIsPlaying(true);
    }
  };

  const handleMusicEnded = () => {
    if (currentMusic.song == currentMusic.songs.length - 1) {
      currentMusic.song = 0;
      audioRef.current = currentMusic.songs[currentMusic.song].music_id;
      setIsPlaying(true);
    } else {
      handleNext();
    }
  };

  const handleOnProgress = (changeState: any) => {
    setTime({ ...time, played: changeState.playedSeconds });
  };

  const handleOnDuration = (state: any) => {
    setTime({ ...time, MaxTime: state });
  };

  const formatTime = (time: number) => {
    if (time == null || time == 0) return "0:00";

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleCloseClick = () => {
    setIsPlaying(false);
    setCurrentMusic({ playlist: null, song: null, songs: [] });
  };

  return (
    <motion.div
      className="absolute bottom-0 rounded-t-lg right-8 overflow-hidden z-50 cursor-pointer"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <div className="group cursor-default">
        <div className="flex gap-5 place-content-center absolute bg-zinc-900/50 w-[28vw] h-[16vw] items-center opacity-0 group-hover:opacity-100 transition duration-300">
          <button
            className="text-white hover:scale-110 transition duration-75"
            onClick={handlePre}
          >
            <PrevIcon />
          </button>
          <button
            className="bg-white rounded-full p-3 text-black hover:scale-110 transition duration-150"
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

          <div className="absolute gap-x-2 p-1 px-2 top-0 left-0 bg-zinc-800 rounded-br-lg hover:bg-zinc-700 transition-all duration-200">
            <button className="hover:scale-110">
              <ArrowUpIcon />
            </button>
          </div>

          <div className="absolute gap-x-1 top-2 right-2">
            <button className="hover:scale-110" onClick={handleCloseClick}>
              <CloseIcon />
            </button>
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
      <div className="flex flex-auto flex-col justify-between w-[28vw] px-4 z-50 pb-2 pt-2 bg-zinc-800 font-abc cursor-default overflow-hidden">
        <div className={`whitespace-nowrap inline-block truncate`}>
          <h2 className="text-lg">
            {currentMusic.songs[currentMusic.song]?.title}
          </h2>
        </div>

        <div className="flex items-end justify-between">
          <a
            onClick={() => {
              navigate(
                "/artist/" +
                  playlistType +
                  "/" +
                  currentMusic.songs[currentMusic.song]?.artist.id
              );
            }}
            className="text-sm font-thin text-gray-400 border-0 hover:text-gray-300 cursor-pointer"
          >
            {currentMusic.songs[currentMusic.song]?.artist.title.split("-")[0]}
          </a>

          <VolumeController />
        </div>
      </div>
    </motion.div>
  );
}

export default Player;
