import { useNavigate } from "react-router-dom";
import { ArtistModel } from "../../models/Artist.model";
import { motion } from "framer-motion";

export function ArtistCard({ artist }: { artist: ArtistModel }) {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ y: 0 }}
      exit={{ y: [1, 1.1, 0] }}
      className="group relative text-left"
      onClick={() => {
        navigate(`/artist/youtube/${artist?.channel_id}`);
      }}
    >
      <div className="flex flex-col hover:bg-zinc-800/80 p-2 rounded-md w-36">
        <picture
          className="aspect-square w-32 h-32 flex-none cursor-default"
          onDragStart={(e) => {
            e.preventDefault();
          }}
        >
          <img
            src={
              artist?.thumbnails.medium
                ? artist?.thumbnails.medium
                : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
            }
            alt={`https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg`}
            className=" object-none w-full h-full shadow-lg rounded-full "
          />
        </picture>

        <div className="flex flex-auto flex-col pt-2 pl-1 gap-2">
          <h4 className="truncate"> {artist?.title} </h4>
        </div>
      </div>
    </motion.button>
  );
}
