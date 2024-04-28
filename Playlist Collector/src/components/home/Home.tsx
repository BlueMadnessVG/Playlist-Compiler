import React, { Suspense, useEffect, useState } from "react";
import PlayListItemCard from "./playListItemCard";
import Greetings from "./Greetings";
import { motion } from "framer-motion";
import PageHeader from "./pageHeader";
import {
  fetchYouTubeProfile,
  fetchYoutubePlaylists,
  setYouTubeClientToken,
} from "../../services/YoutubeService";
import { useYoutubeStore } from "../../global/youtubeStore";

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

function Home() {
  const { youtubeToken, youtubePlaylist, setYoutubeToken, setYoutubePlaylist } =
    useYoutubeStore((state: any) => state);

  useEffect(() => {
    const StorageYoutubeToken = window.localStorage.getItem("YouTube_token");
    const StorageSpotifyToken = window.localStorage.getItem("Spotify_token");
    const hash = window.location.hash;
    window.location.hash = "";

    if (!StorageYoutubeToken && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("YouTube_token", _token);
      setYoutubeToken(_token);
      //setSpotifyClientToken(_token);
      setYouTubeClientToken(_token);
    } else if (StorageYoutubeToken) {
      setYoutubeToken(StorageYoutubeToken);
      //setSpotifyClientToken(StorageToken);
      setYouTubeClientToken(StorageYoutubeToken);
    }
  }, []);

  useEffect(() => {
    async function getYoutubePlaylist() {
      try {
        const _youtubePlaylist = await fetchYoutubePlaylists();
        setYoutubePlaylist(_youtubePlaylist.items);
      } catch (error) {
        console.log(error);
      }
    }

    if (youtubeToken) getYoutubePlaylist();
  }, [youtubeToken]);

  return (
    <motion.div
      id="playlist-container"
      className=" relative transition-all duration-1000 bg-violet-800 rounded-lg flex-1 m-2 ml-0 mt-0"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <PageHeader />

      <div className=" relative z-10 px-6 pt-6">
        <Greetings />

        <div className="flex flex-wrap mt-4 gap-4">
          {youtubePlaylist.map((playlist: any, index: number) => {
            return (
              <PlayListItemCard
                key={index}
                playlist={playlist}
                type="youtube"
              />
            );
          })}
        </div>
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-zinc-900 from-65% via-zinc-900/80 " />
    </motion.div>
  );
}

export default Home;
