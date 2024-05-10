import { useEffect, useState } from "react";
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

function PageHeader() {
  const { youtubeToken, youtubeId, setYoutubeToken, setYoutubeId } =
    useYoutubeStore((state: any) => state);
  const { spotifyToken, setSpotifyToken, setSpotifyId } = useSpotifyStore(
    (state: any) => state
  );

  const [youtubePic, setYoutubePic] = useState();
  const [spotifyPic, setSpotifyPic] = useState();

  useEffect(() => {
    async function getYoutubeUser() {
      try {
        if (youtubeId) return;

        const youtube = await fetchYouTubeProfile();
        setYoutubePic(youtube.items[0].snippet.thumbnails.default.url);
        setYoutubeId(youtube.items[0].id);
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
        setSpotifyId(spotify.id);
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
    <div className="relative flex justify-end z-40">
      <div className="flex gap-2 mr-3">
        {!youtubeToken ? (
          <button
            className="rounded-xl flex items-center min-h-10 text-xs gap-2 px-2 border font-abc text-red-500 bg-zinc-700/80 border-red-500/50 hover:bg-zinc-700 hover:border-red-500"
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
              <picture className="h-10 w-10 flex-none">
                <img
                  src={youtubePic}
                  className=" object-cover w-full h-full rounded-full border border-red-500 group-hover:brightness-50"
                />
              </picture>
            </button>

            <div className="absolute right-2 bottom-6 translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-4 text-red-500 pointer-events-none">
              <img src="/Youtube.png" />
            </div>
          </Tooltip>
        )}
        {!spotifyToken ? (
          <button
            className="rounded-xl flex items-center text-xs gap-1 px-2 border font-abc text-green-500 bg-zinc-700/80 border-green-500/50 hover:bg-zinc-700 hover:border-green-500"
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
              <picture className="h-10 w-10 flex-none">
                <img
                  src={spotifyPic}
                  className=" object-cover w-full h-full rounded-full border border-green-500 group-hover:brightness-50"
                />
              </picture>
            </button>

            <div className="absolute right-2 bottom-6 translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-4 text-red-500 pointer-events-none">
              <img src="/Spotify.png" />
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
