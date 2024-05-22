import { useNavigate, useParams } from "react-router-dom";
import { usePlayerStore } from "../../global/musicStore";
import PlayIcon from "../../assets/icons/play";

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
  let min = 0;
  let sec = 0;

  if (type != "youtube") {
    min = Math.floor((music?.track.duration_ms / (1000 * 60)) << 0);
    sec = Math.floor((music?.track.duration_ms / 1000) % 60);
  }
  const { id } = useParams();
  const { setCurrentMusic } = usePlayerStore((state: any) => state);

  const handleClick = () => {
    setCurrentMusic({ playList: { id }, song: index, songs: [] });
  };

  return (
    <main className="text-gray-300 text-sm font-light border-b border-gray-500/20 group cursor-default">
      <div className="px-3 py-2 flex gap-3 items-center group-hover:bg-zinc-800 relative ">
        <button
          className="flex place-content-center items-center absolute w-40 h-24 text-white bg-zinc-900/70 opacity-0 group-hover:opacity-100 z-10"
          onClick={handleClick}
        >
          <PlayIcon />
        </button>

        <picture className=" w-40 h-24 rounded-md">
          <img
            src={
              type == "youtube"
                ? music?.snippet.thumbnails.high.url
                : music?.track.album.images[0].url
            }
            alt={`Playlist from ${
              type == "youtube" ? music?.snippet.title : music?.track.name
            }`}
            className="object-cover w-full h-full rounded-lg "
          />
        </picture>

        <div className="flex flex-col gap-2">
          <h3 className=" max-w-96 truncate text-white">
            {type == "youtube" ? music?.snippet.title : music?.track.name}
          </h3>

          <a
            onClick={() => {
              navigate(
                "/artist/" + type + "/" + music?.snippet.videoOwnerChannelId
              );
            }}
            className="cursor-pointer hover:text-white text-xs text-gray-500"
          >
            {type == "youtube"
              ? music?.snippet.videoOwnerChannelTitle.split("-")[0]
              : music?.track.artists[0].name}
          </a>
        </div>
      </div>
    </main>
  );
}

export default MusicItem;
