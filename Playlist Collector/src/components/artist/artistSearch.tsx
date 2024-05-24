import React, { useEffect, useState } from "react";
import PageHeader from "../home/pageHeader";
import { FlatTree, motion } from "framer-motion";
import { json, useNavigate, useParams } from "react-router-dom";
import {
  fetchYoutubeChanel,
  fetchYoutubeChanelPlaylists,
  fetchYoutubeChannelVideos,
} from "../../services/YoutubeService";
import PopularSong from "./popularSong";
import SongCart from "./songCart";
import PlaylistCart from "./playlistCart";
import { useArtistStore } from "../../global/artistStore";
import styles from "../../App.module.css";
import NextIcon from "../../assets/icons/next";
import ArrowLeftIcon from "../../assets/icons/arrowLeft";
import ArrowRightIcon from "../../assets/icons/arrowRight";
import { useYoutubeStore } from "../../global/youtubeStore";

function ArtistSearch() {
  const { type, id } = useParams();

  const { setYoutubePlaylist } = useYoutubeStore((state: any) => state);

  const {
    artistInfo,
    artistSongs,
    artistPlaylist,
    setArtistInfo,
    setArtistSongs,
    setArtistPlaylist,
  } = useArtistStore((state: any) => state);

  const [curr, setCurr] = useState<number>(0);

  const [verifier, setVerifier] = useState<boolean>(true);
  const [showPublication, setShowPublication] = useState<boolean>(false);

  const handleClick = () => {
    setShowPublication(!showPublication);
  };

  const handlePlaylistPrev = () => {
    if (curr <= 0) return;
    setCurr(curr - 1);
  };

  const handlePlaylistNext = () => {
    if (curr + 5 >= artistPlaylist.length) return;
    setCurr(curr + 1);
  };

  const fetchVideos = async () => {
    try {
      if (verifier || !artistSongs) {
        const response = await fetchYoutubeChannelVideos(id);
        setArtistSongs(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      if (verifier || !artistPlaylist) {
        const response = await fetchYoutubeChanelPlaylists(id);
        setArtistPlaylist(response);
        setYoutubePlaylist(response);
      } else {
        console.log(artistPlaylist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchChanel = async () => {
      try {
        if (!artistInfo || (artistInfo && artistInfo?.id != id)) {
          const response = await fetchYoutubeChanel(id);
          setArtistInfo(response?.items[0]);
        } else {
          setVerifier(false);
        }

        fetchVideos();
        fetchPlaylists();
      } catch (error) {
        console.log(error);
      }
    };

    if (id) fetchChanel();
  }, []);

  return (
    artistInfo != undefined && (
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
              src={type == "youtube" && artistInfo?.snippet.thumbnails.high.url}
              alt={`Playlist from ${
                type == "youtube" && artistInfo?.snippet.channelTitle
              }`}
              className=" object-cover w-full h-full  shadow-lg"
            />
          </picture>
          <div className="absolute w-full h-96 bg-gradient-to-t from-zinc-900 from-[5%]"></div>
        </div>

        <header
          className="flex flex-col top-0 px-6 pt-6 pb-6 justify-between h-96"
          style={{
            backgroundImage: `${artistInfo?.snippet.thumbnails.high.url}`,
          }}
        >
          <PageHeader />

          <h1 className="z-10 text-4xl">
            {artistInfo?.snippet.title.split("-")[0]}
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

          {artistPlaylist?.length > 0 && (
            <div className="pt-10">
              <div className="flex justify-between">
                <h2> Playlists </h2>

                <div className="flex gap-2">
                  <button
                    className=" border border-zinc-600 rounded-full p-2 hover:bg-zinc-600 transition-all duration-200"
                    onClick={handlePlaylistPrev}
                  >
                    <ArrowLeftIcon />
                  </button>
                  <button
                    className="text-xs border border-zinc-600 rounded-full p-2 hover:bg-zinc-600 transition-all duration-200"
                    onClick={handlePlaylistNext}
                  >
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>

              <div
                className="flex flex-shrink-0 gap-1 py-2 transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${0.19 * curr * 100}%)` }}
              >
                {artistPlaylist?.map((playlist: any, index: number) => {
                  return <PlaylistCart key={index} playlist={playlist} />;
                })}
              </div>
            </div>
          )}

          <div className="pt-10">
            <div className="flex justify-between">
              <h2>Publications</h2>
              <button
                className=" text-xs border border-zinc-600 rounded-xl p-2 hover:bg-zinc-600 transition-all duration-200"
                onClick={handleClick}
              >
                {!showPublication ? "Show All" : "Hide"}
              </button>
            </div>

            <div className="flex flex-wrap gap-1 py-2">
              {artistSongs?.slice(-5).map((song: any, index: number) => {
                return <SongCart key={index} song={song} />;
              })}
              <div className={showPublication ? "flex flex-wrap" : "hidden"}>
                {artistSongs?.slice(0, -5).map((song: any, index: number) => {
                  return <SongCart key={index} song={song} />;
                })}
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    )
  );
}

export default ArtistSearch;
