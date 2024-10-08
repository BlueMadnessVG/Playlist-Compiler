import { useNavigate } from "react-router-dom";

function SideMenuCard({ playlist, type }: { playlist: any; type: string }) {
  const navigate = useNavigate();
  return (
    <a
      onClick={() => {
        navigate(`/playlist/${type}/${playlist.id}`);
      }}
      className="playlist-item flex relative p-2 overflow-hidden items-center gap-2 rounded-md hover:bg-zinc-700 transition duration-200 cursor-pointer"
    >
      <picture className="h-12 w-12 flex-none">
        <img
          src={playlist?.snippet.thumbnails.default.url}
          alt={`Playlist from ${playlist.from}`}
          className=" object-cover w-full h-full rounded-md"
        />
      </picture>

      <div className="flex flex-auto flex-col truncate font-abc">
        <h4 className=" text-sm"> {playlist?.snippet.title} </h4>
        <span className="text-xs text-gray-500 pt-1">{type}</span>
      </div>
    </a>
  );
}

export default SideMenuCard;
