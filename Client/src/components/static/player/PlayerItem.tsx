import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "../../../global";
import { motion, Reorder, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "../../../utils/Motion/RaisedShadow.utility";
import ReproduceButton from "../../../utils/Page utils/reproduceButton.utility";

function PlayerItem({
  music,
  type,
  index,
}: {
  music: any;
  type: string;
  index: string;
}) {
  const navigate = useNavigate();
  const { currentMusic } = usePlayerStore((state: any) => state);
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  console.log("im re rendering");


  return (
    <Reorder.Item value={music} id={index} style={{ boxShadow, y }}>
      <main className="text-gray-300 text-sm font-light group cursor-move relative hover:bg-zinc-800 border-b border-gray-500/20 z-40 bg-zinc-900 px-2 py-1">
        <div className="grid grid-flow-col gap-3 items-center justify-start relative z-10">
          <picture className="w-14 h-14 relative">
            <ReproduceButton
              playlist={currentMusic?.playlist}
              song={index.toString()}
              song_id={music?.music_id}
              songs={currentMusic.songs ? currentMusic.songs : []}
            />
            <img
              src={
                type == "youtube"
                  ? music?.thumbnails.high
                  : music?.track.album.images[0].url
              }
              alt={`Playlist from ${
                type == "youtube" ? music?.title : music?.track.name
              }`}
              className="object-cover w-full h-full rounded-md"
            />
          </picture>

          <div className="flex flex-col gap-1 justify-between pr-4 ">
            <h3 className="font-semibold text-[1rem]  text-white ">
              {type == "youtube" ? music?.title : music?.track.name}
            </h3>
            <a
              onClick={() => {
                navigate("/artist/" + type + "/" + music?.artist.id);
              }}
              className="cursor-pointer hover:text-white text-sm font-semibold text-gray-500"
            >
              {type == "youtube"
                ? music?.artist.title.split("-")[0]
                : music?.track.artists[0].name}
            </a>
          </div>
        </div>

        {currentMusic?.song == index.toString() && (
          <motion.span
            layoutId="player-tab"
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-0 z-0 bg-gradient-to-r from-violet-800 to-indigo-900  "
          ></motion.span>
        )}
      </main>
    </Reorder.Item>
  );
}
export default PlayerItem;
