import { useCallback, useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../../../global";
import YouTubePlayer from "react-player/youtube";
import { fetchYoutubePlaylistsItems } from "../../../services/Youtube/Youtube.service";

import { motion } from "framer-motion";

import { PlayerContent } from "./PlayerContent";
import { PlayerFooter } from "./PlayerFooter";
import { PlayerHeader } from "./PlayerHeader";
import { PlayerQueue } from "./PlayerQueue";
import { PlayerControls } from "./PlayerControls";

function Player() {
  const {
    currentMusic,
    playlistType,
    isPlaying,
    setIsPlaying,
    setCurrentMusic,
    updateCurrentMusicSongs,
    volume,
  } = usePlayerStore((state: any) => state);

  const audioRef = useRef<string>("");
  const playerRef = useRef<YouTubePlayer>(null);
  const currentPlaylistRef = useRef<string>("");
  const [time, setTime] = useState({
    played: 0,
    MaxTime: 0,
  });
  const [open, setOpen] = useState(false);

  const reproduceArtistItems = () => {
    setTime({ ...time, played: 0 });
    console.log(currentMusic.songs[currentMusic.song]);
    audioRef.current = currentMusic.songs[currentMusic.song].music_id;
    setIsPlaying(true);
  };

  const handlePlay = useCallback(() => {
    if (currentMusic?.playlist) setIsPlaying(!isPlaying);
  }, [currentMusic, isPlaying, setIsPlaying]);

  const handleNext = useCallback(() => {
    if (currentMusic.song == currentMusic.songs.length - 1) return;

    currentMusic.song++;
    setIsPlaying(false);
    audioRef.current = currentMusic.songs[currentMusic.song].music_id;
    setIsPlaying(true);
  }, [currentMusic, setIsPlaying]);

  const handlePre = useCallback(() => {
    if (currentMusic.song === 0) return;

    currentMusic.song--;
    setIsPlaying(false);
    audioRef.current = currentMusic.songs[currentMusic.song].music_id;
    setIsPlaying(true);
  }, [currentMusic, setIsPlaying]);

  const handleMusicEnded = useCallback(() => {
    if (currentMusic.song == currentMusic.songs.length - 1) {
      currentMusic.song = 0;
      audioRef.current = currentMusic.songs[currentMusic.song].music_id;
      setIsPlaying(true);
    } else {
      handleNext();
    }
  }, [currentMusic, handleNext, setIsPlaying]);

  const handleOnProgress = useCallback((changeState: any) => {
    setTime((prev) => ({ ...prev, played: changeState.playedSeconds }));
  }, []);

  const handleOnDuration = useCallback((state: number) => {
    setTime((prev) => ({ ...prev, MaxTime: state }));
  }, []);

  const handleCloseClick = useCallback(() => {
    setIsPlaying(false);
    setCurrentMusic({ playlist: null, song: null, songs: [] });
  }, [setIsPlaying, setCurrentMusic]);

  const handleToggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleSeek = useCallback(
    (value: number) => {
      playerRef?.current?.seekTo(value);
      setTime((prev) => ({ ...prev, played: value }));
      if (!isPlaying) setIsPlaying(true);
    },
    [isPlaying, setIsPlaying]
  );

  const formatTime = (time: number) => {
    if (time == null || time == 0) return "0:00";

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

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
    console.log(currentMusic);
    audioRef.current = currentMusic.songs[currentMusic.song].music_id;
    setIsPlaying(true);
  };

  useEffect(() => {
    setIsPlaying(false);
    if (currentMusic.playlist) {
      if (currentMusic.playlist.id == 0) {
        reproduceArtistItems();
        return;
      }
      if (playlistType == "youtube") getYoutubePlaylistItems();
    }
    currentPlaylistRef.current = currentMusic?.playlist?.id;
    console.log(currentMusic.songs[currentMusic.song]);
  }, [currentMusic]);

  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      exit={{ y: open ? 500 : 5000 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      style={{ height: open ? "100%" : "fit-content" }}
      className="absolute bottom-0 right-2 overflow-hidden z-50 cursor-pointer bg-zinc-800 shadow-md shadow-zinc-950 w-[28vw]"
    >
      <PlayerHeader
        onClose={handleCloseClick}
        onToggleOpen={() => setOpen(!open)}
        open={open}
        playedTime={formatTime(time.played)}
        maxTime={formatTime(time.MaxTime)}
      >
        <PlayerControls
          onPlay={handlePlay}
          onNext={handleNext}
          onPrev={handlePre}
          isPlaying={isPlaying}
        />
      </PlayerHeader>

      <PlayerContent
        audioRef={audioRef.current}
        isPlaying={isPlaying}
        volume={volume}
        onProgress={handleOnProgress}
        onDuration={handleOnDuration}
        onEnded={handleMusicEnded}
        playedTime={time.played}
        maxTime={time.MaxTime}
        onSeek={handleSeek}
      />

      {currentMusic.songs[currentMusic.song] && (
        <PlayerFooter
          songTitle={currentMusic.songs[currentMusic.song]?.title}
          artistName={
            currentMusic.songs[currentMusic.song]?.artist.title.split("-")[0]
          }
          artistId={currentMusic.songs[currentMusic.song]?.artist.id}
          playlistType={playlistType}
        />
      )}

      {open && currentMusic?.songs.length > 0 && (
        <PlayerQueue
          songs={currentMusic.songs}
          onReorder={updateCurrentMusicSongs}
        />
      )}
    </motion.div>
  );
}

export default Player;
