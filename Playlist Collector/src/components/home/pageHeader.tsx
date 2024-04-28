import { useEffect, useRef, useState } from "react";
import ArrowLeftIcon from "../../assets/icons/arrowLeft";
import ArrowRightIcon from "../../assets/icons/arrowRight";
import {
  fetchYouTubeProfile,
  redirectToYouTubeAuth,
} from "../../services/YoutubeService";
import { useYoutubeStore } from "../../global/youtubeStore";
import Tooltip from "../static/tooltip/tooltip";

function PageHeader() {
  const { youtubeToken, setYoutubeToken } = useYoutubeStore(
    (state: any) => state
  );
  const [pic, setPic] = useState();

  useEffect(() => {
    async function getUser() {
      try {
        const youtube = await fetchYouTubeProfile();
        setPic(youtube.items[0].snippet.thumbnails.default.url);
        //setYoutubePic(youtube.items[0].snippet.thumbnails.default.url);
        //setImage(youtube.items[0].snippet.thumbnails.default.url);
      } catch (error) {
        console.log(error);
      }
    }

    if (youtubeToken) getUser();
  }, [youtubeToken]);

  function handleYoutubeLogin() {
    redirectToYouTubeAuth();
  }

  function handleYoutubeLogout() {
    setYoutubeToken("");
    window.localStorage.removeItem("YouTube_token");
  }

  return (
    <div className="relative flex z-10 px-6 pt-4 justify-between ">
      <div className="flex flex-row gap-2 h-8 w-8 mt-2">
        <button className="p-1 bg-slate-800/70 rounded-full ">
          <ArrowLeftIcon />
        </button>
        <button className="p-1 bg-slate-800/70 rounded-full ">
          <ArrowRightIcon />
        </button>
      </div>

      <div className="flex flex-row gap-2">
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
              className="flex hover:scale-110 transition"
              onClick={handleYoutubeLogout}
            >
              <picture className="h-12 w-12 flex-none">
                <img
                  src={pic}
                  className=" object-cover w-full h-full rounded-full"
                />
              </picture>
            </button>
          </Tooltip>
        )}
        <button className="rounded-xl flex items-center text-xs gap-2 px-2 border font-abc text-green-500 bg-zinc-700/80 border-green-500/50 hover:bg-zinc-700 hover:border-green-500">
          <img src="/Spotify.png" />
          Spotify
        </button>
      </div>
    </div>
  );
}

export default PageHeader;
