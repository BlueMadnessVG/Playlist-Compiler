import { useNavigate } from "react-router-dom";
import { useAnimate } from "framer-motion";
import MusicMotion from "../../../utils/Motion/MusicMotion.utility";
import { PlaylistDetails, PlaylistImage, PlaylistOverlay } from "..";

interface PlaylistItemCardProps {
  playlist: any;
  type: string;
}

export function PlaylistItemCard({ playlist, type }: PlaylistItemCardProps) {
  const [scope, animate] = useAnimate();
  const navigate = useNavigate();

  const imageUrl = playlist?.thumbnails.medium;
  const altText = `Playlist from ${playlist?.creator}`;
  const title = playlist?.title;
  const playlistId = playlist?.playlist_id;

  return (
    <MusicMotion scope={scope} animate={animate}>
      <div className="absolute right-2 bottom-16 translate-y-4 transition-all duration-200 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10 cursor-pointer"></div>

      <a
        onClick={() => navigate(`/playlist/${type}/user/${playlistId}`)}
        className="playlist-item transition-all duration-300 overflow-hidden p-2 pb-4 rounded-sm flex flex-col relative gap-2 bg-zing-500/30 w-full hover:bg-zinc-700/30 cursor-pointer"
      >
        <PlaylistImage imageUrl={imageUrl} altText={altText} />
        <PlaylistDetails title={title} type="YouTube" />
      </a>

      <PlaylistOverlay playlistId={playlistId} type={type} scope={scope} />
    </MusicMotion>
  );
}

