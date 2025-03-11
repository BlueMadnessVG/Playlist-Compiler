
import { useParams } from "react-router-dom";
import FrameMotionUtility from "../../utils/Motion/frameMotion.utility";
import { useFetchPlaylist } from "../../Hooks";
import { PlaylistContent, PlaylistHeader } from ".";

function PlayList() {
  const { type, from, id } = useParams();
  const { data, playlistInfo, loading } = useFetchPlaylist(from || "user", id || "");

  return (
    <div className="relative transition-all duration-1000 flex-1 flex-row h-full rounded-lg bg-zinc-900 overflow-x-hidden overflow-y-hidden mr-2 font-abc">
      <PlaylistHeader showProfile={true} />
      <PlaylistContent data={data} playlistInfo={playlistInfo} loading={loading} type={type} />
      <FrameMotionUtility />
    </div>
  );
}

export default PlayList;
