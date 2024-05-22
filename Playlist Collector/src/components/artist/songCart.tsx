import React from "react";

function SongCart({ song }: { song: any }) {
  const date = new Date(song?.snippet.publishedAt);
  const year = date.getUTCFullYear();

  return (
    <div className="group relative">
      <div className="flex flex-col hover:bg-zinc-800/80 p-2 rounded-md w-52">
        <picture className="aspect-square w-48 h-48 flex-none">
          <img
            src={song?.snippet.thumbnails.high.url}
            alt={`Song from ${song?.snippet.channelTitle}`}
            className=" object-none w-full h-full shadow-lg rounded-md "
          />
        </picture>

        <div className="flex flex-auto flex-col pt-2 pl-1 gap-2">
          <h4 className="truncate"> {song?.snippet.title} </h4>
          <span className="text-xs text-gray-500"> {year} </span>
        </div>
      </div>
    </div>
  );
}

export default SongCart;
