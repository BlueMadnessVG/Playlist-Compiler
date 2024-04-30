import React, { useEffect, useState } from "react";

function MusicItem({ music, type }: { music: any; type: any }) {
  let min = 0;
  let sec = 0;
  if (type != "youtube") {
    min = Math.floor((music?.track.duration_ms / (1000 * 60)) << 0);
    sec = Math.floor((music?.track.duration_ms / 1000) % 60);
  }

  return (
    <tr className="text-gray-300 text-sm font-light border-b border-gray-500/20">
      <td className="px-3 py-2 flex gap-3 items-center">
        <picture className="">
          <img
            src={
              type == "youtube"
                ? music?.snippet.thumbnails.default.url
                : music?.track.album.images[0].url
            }
            alt={`Playlist from ${
              type == "youtube" ? music?.snippet.title : music?.track.name
            }`}
            className="w-10 h-10 rounded-md"
          />
        </picture>
        <h3>{type == "youtube" ? music?.snippet.title : music?.track.name}</h3>
      </td>
      <td className="px-3 py-1 font-thin text-zinc-500">
        {type == "youtube"
          ? music?.snippet.videoOwnerChannelTitle.split("-")[0]
          : music?.track.album.name}
      </td>

      {type == "spotify" && (
        <>
          <td className="px-3 py-1 font-thin text-zinc-500 truncate">
            {music?.track.artists[0].name}
          </td>
          <td className="px-3 py-1 font-thin text-zinc-500">
            {min + ":"} {sec < 10 ? `0${sec}` : sec}
          </td>
        </>
      )}
    </tr>
  );
}

export default MusicItem;
