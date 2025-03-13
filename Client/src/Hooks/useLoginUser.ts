import { useEffect, useState } from "react";
import { useYoutubeStore } from "../global";
import {
  fetchYoutubePlaylists,
  fetchYouTubeProfile,
} from "../services/Youtube";

type Data = {
  youtubeId: string | null;
  youtubeToken: boolean;
  youtubeProfileThumb: string | null;
  youtubePlaylist: any[];
} | null;

interface Params {
  data: Data;
  loading: boolean;
}

export const useLoginUser = (): Params => {
  const [loading, setLoading] = useState(true);

  const {
    youtubeId,
    youtubePlaylist,
    youtubeToken,
    youtubeProfileThumb,
    setYoutubeToken,
    setYoutubePlaylist,
    setYoutubeId,
    setYoutubeProfileThumb,
  } = useYoutubeStore((state: any) => state);

  useEffect(() => {
    setLoading(true);
    let controller = new AbortController();

    const StorageYoutubeToken = window.localStorage.getItem("YouTube_token");
    const hash = window.location.hash;
    window.location.hash = "";

    async function getYoutubeUser() {
      try {
        if (youtubeId != null) {
          setYoutubeProfileThumb(youtubeId.snippet.thumbnails.default.url);
          return;
        }

        const youtube = await fetchYouTubeProfile(controller.signal); // Pass the signal
        setYoutubeProfileThumb(youtube.items[0].snippet.thumbnails.default.url);
        setYoutubeId(youtube.items[0]);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching YouTube profile:", error);
        }
      }
    }

    async function getYoutubePlaylist() {
      try {
        if (youtubePlaylist.length > 0) return;

        const _youtubePlaylist = await fetchYoutubePlaylists(controller.signal); // Pass the signal
        setYoutubePlaylist(_youtubePlaylist);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching YouTube playlists:", error);
        }
      }
    }

    if (hash) {
      if (!StorageYoutubeToken && hash.split("&")[0].split("=")[1]) {
        const _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("YouTube_token", _token);
        setYoutubeToken(_token);
        getYoutubeUser();
        getYoutubePlaylist();
        setLoading(false);
      }
    } else if (StorageYoutubeToken) {
      setYoutubeToken(StorageYoutubeToken);
      getYoutubeUser();
      getYoutubePlaylist();
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, []);

  return {
    data: {
      youtubeId,
      youtubeToken,
      youtubeProfileThumb,
      youtubePlaylist,
    },
    loading,
  };
};