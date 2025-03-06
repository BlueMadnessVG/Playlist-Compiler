import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  fetchYoutubePlaylists,
  fetchYouTubeProfile,
} from "../../services/Youtube/Youtube.service";
import { useYoutubeStore } from "../../global/youtube.store";
import Filters from "./Filters";
import PlaylistItemCard from "./card/playListItemCard";
import ProfileButton from "./ProfileButton";
import handleYoutubeLogin, {
  handleYoutubeLogout,
} from "../../utils/controllers/Youtube.manager";
import PageHeader from "../header/pageHeader";
import FrameMotionUtility from "../../utils/Motion/frameMotion.utility";

function Home() {
  const {
    youtubeId,
    youtubeToken,
    youtubeProfileThumb,
    youtubePlaylist,
    setYoutubeToken,
    setYoutubePlaylist,
    setYoutubeId,
    setYoutubeProfileThumb,
  } = useYoutubeStore((state: any) => state);

  //const { isAll, isYoutube } = useFiltersStore((state: any) => state);
  async function getYoutubePlaylist() {
    if (youtubePlaylist.length > 0) return;

    const _youtubePlaylist = await fetchYoutubePlaylists();
    setYoutubePlaylist(_youtubePlaylist);
  }

  async function getYoutubeUser() {
    if (youtubeId != null) {
      setYoutubeProfileThumb(youtubeId.snippet.thumbnails.default.url);
      return;
    }

    const youtube = await fetchYouTubeProfile();
    setYoutubeProfileThumb(youtube.items[0].snippet.thumbnails.default.url);
    setYoutubeId(youtube.items[0]);
  }

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
        getYoutubeUser();
      }
    } else if (StorageYoutubeToken) {
      setYoutubeToken(StorageYoutubeToken);
      getYoutubePlaylist();
      getYoutubeUser();
    }
  }, []);

  return (
    <motion.div
      id="playlist-container"
      className="relative transition-all duration-1000  bg-zinc-900 rounded-lg flex-1 m-2 ml-0 mt-0 overflow-y-auto"
    >
      <div className=" relative z-10 px-6 pt-2">
        <PageHeader showProfile={false} />
        {/* LOGIN TO PLAYLIST HEADER */}
        <section className="grid grid-cols-3 gap-8 mb-5 pt-4">
          <button
            onClick={!youtubeToken ? handleYoutubeLogin : handleYoutubeLogout}
          >
            <ProfileButton
              icon={"Youtube_Music_icon.png"}
              thumb={youtubeProfileThumb}
              style={"from-[#ff0000]/70 to-[#ff0000]/20"}
            >
              Youtube
            </ProfileButton>
          </button>

          <ProfileButton
            icon={"Spotify_icon.png"}
            thumb={youtubeProfileThumb}
            style={"from-[#3be477]/70 to-[#3be477]/20"}
          >
            Spotify
          </ProfileButton>
        </section>

        <Filters />
        <h1 className=" text-xl font-abc font-bold ml-2 pt-4">
          Your Playlists
        </h1>

        <div className="flex flex-col gap-2 font-abc">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 2xl:grid-cols-8 mt-1 gap-2">
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
