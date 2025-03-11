import { useEffect, useState } from "react";
import { useArtistStore, usePlaylistStore, useYoutubeStore } from "../global";
import { fetchYoutubePlaylistsItems } from "../services/Youtube";
import { MusicModel } from "../models";

type Data<T> = T | null;

interface Params {
  data: MusicModel[] | null;
  playlistInfo: any;
  loading: boolean;
}

export const useFetchPlaylist = (from: string, id: string): Params => {
  const [data, setData] = useState<Data<MusicModel[]>>(null);
  const [playlistInfo, setPlaylistInfo] = useState<any>();
  const [loading, setLoading] = useState(true);

  const { youtubePlaylist } = useYoutubeStore((state: any) => state);
  const { artistPlaylist } = useArtistStore((state: any) => state);
  const { playlistId, playlistItems, setPlaylistId, setPlaylistItems } =
    usePlaylistStore((state: any) => state);

  useEffect(() => {
    setLoading(true);
    let controller = new AbortController();

    setPlaylistInfo(
        from === "user"
          ? youtubePlaylist.filter((val: any) => val.playlist_id === id)[0]
          : artistPlaylist.filter((val: any) => val.playlist_id === id)[0]
      );

    const getData = async () => {
      const result: MusicModel[] = await fetchYoutubePlaylistsItems(id);
      setData(result);
      setPlaylistId(id);
      setPlaylistItems(result);
      setLoading(false);
    };

    if (!(playlistId === id && playlistItems?.length > 0)) getData();
    else {
      setData(playlistItems);
      setLoading(false);
    }

    return () => {
      controller.abort;
    };
  }, []);

  return { data, playlistInfo, loading };
};
