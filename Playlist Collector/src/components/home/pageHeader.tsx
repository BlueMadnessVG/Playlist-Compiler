import { useEffect, useRef, useState } from "react";
import ArrowLeftIcon from "../../assets/icons/arrowLeft";
import ArrowRightIcon from "../../assets/icons/arrowRight";
import {
  fetchYouTubeProfile,
  redirectToYouTubeAuth,
} from "../../services/YoutubeService";
import { useYoutubeStore } from "../../global/youtubeStore";
import { useSpotifyStore } from "../../global/spotifyStore";
import Tooltip from "../static/tooltip/tooltip";
import {
  fetchSpotifyProfile,
  redirectToSpotifyAuth,
} from "../../services/SpotifyService";
import YouTubeIcon from "../../assets/icons/youtube";

function PageHeader() {
  const { youtubeToken, setYoutubeToken } = useYoutubeStore(
    (state: any) => state
  );
  const { spotifyToken, setSpotifyToken } = useSpotifyStore(
    (state: any) => state
  );

  const [youtubePic, setYoutubePic] = useState();
  const [spotifyPic, setSpotifyPic] = useState();

  useEffect(() => {
    async function getYoutubeUser() {
      try {
        const youtube = await fetchYouTubeProfile();
        setYoutubePic(youtube.items[0].snippet.thumbnails.default.url);
      } catch (error) {
        console.log(error);
        setYoutubeToken("");
        window.localStorage.removeItem("YouTube_token");
      }
    }

    async function getSpotifyUser() {
      try {
        const spotify = await fetchSpotifyProfile();
        setSpotifyPic(spotify.images[0].url);
      } catch (error) {
        console.log(error);
        setSpotifyToken("");
        window.localStorage.removeItem("Spotify_token");
      }
    }

    if (youtubeToken) getYoutubeUser();
    if (spotifyToken) getSpotifyUser();
  }, [youtubeToken, spotifyToken]);

  function handleYoutubeLogin() {
    redirectToYouTubeAuth();
  }

  function handleSpotifyLogin() {
    redirectToSpotifyAuth();
  }

  function handleYoutubeLogout() {
    setYoutubeToken("");
    window.localStorage.removeItem("YouTube_token");
  }

  function handleSpotifyLogout() {
    setSpotifyToken("");
    window.localStorage.removeItem("Spotify_token");
  }

  return (
    <div className="relative flex z-10 px-6 pt-4 justify-between">
      <div className="flex flex-row gap-2 h-8 w-8 mt-2">
        <button className="p-1 bg-slate-800/70 rounded-full ">
          <ArrowLeftIcon />
        </button>
        <button className="p-1 bg-slate-800/70 rounded-full ">
          <ArrowRightIcon />
        </button>
      </div>

      <div className="flex flex-row gap-4 mr-3">
        {!youtubeToken ? (
          <button
            className="rounded-xl flex items-center text-xs gap-2 px-2 border font-abc text-red-500 bg-zinc-700/80 border-red-500/50 hover:bg-zinc-700 hover:border-red-500"
            onClick={handleYoutubeLogin}
          >
            <img src="/Youtube.png" />
            YouTube
          </button>
        ) : (
          <Tooltip tooltip="Youtube profile">
            <button
              className="flex group-hover:scale-110 transition group"
              onClick={handleYoutubeLogout}
            >
              <picture className="h-12 w-12 flex-none">
                <img
                  src={youtubePic}
                  className=" object-cover w-full h-full rounded-full border border-red-500 group-hover:brightness-50"
                />
              </picture>
            </button>

            <div className="absolute right-3 bottom-7 translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-4 text-red-500 pointer-events-none">
              <img src="/Youtube.png" />
            </div>
          </Tooltip>
        )}
        {!spotifyToken ? (
          <button
            className="rounded-xl flex items-center text-xs gap-2 px-2 border font-abc text-green-500 bg-zinc-700/80 border-green-500/50 hover:bg-zinc-700 hover:border-green-500"
            onClick={handleSpotifyLogin}
          >
            <img src="/Spotify.png" />
            Spotify
          </button>
        ) : (
          <Tooltip tooltip="Spotify profile">
            <button
              className="flex hover:scale-110 transition group"
              onClick={handleSpotifyLogout}
            >
              <picture className="h-12 w-12 flex-none">
                <img
                  src={spotifyPic}
                  className=" object-cover w-full h-full rounded-full border border-green-500 group-hover:brightness-50"
                />
              </picture>
            </button>

            <div className="absolute right-3 bottom-7 translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-4 text-red-500 pointer-events-none">
              <img src="/Spotify.png" />
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
