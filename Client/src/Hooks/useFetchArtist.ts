import { useEffect, useState } from "react";
import { useArtistStore } from "../global";
import { ArtistInfoModel, MusicModel, PlaylistModel } from "../models";
import {
  fetchYoutubeChannelVideos,
  fetchYoutubeChanelPlaylists,
  fetchYoutubeChanel,
} from "../services/Youtube";
import { useParams } from "react-router-dom";
import { saveLocalStorage } from "../utils/localstorage/localStorage.utility";

type Data = {
  artistInfo: ArtistInfoModel | null;
  artistSongs: MusicModel[] | null;
  artistPlaylist: PlaylistModel[] | null;
  songsPager: any | null
};

interface Params {
  data: Data;
  loadMoreVideos: () => Promise<void>;
  loading: boolean;
}

const resultPerPage = 14;

export const useFetchArtist = (): Params => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  let controller = new AbortController();

  const {
    artistInfo,
    artistSongs,
    songsPager,
    artistPlaylist,
    setArtistInfo,
    setArtistSongs,
    setSongsPager,
    updateArtistSongs,
    setArtistPlaylist,
  } = useArtistStore((state: any) => state);

  const [verifier, setVerifier] = useState<boolean>(true);

  const fetchVideos = async () => {
    try {
      if (verifier || !artistSongs) {
        const response = await fetchYoutubeChannelVideos(id, resultPerPage, controller.signal);
        setSongsPager(response.pageInfo);
        setArtistSongs(response.items);
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error fetching videos:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMoreVideos = async () => {
    try {
      if (songsPager && songsPager?.nextPageToken) {
        const response = await fetchYoutubeChannelVideos(
          id,
          resultPerPage,
          controller.signal,
          songsPager?.nextPageToken
        );
        setSongsPager(response.pageInfo);
        updateArtistSongs(response.items);
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error loading more videos:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaylists = async () => {
    try {
      if (verifier || !artistPlaylist) {
        const response = await fetchYoutubeChanelPlaylists(id, controller.signal);
        setArtistPlaylist(response);
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error fetching playlists:", error);
      }
    } finally {
      setLoading(false); 
    }
  };

  const fetchChanel = async () => {
    try {
      if (!artistInfo || (artistInfo && artistInfo?.id !== id)) {
        const response = await fetchYoutubeChanel(id, controller.signal);
        setArtistInfo(response[0]);
      } else {
        setVerifier(false);
      }

      await Promise.all([fetchVideos(), fetchPlaylists()]); 
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error fetching channel data:", error);
      }
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    saveLocalStorage("artist", { id: id }, 5);
    if (id) fetchChanel();

  }, [id]);

  return {
    data: {
      artistInfo,
      artistSongs,
      artistPlaylist,
      songsPager,
    },
    loadMoreVideos: loadMoreVideos,
    loading, 
  };
};
