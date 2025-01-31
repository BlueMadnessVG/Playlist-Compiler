import { useParams } from "react-router-dom";
import PlayButton from "../../utils/Page utils/PlayButton.utility";
import { motion } from "framer-motion";

function PlaylistInfo({
  songs,
  playlistInfo,
}: {
  songs: number;
  playlistInfo: any;
}) {
  const { type, id } = useParams();

  return (
    <div className="[grid-area:aside] absolute top-0 flex flex-col gap-8 h-full w-[380px] bg-white">
      <div className="absolute w-full h-full bg-gradient-to-t from-zinc-900 from-[5%]">
        <motion.picture layoutId={`${id}-playlist-img`} className="object-fill">
          <img
            src={
              type == "youtube"
                ? playlistInfo?.thumbnails.high
                : playlistInfo?.images[0].url
            }
            alt={`Playlist from ${
              type == "youtube"
                ? playlistInfo?.creator
                : playlistInfo?.owner.display_name
            }`}
            className="object-fill w-full h-full shadow-md blur-3xl"
          />
        </motion.picture>
      </div>

      <div className="flex flex-col gap-8 p-6 z-10 sticky pt-12">
        <picture className="flex aspect-square w-full h-52 flex-none relative group">
          <img
            src={
              type == "youtube"
                ? playlistInfo?.thumbnails.high
                : playlistInfo?.images[0].url
            }
            alt={`Playlist from ${
              type == "youtube"
                ? playlistInfo?.creator
                : playlistInfo?.owner.display_name
            }`}
            className=" object-none w-full h-full rounded-xl shadow-md "
          />

          <PlayButton
            id={id ? id?.toString() : ""}
            type={type ? type : "youtube"}
            text="Reproduce playlist"
            style="flex place-content-center gap-2 items-center absolute w-full h-52 text-white bg-zinc-900/80 opacity-0 group-hover:opacity-100 z-10 transition duration-200 rounded-lg"
          />
        </picture>

        <div className="flex flex-col justify-between gap-3 ">
          <div>
            <h1 className=" text-3xl font-bold block text-white ">
              {type == "youtube" ? playlistInfo?.title : playlistInfo?.name}
            </h1>
          </div>

          <h2 className="flex flex-1 items-end text-sm font-light ">
            <span className=" font-bold text-white text-md">
              {type == "youtube"
                ? playlistInfo?.creator
                : playlistInfo?.owner.display_name}
            </span>
          </h2>

          <div className="flex-1 flex pt-2 items-end">
            <div className="text-sm text-gray-300 font-normal flex flex-row">
              <span className=" ml-1 text-xs">
                {songs} songs, from{" "}
                <span
                  className={
                    type == "youtube" ? `text-red-500` : `text-green-500`
                  }
                >
                  {type}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlaylistInfo;
