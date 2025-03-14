import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../global";
import YouTubePlayer from "react-player/youtube";
import { fetchYoutubePlaylistsItems } from "../services/Youtube";
import { MusicModel, PlaylistModel } from "../models";

type AudioRef = string;
type PlayerRef = any;

type OnProgressCallback = (state: { playedSeconds: number }) => void;
type OnDurationCallback = (duration: number) => void;

interface TimeState {
    played: number;
    MaxTime: number
}

interface Params {
    data: {
      currentMusic: {
        playlist: PlaylistModel | null;
        song: number;
        songs: MusicModel[];
      };
      isPlaying: boolean;
      open: boolean;
      time: TimeState;
      volume: number;
      audioRef: React.MutableRefObject<AudioRef>;
      playerRef: React.RefObject<YouTubePlayer>;
      playlistType: string;
      
    };
    functions: {
        handlePlay: () => void;
        handleNext: () => void;
        handlePre: () => void;
        handleMusicEnded: () => void;
        handleOnProgress: OnProgressCallback;
        handleOnDuration: OnDurationCallback;
        handleCloseClick: () => void;
        handleSeek: (value: number) => void;
        setOpen: Dispatch<React.SetStateAction<boolean>>;
        updateCurrentMusicSongs: () => void;
    }
    loading: boolean;
  }

export const usePlayer = (): Params => {
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
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Reproduce artist items
  const reproduceArtistItems = useCallback(() => {
    setTime((prev) => ({ ...prev, played: 0 }));
    audioRef.current = currentMusic.songs[currentMusic.song].music_id;
    setIsPlaying(true);
  }, [currentMusic, setIsPlaying]);

  // Handle play/pause
  const handlePlay = useCallback(() => {
    if (currentMusic?.playlist) setIsPlaying(!isPlaying);
  }, [currentMusic, isPlaying, setIsPlaying]);

  // Handle next song
  const handleNext = useCallback(() => {
    if (currentMusic.song === currentMusic.songs.length - 1) return;

    currentMusic.song++;
    setIsPlaying(false);
    audioRef.current = currentMusic.songs[currentMusic.song].music_id;
    setIsPlaying(true);
  }, [currentMusic, setIsPlaying]);

  // Handle previous song
  const handlePre = useCallback(() => {
    if (currentMusic.song === 0) return;

    currentMusic.song--;
    setIsPlaying(false);
    audioRef.current = currentMusic.songs[currentMusic.song].music_id;
    setIsPlaying(true);
  }, [currentMusic, setIsPlaying]);

  // Handle music ended
  const handleMusicEnded = useCallback(() => {
    if (currentMusic.song === currentMusic.songs.length - 1) {
      currentMusic.song = 0;
      audioRef.current = currentMusic.songs[currentMusic.song].music_id;
      setIsPlaying(true);
    } else {
      handleNext();
    }
  }, [currentMusic, handleNext, setIsPlaying]);

  // Handle progress update
  const handleOnProgress = useCallback((changeState: { playedSeconds: any; }) => {
    setTime((prev) => ({ ...prev, played: changeState.playedSeconds }));
  }, []);

  // Handle duration update
  const handleOnDuration = useCallback((duration: any) => {
    setTime((prev) => ({ ...prev, MaxTime: duration }));
  }, []);

  // Handle close player
  const handleCloseClick = useCallback(() => {
    setOpen(false);
    setIsPlaying(false);
    setCurrentMusic({ playlist: null, song: null, songs: [] });
  }, [setIsPlaying, setCurrentMusic]);

  // Handle seek
  const handleSeek = useCallback(
    (value: number) => {
      playerRef?.current?.seekTo(value);
      setTime((prev) => ({ ...prev, played: value }));
      if (!isPlaying) setIsPlaying(true);
    },
    [isPlaying, setIsPlaying]
  );

  // Fetch YouTube playlist items
  const getYoutubePlaylistItems = useCallback(async () => {
    setLoading(true);
    let result: MusicModel[];

    if (
      currentPlaylistRef.current === currentMusic.playlist.id &&
      currentMusic.songs.length > 0
    ) {
      result = currentMusic.songs;
    } else {
      result = await fetchYoutubePlaylistsItems(currentMusic.playlist.id);
    }

    currentMusic.songs = result;
    setTime((prev) => ({ ...prev, played: 0 }));
    audioRef.current = currentMusic.songs[currentMusic.song].music_id;
    setIsPlaying(true);
    setLoading(false);
  }, [currentMusic, setIsPlaying]);

  // Initialize player
  useEffect(() => {
    setIsPlaying(false);
    if (currentMusic.playlist) {
      if (currentMusic.playlist.id === "0") {
        reproduceArtistItems();
        return;
      }
      if (playlistType === "youtube") getYoutubePlaylistItems();
    }
    currentPlaylistRef.current = currentMusic?.playlist?.id || "";
  }, [
    currentMusic,
    playlistType,
    getYoutubePlaylistItems,
    reproduceArtistItems,
    setIsPlaying,
  ]);

  return {
    data: {
      currentMusic,
      isPlaying,
      open,
      time,
      volume,
      audioRef,
      playerRef,
        playlistType,
    },
    functions: {
        handlePlay,
        handleNext,
        handlePre,
        handleMusicEnded,
        handleOnProgress,
        handleOnDuration,
        handleCloseClick,
        handleSeek,
        setOpen,
        updateCurrentMusicSongs
    },
    loading,
  };
};
