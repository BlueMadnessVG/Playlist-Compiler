import React from "react";
import { useFiltersStore } from "../../global/filtestStore";

function Filters() {
  const { isAll, isSpotify, isYoutube, setAll, setSpotify, setYoutube } =
    useFiltersStore((state: any) => state);

  function handleFilter(type: string) {
    setAll(false);
    setSpotify(false);
    setYoutube(false);

    if (type === "All") setAll(true);
    else if (type === "Youtube") setYoutube(true);
    else if (type === "Spotify") setSpotify(true);
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
          isYoutube
            ? `bg-white p-1 px-3 rounded-2xl`
            : `bg-zinc-500/20 p-1 px-3 rounded-2xl text-white transition-all duration-300 hover:bg-zinc-500/40`
        }
        onClick={() => handleFilter("Youtube")}
      >
        Youtube
      </button>
      <button
        className={
          isSpotify
            ? `bg-white p-1 px-3 rounded-2xl`
            : `bg-zinc-500/20 p-1 px-3 rounded-2xl text-white transition-all duration-300 hover:bg-zinc-500/40`
        }
        onClick={() => handleFilter("Spotify")}
      >
        Spotify
      </button>
    </div>
  );
}

export default Filters;
