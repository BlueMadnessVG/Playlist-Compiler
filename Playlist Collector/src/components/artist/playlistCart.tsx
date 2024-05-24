import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function PlaylistCart({ playlist }: { playlist: any }) {
  const navigate = useNavigate();
  const { type } = useParams();

  const date = new Date(playlist?.created_date);
  const year = date.getUTCFullYear();
  return (
    <button
      className="group relative text-left"
      onClick={() => {
        navigate("/playlist/" + type + "/" + playlist.playlist_id);
      }}
    >
      <div className="flex flex-col hover:bg-zinc-800/80 p-2 rounded-md w-52">
        <picture className="aspect-square w-48 h-48 flex-none">
          <img
            src={playlist?.thumbnails.high}
            alt={`Song from ${playlist?.creator}`}
            className=" object-none w-full h-full shadow-lg rounded-md "
          />
        </picture>

        <div className="flex flex-auto flex-col pt-2 pl-1 gap-2">
          <h4 className="truncate"> {playlist?.title} </h4>
          <span className="text-xs text-gray-500"> {year} </span>
        </div>
      </div>
    </button>
  );
}

export default PlaylistCart;
