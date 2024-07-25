import { useNavigate } from "react-router-dom";
import PlayButton from "../../../utils/Page utils/PlayButton.utility";

function PlaylistItemCard({ playlist, type }: { playlist: any; type: string }) {
  const navigate = useNavigate();

  return (
    <article className=" group relative">
      <div className="absolute right-2 bottom-16 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
        <PlayButton
          id={playlist.playlist_id}
          type={type}
          text=""
          style="card-play-button text-xs rounded-full flex gap-4 p-2 text-white hover:scale-110 transition  bg-violet-800 hover:bg-violet-500"
        />
      </div>

      <a
        onClick={() => {
          navigate("/playlist/" + type + "/" + playlist.playlist_id);
        }}
        className="playlist-item transition-all duration-300 overflow-hidden p-2 pb-4 rounded-md flex flex-col relative gap-2 bg-zing-500/30 w-full hover:bg-zinc-700/30"
      >
        <picture className="aspect-square w-full h-[40%] flex-none  ">
          <img
            src={playlist?.thumbnails.medium}
            alt={`Playlist from ${playlist?.creator}`}
            className={`w-full h-full rounded-lg shadow-inner object-none `}
          />
        </picture>

        <div className="flex flex-auto flex-col font-abc px-3 ">
          <h4 className=" text-sm truncate">{playlist?.title}</h4>
          <span className="text-xs text-gray-500 pt-1">{"YouTube"}</span>
        </div>
      </a>
    </article>
  );
}

export default PlaylistItemCard;
