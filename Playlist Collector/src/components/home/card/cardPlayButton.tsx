import React from "react";
import PauseIcon from "../../../assets/icons/pause";
import PlayIcon from "../../../assets/icons/play";
import { useYoutubeStore } from "../../../global/youtube.store";
import { useSpotifyStore } from "../../../global/spotify.store";
import { usePlayerStore } from "../../../global/music.store";
import { saveLocalStorage } from "../../../utils/localstorage/localStorage.utility";

function CardPlayButton({
  id,
  type,
  text,
  style,
}: {
  id: string;
  type: string;
  text: string;
  style: string;
}) {
  const {
    currentMusic,
    isPlaying,
    setPlaylistType,
    setIsPlaying,
    setCurrentMusic,
  } = usePlayerStore((state: any) => state);

  var isPlayingPlaylist = false;
  if (currentMusic?.playList)
    isPlayingPlaylist = isPlaying && currentMusic?.playList.id == id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    saveLocalStorage("playlist", { id: id }, 5);
    setIsPlaying(true);
    setCurrentMusic({
      playlist: { id },
      song: 0,
      songs: [],
    });
    setPlaylistType(type);
  };

  return (
    <button onClick={handleClick} className={style}>
      {isPlayingPlaylist ? <PauseIcon /> : <PlayIcon />}
      {text.length > 0 && text}
    </button>
  );
}

export default CardPlayButton;
