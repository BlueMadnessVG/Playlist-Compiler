import { useEffect, useState } from "react";
import { useSearchStore } from "../global";
import { fetchSearch } from "../services/Youtube";

interface Params {
  data: {
    search: string | null;
    artistsSearch: any[] | null;
    musicSearch: any[] | null;
    playlistSearch: any[] | null;
  };
  loading: boolean;
}

const maxResult = 15;

export const useFetchSearch = (search_item: string): Params => {
  const [loading, setLoading] = useState(true);
  let controller = new AbortController();

  const {
    search,
    artistsSearch,
    musicSearch,
    playlistSearch,
    setSearch,
    setArtistsSearch,
    setMusicSearch,
    setPlaylistSearch,
  } = useSearchStore((state: any) => state);

  useEffect(() => {
    setLoading(true);

    const getSearch = async () => {
      try {
        const [artistsResult, musicResult, playlistResult] = await Promise.all([
          fetchSearch(
            search !== search_item ? search_item : search,
            maxResult,
            "channel",
            undefined,
            controller.signal // Pass the signal
          ),
          fetchSearch(
            search !== search_item ? search_item : search,
            maxResult,
            "video",
            undefined,
            controller.signal // Pass the signal
          ),
          fetchSearch(
            search !== search_item ? search_item : search,
            maxResult,
            "playlist",
            undefined,
            controller.signal // Pass the signal
          ),
        ]);

        // Update state with the fetched results
        setArtistsSearch(artistsResult.items);
        setMusicSearch(musicResult.items);
        setPlaylistSearch(playlistResult.items);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching search results:", error);
        }
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    getSearch();

    return () => {
      setSearch("");
      controller.abort();
    };
  }, [search_item, search, setSearch, setArtistsSearch, setMusicSearch, setPlaylistSearch]);

  return {
    data: {
      search,
      artistsSearch,
      musicSearch,
      playlistSearch,
    },
    loading,
  };
};
