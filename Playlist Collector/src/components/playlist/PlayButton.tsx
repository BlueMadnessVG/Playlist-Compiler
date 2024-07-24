import PauseIcon from "../../assets/icons/pause";
import PlayIcon from "../../assets/icons/play";
import { usePlayerStore } from "../../global/music.store";
import { saveLocalStorage } from "../../utils/localstorage/localStorage.utility";

function PlayButton({
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
  if (currentMusic?.playlist)
    isPlayingPlaylist = isPlaying && currentMusic?.playlist.id == id;

  const handleClick = () => {
    if (
      isPlayingPlaylist ||
      (!isPlayingPlaylist && currentMusic.playlist?.id == id)
    ) {
      setIsPlaying(!isPlaying);
      return;
    }

    saveLocalStorage("playlist", { id: id }, 5);
    setIsPlaying(true);
    console.log("sigo");
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

export default PlayButton;
