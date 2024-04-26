import React, { Suspense } from "react";
import PlayListItemCard from "./playListItemCard";
import Greetings from "./Greetings";

const playlist: any[] = [
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

import { motion } from "framer-motion";
import PageHeader from "./pageHeader";

function Home() {
  return (
    <motion.div
      id="playlist-container"
      className=" relative transition-all duration-1000 bg-green-600 rounded-lg flex-1 m-2 ml-0 mt-0"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <PageHeader />

      <div className=" relative z-10 px-6 pt-12">
        <Greetings />

        <div className="flex flex-wrap mt-6 gap-4">
          {playlist.map((playlist: any, index) => {
            return <PlayListItemCard key={index} playlist={playlist} />;
          })}
        </div>
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-zinc-900 from-65% via-zinc-900/80 " />
    </motion.div>
  );
}

export default Home;
