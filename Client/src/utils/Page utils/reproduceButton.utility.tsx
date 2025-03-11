import {PauseIcon, PlayIcon} from "../../assets/icons";
import { usePlayerStore } from "../../global";
import { MusicModel } from "../../models";

function ReproduceButton({
  playlist,
  song,
  song_id,
  songs,
  w,
  h,
}: {
  playlist: any;
  song: string;
  song_id: string;
  songs: [MusicModel];
  w?: number;
  h?: number;
}) {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } =
    usePlayerStore((state: any) => state);

  var isPlayingMusic = false;
  if (currentMusic?.song)
    isPlayingMusic =
      currentMusic?.songs[currentMusic?.song]?.music_id == song_id;

  const handleClick = () => {
    if (
      isPlayingMusic ||
      (!isPlayingMusic &&
        currentMusic?.songs &&
        currentMusic?.songs[currentMusic?.song]?.music_id == song_id)
    ) {
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
      className={`flex place-content-center items-center absolute text-white bg-violet-900/85 rounded-md group-hover:opacity-100 z-10 transition-all duration-150 ${
        w ? `w-${w}` : "w-full"
      } ${h ? `h-${h}` : "h-full"} ${!isPlayingMusic && "opacity-0 "}`}
      onClick={handleClick}
    >
      {isPlayingMusic ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
export default ReproduceButton;
