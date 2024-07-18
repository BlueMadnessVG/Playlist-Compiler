import React from "react";
import PauseIcon from "../../../assets/icons/pause";
import PlayIcon from "../../../assets/icons/play";
import { useYoutubeStore } from "../../../global/youtube.store";
import { useSpotifyStore } from "../../../global/spotifyStore";
import { usePlayerStore } from "../../../global/musicStore";
import { push, ref, update } from "firebase/database";
import { database } from "../../../global/fireBase";

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
  const { youtubeId } = useYoutubeStore((state: any) => state);
  const { spotifyId } = useSpotifyStore((state: any) => state);

  var isPlayingPlaylist = false;
  if (currentMusic?.playList)
    isPlayingPlaylist = isPlaying && currentMusic?.playList.id == id;

  const handleAddHistory = () => {
    try {
      const databaseRef =
        type == "youtube"
          ? ref(database, `Users/${youtubeId.id}`)
          : ref(database, `Users/${spotifyId}`);
      const newDataRef = push(databaseRef);

      update(newDataRef, {
        id: id,
      });

      console.log("data added");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    handleAddHistory();
    setIsPlaying(true);
    setCurrentMusic({
      playList: { id },
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
