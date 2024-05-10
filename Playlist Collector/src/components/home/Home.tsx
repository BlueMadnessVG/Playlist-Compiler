import { useEffect } from "react";
import PlayListItemCard from "./playListItemCard";
import { motion } from "framer-motion";
import PageHeader from "./pageHeader";
import {
  fetchYoutubePlaylists,
  setYouTubeClientToken,
} from "../../services/YoutubeService";
import { useYoutubeStore } from "../../global/youtubeStore";
import { useSpotifyStore } from "../../global/spotifyStore";
import {
  fetchSpotifyUserPlaylist,
  setSpotifyClientToken,
} from "../../services/SpotifyService";
import Filters from "./Filters";
import { useFiltersStore } from "../../global/filtersStore";

function Home() {
  const { youtubeToken, youtubePlaylist, setYoutubeToken, setYoutubePlaylist } =
    useYoutubeStore((state: any) => state);

  const { spotifyToken, spotifyPlaylist, setSpotifyToken, setSpotifyPlaylist } =
    useSpotifyStore((state: any) => state);
  const { isAll, isYoutube, isSpotify } = useFiltersStore(
    (state: any) => state
  );

  useEffect(() => {
    const StorageYoutubeToken = window.localStorage.getItem("YouTube_token");
    const StorageSpotifyToken = window.localStorage.getItem("Spotify_token");
    const hash = window.location.hash;
    //window.location.hash = "";

    if (hash) {
      if (
        !StorageYoutubeToken &&
        hash.split("&")[0].split("=")[1].length == 216
      ) {
        const _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("YouTube_token", _token);
        setYoutubeToken(_token);
        setYouTubeClientToken(_token);
        getYoutubePlaylist();
      } else if (
        !StorageSpotifyToken &&
        hash.split("&")[0].split("=")[1].length >= 238
      ) {
        const _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("Spotify_token", _token);
        setSpotifyToken(_token);
        setSpotifyClientToken(_token);
      }
    } else if (StorageYoutubeToken || StorageSpotifyToken) {
      if (StorageYoutubeToken) {
        setYoutubeToken(StorageYoutubeToken);
        setYouTubeClientToken(StorageYoutubeToken);
      }
      if (StorageSpotifyToken) {
        setSpotifyToken(StorageSpotifyToken);
        setSpotifyClientToken(StorageSpotifyToken);
      }
    }
  }, []);

  async function getYoutubePlaylist() {
    try {
      const _youtubePlaylist = await fetchYoutubePlaylists();
      setYoutubePlaylist(_youtubePlaylist.items);
      console.log(_youtubePlaylist);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSpotifyPlaylist() {
    try {
      const _spotifyPlaylist = await fetchSpotifyUserPlaylist();
      setSpotifyPlaylist(_spotifyPlaylist.items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isAll) {
      if (youtubeToken) getYoutubePlaylist();
      if (spotifyToken) getSpotifyPlaylist();
    } else if (isYoutube) {
      if (youtubeToken) getYoutubePlaylist();
      setSpotifyPlaylist([]);
    } else if (isSpotify) {
      if (spotifyToken) getSpotifyPlaylist();
      setYoutubePlaylist([]);
    }
  }, [isAll, isYoutube, isSpotify, youtubeToken, spotifyToken]);

  return (
    <motion.div
      id="playlist-container"
      className=" relative transition-all duration-1000  bg-zinc-900 rounded-lg flex-1 m-2 ml-0 mt-0 overflow-y-auto"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <header className="pt-6 px-6">
        <PageHeader />
      </header>

      <div className=" relative z-10 px-6 pt-6 ">
        <Filters />
        <h1 className=" text-xl font-abc font-bold ml-2 pt-4">
          Your Playlists
        </h1>

        <div className="flex flex-col gap-2 font-abc">
          <div className="flex flex-wrap mt-1 gap-2">
            {youtubePlaylist.map((playlist: any, index: number) => {
              return (
                <PlayListItemCard
                  key={index}
                  playlist={playlist}
                  type="youtube"
                />
              );
            })}
            {spotifyPlaylist.map((playlist: any, index: number) => {
              return (
                <PlayListItemCard
                  key={index}
                  playlist={playlist}
                  type="spotify"
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
