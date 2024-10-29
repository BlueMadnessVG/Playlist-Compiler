import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function PlaylistCart({ playlist }: { playlist: any }) {
  const navigate = useNavigate();
  const { type } = useParams();

  const date = new Date(playlist?.created_date);
  const year = date.getUTCFullYear();
  return (
    <motion.button
      initial={{ y: 0 }}
      exit={{ y: [1, 1.1, 0] }}
      className="group relative text-left"
      onClick={() => {
        navigate(`/playlist/youtube/artist/${playlist.playlist_id}`);
      }}
    >
      <div className="flex flex-col hover:bg-zinc-800/80 p-2 rounded-md w-56">
        <picture
          className="aspect-square w-52 h-52 flex-none cursor-default"
          onDragStart={(e) => {
            e.preventDefault();
          }}
        >
          <img
            src={playlist?.thumbnails.high}
            alt={`Song from ${playlist?.creator}`}
            className=" object-none w-full h-full shadow-lg rounded-md "
          />
        </picture>

        <div className="flex flex-auto flex-col pt-2 pl-1 gap-2">
          <h4 className="truncate"> {playlist?.title} </h4>
          <span className="text-xs text-gray-500"> {year} </span>
        </div>
      </div>
    </motion.button>
  );
}

export default PlaylistCart;
