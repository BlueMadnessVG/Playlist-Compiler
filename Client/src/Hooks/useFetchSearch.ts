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
      const [artistsResult, musicResult, playlistResult] = await Promise.all([
        fetchSearch(search !== search_item ? search_item : search, maxResult, "channel"),
        fetchSearch(search !== search_item ? search_item : search, maxResult, "video"),
        fetchSearch(search !== search_item ? search_item : search, maxResult, "playlist"),
      ]);

      // Update state with the fetched results
      setArtistsSearch(artistsResult.items);
      setMusicSearch(musicResult.items);
      setPlaylistSearch(playlistResult.items);
    };

    getSearch();

    return () => {
      setSearch("");
      controller.abort;
    };
  }, [setSearch]);

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
