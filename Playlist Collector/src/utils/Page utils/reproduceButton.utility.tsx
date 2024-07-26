import PauseIcon from "../../assets/icons/pause";
import PlayIcon from "../../assets/icons/play";
import { usePlayerStore } from "../../global";
import { MusicModel } from "../../models";

function ReproduceButton({
  playlist,
  song,
  songs,
  w,
  h,
}: {
  playlist: any;
  song: string;
  songs: [MusicModel];
  w?: number;
  h?: number;
}) {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } =
    usePlayerStore((state: any) => state);

  var isPlayingMusic = false;
  if (currentMusic.song) isPlayingMusic = currentMusic?.song == song;

  const handleClick = () => {
    if (isPlayingMusic || (!isPlayingMusic && currentMusic?.song == song)) {
      setIsPlaying(!isPlaying);
      return;
    }

    setCurrentMusic({
      playlist: playlist,
      song: song,
      songs: songs,
    });
  };

  return (
    <button
      className={`flex place-content-center items-center absolute text-white bg-zinc-900/70 group-hover:opacity-100 z-10 transition-all duration-150 ${
        w ? `w-${w}` : "w-full"
      } ${h ? `h-${h}` : "h-full"} ${!isPlayingMusic && "opacity-0 "}`}
      onClick={handleClick}
    >
      {isPlayingMusic ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
export default ReproduceButton;
