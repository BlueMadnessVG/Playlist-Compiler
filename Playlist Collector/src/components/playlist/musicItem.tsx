import React, { useEffect, useState } from "react";
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
  console.log(music);
  const { id } = useParams();
  const { setCurrentMusic } = usePlayerStore((state: any) => state);

  const handleClick = () => {
    setCurrentMusic({ playList: { id }, song: index, songs: [] });
  };

  return (
    <tr className="text-gray-300 text-sm font-light border-b border-gray-500/20 group cursor-default">
      <td className="px-3 py-2 flex gap-3 items-center group-hover:bg-zinc-800">
        <button
          className="flex place-content-center items-center absolute w-10 h-10 text-white bg-zinc-900/70 opacity-0 group-hover:opacity-100"
          onClick={handleClick}
        >
          <PlayIcon />
        </button>

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
        <h3 className=" max-w-96 truncate">
          {type == "youtube" ? music?.snippet.title : music?.track.name}
        </h3>
      </td>
      <td className="px-3 py-1 font-thin text-zinc-500 max-w-72 truncate group-hover:bg-zinc-800">
        <a
          onClick={() => {
            navigate(
              "/artist/" + type + "/" + music?.snippet.videoOwnerChannelId
            );
          }}
          className="cursor-pointer hover:text-white"
        >
          {type == "youtube"
            ? music?.snippet.videoOwnerChannelTitle.split("-")[0]
            : music?.track.artists[0].name}
        </a>
      </td>

      {type == "spotify" && (
        <>
          <td className="px-3 py-1 font-thin text-zinc-500 group-hover:bg-zinc-800 max-w-72 truncate">
            {music?.track.album.name}
          </td>
          <td className="px-3 py-1 font-thin text-zinc-500 group-hover:bg-zinc-800">
            {min + ":"} {sec < 10 ? `0${sec}` : sec}
          </td>
        </>
      )}
    </tr>
  );
}

export default MusicItem;
