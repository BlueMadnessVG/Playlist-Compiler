import { useEffect } from "react";
import { motion, useIsPresent } from "framer-motion";
import PageHeader from "./pageHeader";
import {
  fetchYoutubeChanelRecommendation,
  fetchYoutubePlaylists,
  refreshToken,
} from "../../services/Youtube/Youtube.service";
import { useYoutubeStore } from "../../global/youtube.store";
import Filters from "./Filters";
import { useFiltersStore } from "../../global/filters.store";
import PlaylistItemCard from "./card/playListItemCard";
import FrameMotionUtility from "../../utils/frameMotion.utility";

function Home() {
  const { youtubeToken, youtubePlaylist, setYoutubeToken, setYoutubePlaylist } =
    useYoutubeStore((state: any) => state);

  const { isAll, isYoutube } = useFiltersStore((state: any) => state);

  useEffect(() => {
    const StorageYoutubeToken = window.localStorage.getItem("YouTube_token");
    const hash = window.location.hash;
    window.location.hash = "";

    if (hash) {
      if (!StorageYoutubeToken && hash.split("&")[0].split("=")[1]) {
        const _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("YouTube_token", _token);
        setYoutubeToken(_token);
        getYoutubePlaylist();
      }
    } else if (StorageYoutubeToken) {
      setYoutubeToken(StorageYoutubeToken);
    } else {
      getYoutubeRecommendation();
    }
  }, []);

  async function getYoutubePlaylist() {
    if (youtubePlaylist.length > 0) return;

    const _youtubePlaylist = await fetchYoutubePlaylists();
    setYoutubePlaylist(_youtubePlaylist);
  }

  async function getYoutubeRecommendation() {
    const _youtubePlaylist = await fetchYoutubeChanelRecommendation();
    console.log(_youtubePlaylist);
  }

  useEffect(() => {
    if (isAll) {
      if (youtubeToken) getYoutubePlaylist();
    }
  }, [isAll, isYoutube, youtubeToken]);

  return (
    <motion.div
      id="playlist-container"
      className=" relative transition-all duration-1000  bg-zinc-900 rounded-lg flex-1 m-2 ml-0 mt-0 overflow-y-auto"
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
          <div className="grid grid-cols-6 mt-1 gap-2">
            {youtubePlaylist.map((playlist: any, index: number) => {
              return (
                <PlaylistItemCard
                  key={index}
                  playlist={playlist}
                  type="youtube"
                />
              );
            })}
          </div>
        </div>
      </div>

      <FrameMotionUtility />
    </motion.div>
  );
}

export default Home;
