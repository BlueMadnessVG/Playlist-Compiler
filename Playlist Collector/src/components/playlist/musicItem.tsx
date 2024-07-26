import { useNavigate, useParams } from "react-router-dom";
import { usePlayerStore } from "../../global/music.store";
import ReproduceButton from "../../utils/Page utils/reproduceButton.utility";

function MusicItem({
  music,
  type,
  index,
}: {
  music: any;
  type: any;
  index: number;
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentMusic } = usePlayerStore((state: any) => state);

  return (
    <main className="text-gray-300 text-sm font-light border-b border-gray-500/20 group cursor-default">
      <div className="px-3 py-2 flex gap-3 items-center group-hover:bg-zinc-800 relative ">
        <picture className=" w-40 h-24 rounded-md relative">
          <ReproduceButton
            playlist={{ id }}
            song={index.toString()}
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
            className="object-cover w-full h-full rounded-lg "
          />
        </picture>

        <div className="flex flex-col gap-2">
          <h3 className=" max-w-96 truncate text-white">
            {type == "youtube" ? music?.title : music?.track.name}
          </h3>

          <a
            onClick={() => {
              navigate("/artist/" + type + "/" + music?.artist.id);
            }}
            className="cursor-pointer hover:text-white text-xs text-gray-500"
          >
            {type == "youtube"
              ? music?.artist.title.split("-")[0]
              : music?.track.artists[0].name}
          </a>
        </div>
      </div>
    </main>
  );
}

export default MusicItem;
