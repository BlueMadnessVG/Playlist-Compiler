import { useNavigate } from "react-router-dom";
import CardPlayButton from "./cardPlayButton";

function PlaylistItemCard({ playlist, type }: { playlist: any; type: string }) {
  const navigate = useNavigate();

  return (
    <article className=" group relative">
      <div className="absolute right-4 bottom-20 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
        <CardPlayButton
          id={type == "youtube" ? playlist.id : playlist.id}
          type={type}
        />
      </div>

      <a
        onClick={() => {
          navigate("/playlist/" + type + "/" + playlist.id);
        }}
        className="playlist-item transition-all duration-300 overflow-hidden p-2 pb-4 rounded-md flex flex-col relative gap-2 bg-zing-500/30 w-40 hover:bg-zinc-700/30"
      >
        <picture className="aspect-square w-full h-40 flex-none  ">
          <img
            src={
              type == "youtube"
                ? playlist.snippet.thumbnails.high.url
                : playlist.images[0].url
            }
            alt={`Playlist from ${
              type == "youtube"
                ? playlist.snippet.channelTitle
                : playlist.owner.display_name
            }`}
            className=" object-cover w-full h-full rounded-lg shadow-inner"
          />
        </picture>

        <div className="flex flex-auto flex-col font-abc px-3 ">
          <h4 className=" text-sm truncate">
            {type == "youtube" ? playlist.snippet.title : playlist.name}
          </h4>
          <span className="text-xs text-gray-400 pt-1">
            {type == "youtube" ? "YouTube" : "Spotify"}
          </span>
        </div>
      </a>
    </article>
  );
}

export default PlaylistItemCard;
