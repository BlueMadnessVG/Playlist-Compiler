import { motion } from "framer-motion";
import React from "react";

const Playlist: any[] = [
  {
    id: 1,
    title: "Ado god",
    imageURL:
      "https://a.storyblok.com/f/178900/960x540/b13931671a/ado.jpg/m/filters:quality(95)format(webp)",
    total: 6,
    from: "Spotify",
  },
  {
    id: 2,
    title: "Try hard",
    imageURL:
      "https://www.callofduty.com/content/dam/atvi/callofduty/blog/archives/feature/featured-Image10737600.jpg",
    total: 6,
    from: "YouTube",
  },
];

function PlayList() {
  let playlist = Playlist[0];
  return (
    <motion.div
      id="playlist-container"
      className=" relative transition-all duration-1000 flex-1 flex-col h-full rounded-lg  bg-zinc-900 overflow-x-hidden mr-2 font-abc"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <header className="flex flex-row gap-8 px-6 mt-12">
        <picture className=" aspect-square w-52 h-52 flex-none">
          <img
            src={playlist.imageURL}
            alt={`Playlist from ${playlist.from}`}
            className=" object-cover w-full h-full rounded-sm shadow-lg"
          />
        </picture>

        <div className="flex flex-col justify-between">
          <h2 className="flex flex-1 items-end text-sm font-light">Playlist</h2>
          <div>
            <h1 className=" text-7xl font-bold block text-white mt-5">
              {playlist.title}
            </h1>
          </div>

          <div className="flex-1 flex items-end">
            <div className="text-sm text-gray-300 font-normal flex flex-row">
              <span className=" font-bold text-white text-xs">
                Christian Armenta
              </span>
              <span className=" ml-1 text-xs">&bull; 50 songs, about 3 hr</span>
            </div>
          </div>
        </div>
      </header>

      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-zinc-900 from-65% via-zinc-900/80 -z-10" />
    </motion.div>
  );
}

export default PlayList;
