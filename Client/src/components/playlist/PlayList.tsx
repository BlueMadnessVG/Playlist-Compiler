import styles from "../../App.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchYoutubePlaylistsItems } from "../../services/Youtube/Youtube.service";
import MusicItem from "./MusicItem";
import PageHeader from "../header/pageHeader";
import {
  useArtistStore,
  usePlaylistStore,
  useYoutubeStore,
} from "../../global";
import PlaylistInfo from "./PlaylistInfo";
import FrameMotionUtility from "../../utils/Motion/frameMotion.utility";

function PlayList() {
  const { type, from, id } = useParams();
  const { youtubePlaylist } = useYoutubeStore((state: any) => state);
  const { artistPlaylist } = useArtistStore((state: any) => state);
  const { playlistId, playlistItems, setPlaylistId, setPlaylistItems } =
    usePlaylistStore((state: any) => state);
  const [playlistInfo, setPlaylistInfo] = useState<any>();
  const [items, setItems] = useState<any>();

  const getItems =  async () => {
    const result = await fetchYoutubePlaylistsItems(id);

    setItems(result);
    setPlaylistItems(result);
  }

  useEffect(() => {
    let item;
    if (from === "user") {
      item = youtubePlaylist.filter((val: any) => val.playlist_id === id)[0];
    } else {
      item = artistPlaylist.filter((val: any) => val.playlist_id === id)[0];
    }

    setPlaylistId(id);
    setPlaylistInfo(item);

    if (playlistId === id && playlistItems.length > 0) {
      setItems(playlistItems);
    } else {
      console.log(playlistItems);
      getItems();
    }
  }, []);

  return (
    <div className=" relative transition-all duration-1000 flex-1 flex-row h-full rounded-lg  bg-zinc-900 overflow-x-hidden  overflow-y-hidden mr-2 font-abc">
      <header
        className={`flex flex-col sticky top-0 px-6 pt-6 bg-gradient-to-t z-20  `}
      >
        <PageHeader showProfile={true} />
      </header>

      <main id={styles.playlistContainer} className=" h-[93%]">
        <PlaylistInfo songs={items?.length} playlistInfo={playlistInfo} />

        <section className="[grid-area:main]  p-4 mb-8 w- h-full overflow-x-hidden">
          <div className="flex flex-col text-left divide-gray-500/50">
            {items?.map((music: any, index: number) => {
              return (
                <MusicItem
                  key={index}
                  music={music}
                  type={type}
                  index={index}
                />
              );
            })}
          </div>
        </section>
      </main>

      <FrameMotionUtility />
    </div>
  );
}

export default PlayList;
