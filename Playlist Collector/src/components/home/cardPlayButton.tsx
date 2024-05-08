import PlayIcon from "../../assets/icons/play";

import { usePlayerStore } from "../../global/musicStore";
import PauseIcon from "../../assets/icons/pause";

import { push, ref, update } from "firebase/database";
import { database } from "../../global/fireBase";
import { useYoutubeStore } from "../../global/youtubeStore";
import { useSpotifyStore } from "../../global/spotifyStore";

function CardPlayButton({ id, type }: { id: string; type: string }) {
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
          ? ref(database, `Users/${youtubeId}`)
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
    <button
      onClick={handleClick}
      className="card-play-button rounded-full  p-2 text-white hover:scale-110 transition  bg-violet-800 hover:bg-violet-500"
    >
      {isPlayingPlaylist ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}

export default CardPlayButton;
