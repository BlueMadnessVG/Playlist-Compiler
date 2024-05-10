import React, { useEffect, useState } from "react";
import PageHeader from "../home/pageHeader";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  fetchYoutubeChanel,
  fetchYoutubeChanelPlaylists,
  fetchYoutubeChanelVideos,
} from "../../services/YoutubeService";
import PopularSong from "./popularSong";

function ArtistSearch() {
  const { type, id } = useParams();
  const [artist, setArtist] = useState<any>();
  const [artistSongs, setArtistSongs] = useState<any>();

  const fetchVideos = async () => {
    try {
      const response = await fetchYoutubeChanelVideos(id);

      setArtistSongs(response.items);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await fetchYoutubeChanelPlaylists(id);

      //console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchChanel = async () => {
      try {
        const response = await fetchYoutubeChanel(id);
        setArtist(response?.items[0]);
        fetchVideos();
        fetchPlaylists();
      } catch (error) {
        console.log(error);
      }
    };

    if (id) fetchChanel();
  }, []);

  return (
    artist != undefined && (
      <motion.div
        id="playlist-container"
        className=" relative transition-all duration-1000 flex-1 flex-col h-full rounded-lg  bg-zinc-900 overflow-x-hidden mr-2 font-abc"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
      >
        <div className="flex">
          <picture className="aspect-square w-full h-96 flex-none absolute inset-0">
            <img
              src={type == "youtube" && artist?.snippet.thumbnails.high.url}
              alt={`Playlist from ${
                type == "youtube" && artist?.snippet.channelTitle
              }`}
              className=" object-cover w-full h-full  shadow-lg"
            />
          </picture>
          <div className="absolute w-full h-96 bg-gradient-to-t from-zinc-900 from-[5%]"></div>
        </div>

        <header
          className="flex flex-col top-0 px-6 pt-6 pb-6 justify-between h-96"
          style={{ backgroundImage: `${artist?.snippet.thumbnails.high.url}` }}
        >
          <PageHeader />

          <h1 className="z-10 text-4xl">
            {artist?.snippet.title.split("-")[0]}
          </h1>
        </header>

        <main className="px-6">
          <h2> Popular Songs </h2>
          <table className="table-auto text-left min-w-full divide-y-2 divide-gray-500/50 ">
            <tbody>
              {artistSongs &&
                artistSongs?.slice(0, 5).map((song: any, index: number) => {
                  return <PopularSong key={index} song={song} />;
                })}
            </tbody>
          </table>
        </main>
      </motion.div>
    )
  );
}

export default ArtistSearch;
