import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PlaylistDetails, PlaylistImage } from ".";

interface PlaylistInfoProps {
  songs: number;
  playlistInfo: any;
}

export function PlaylistInfo({ songs, playlistInfo }: PlaylistInfoProps) {
  const { type, id } = useParams();

  const imageUrl =
    type === "youtube"
      ? playlistInfo?.thumbnails.high
      : playlistInfo?.images[0].url;
  const altText = `Playlist from ${
    type === "youtube"
      ? playlistInfo?.creator
      : playlistInfo?.owner.display_name
  }`;
  const title = type === "youtube" ? playlistInfo?.title : playlistInfo?.name;
  const creator =
    type === "youtube"
      ? playlistInfo?.creator
      : playlistInfo?.owner.display_name;

  return (
    <div className="[grid-area:aside] absolute top-0 flex flex-col gap-8 h-full w-[380px] bg-white">
      <div className="absolute w-full h-full bg-gradient-to-t from-zinc-900 from-[5%]">
        <motion.picture className="object-fill">
          <img
            src={imageUrl}
            alt={altText}
            className="object-fill w-full h-full shadow-md blur-3xl"
          />
        </motion.picture>
      </div>

      <div className="flex flex-col gap-8 p-6 z-10 sticky pt-12">
        <PlaylistImage
          imageUrl={imageUrl}
          altText={altText}
          id={id || ""}
          type={type || "youtube"}
        />
        <PlaylistDetails title={title} creator={creator} songs={songs} type={type || "youtube"} />
      </div>
    </div>
  );
}
