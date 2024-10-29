import { useNavigate } from "react-router-dom";
import PlayButton from "../../../utils/Page utils/PlayButton.utility";
import { useAnimate } from "framer-motion";
import MusicMotion, {
  BOTTOM_RIGHT_CLIP,
} from "../../../utils/Motion/MusicMotion.utility";

function PlaylistItemCard({ playlist, type }: { playlist: any; type: string }) {
  const [scope, animate] = useAnimate();
  const navigate = useNavigate();

  return (
    <MusicMotion scope={scope} animate={animate}>
      <div className="absolute right-2 bottom-16 translate-y-4 transition-all duration-200 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10 cursor-pointer"></div>

      <a
        onClick={() => {
          navigate(`/playlist/${type}/user/${playlist.playlist_id}`);
        }}
        className="playlist-item transition-all duration-300 overflow-hidden p-2 pb-4 rounded-sm flex flex-col relative gap-2 bg-zing-500/30 w-full hover:bg-zinc-700/30 cursor-pointer"
      >
        <picture className="aspect-square w-full h-[40%] flex-none  ">
          <img
            src={playlist?.thumbnails.medium}
            alt={`Playlist from ${playlist?.creator}`}
            className={`w-full h-full rounded-lg shadow-inner object-none `}
          />
        </picture>

        <div className="flex flex-auto flex-col font-abc px-3 ">
          <h4 className=" text-md truncate">{playlist?.title}</h4>
          <span className="text-xs text-gray-500 pt-1">{"YouTube"}</span>
        </div>
      </a>

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute w-[96%] h-[71%] left-1 top-2 grid place-content-center bg-violet-900/85 text-white border-md z-10 rounded-lg"
      >
        <PlayButton
          id={playlist.playlist_id}
          type={type}
          text=""
          style="card-play-button "
        />
      </div>
    </MusicMotion>
  );
}

export default PlaylistItemCard;
