import { useFiltersStore } from "../../global/filters.store";

function Filters() {
  const { isAll, isMusic, isPlaylist, setAll, setMusic, setPlaylist } =
    useFiltersStore((state: any) => state);

  function handleFilter(type: string) {
    setAll(false);
    setMusic(false);
    setPlaylist(false);

    if (type === "All") setAll(true);
    else if (type === "Music") setMusic(true);
    else if (type === "Playlists") setPlaylist(true);
  }

  return (
    <div className="flex gap-3 p-2 font-abc text-sm font-thin text-zinc-800">
      <button
        className={
          isAll
            ? `bg-white p-1 px-3 rounded-2xl`
            : `bg-zinc-500/20 p-1 px-3 rounded-2xl text-white transition-all duration-300 hover:bg-zinc-500/40`
        }
        onClick={() => handleFilter("All")}
      >
        All
      </button>
      <button
        className={
          isMusic
            ? `bg-white p-1 px-3 rounded-2xl`
            : `bg-zinc-500/20 p-1 px-3 rounded-2xl text-white transition-all duration-300 hover:bg-zinc-500/40`
        }
        onClick={() => handleFilter("Youtube")}
      >
        Music
      </button>
      <button
        className={
          isPlaylist
            ? `bg-white p-1 px-3 rounded-2xl`
            : `bg-zinc-500/20 p-1 px-3 rounded-2xl text-white transition-all duration-300 hover:bg-zinc-500/40`
        }
        onClick={() => handleFilter("Spotify")}
      >
        Playlist
      </button>
    </div>
  );
}

export default Filters;
