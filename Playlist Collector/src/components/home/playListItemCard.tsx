import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import CardPlayButton from "./cardPlayButton";

function PlaylistItemCard({ playlist }: { playlist: any }) {
  const navigate = useNavigate();
  return (
    <article className=" group relative">
      <div className="absolute right-4 bottom-20 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
        <CardPlayButton id={playlist.id} />
      </div>

      <a
        onClick={() => {
          navigate("/playlist/" + playlist.id);
        }}
        className="playlist-item transition-all duration-300 overflow-hidden p-2 pb-4 rounded-md flex flex-col relative gap-2 bg-zing-500/30 w-48 hover:bg-zinc-700/30"
      >
        <picture className="aspect-square w-full h-auto flex-none  ">
          <img
            src={playlist.imageURL}
            alt={`Playlist from ${playlist.from}`}
            className=" object-cover w-full h-full rounded-lg shadow-inner"
          />
        </picture>

        <div className="flex flex-auto flex-col font-abc px-3 ">
          <h4 className=" text-sm"> {playlist.title} </h4>
          <span className="text-xs text-gray-400 pt-1">
            {playlist.from} &bull; {playlist.total} songs
          </span>
        </div>
      </a>
    </article>
  );
}

export default PlaylistItemCard;
