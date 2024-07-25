import styles from "../../App.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchYoutubePlaylistsItems } from "../../services/Youtube/Youtube.service";
import MusicItem from "./musicItem";
import { fetchSpotifyPlaylistItems } from "../../services/Spotify/Spotify.service";
import PageHeader from "../home/pageHeader";
import FrameMotion from "../../utils/Page utils/frameMotion.utility";
import { usePlaylistStore, useYoutubeStore } from "../../global";
import PlayButton from "../../utils/Page utils/PlayButton.utility";

function PlayList() {
  const { type, id } = useParams();
  const { youtubePlaylist } = useYoutubeStore((state: any) => state);
  const { playlistId, playlistItems, setPlaylistId, setPlaylistItems } =
    usePlaylistStore((state: any) => state);
  const [playlistInfo, setPlaylistInfo] = useState<any>();
  const [items, setItems] = useState<any>();

  useEffect(() => {
    let item = youtubePlaylist.filter((val: any) => val.playlist_id === id)[0];

    setPlaylistId(id);
    setPlaylistInfo(item);
    async function getItems() {
      const result = await fetchYoutubePlaylistsItems(id);

      setItems(result);
      setPlaylistItems(result);
    }

    if (playlistId === id && playlistItems.length > 0) {
      setItems(playlistItems);
    } else {
      getItems();
    }
  }, []);

  return (
    <div className=" relative transition-all duration-1000 flex-1 flex-row h-full rounded-lg  bg-zinc-900 overflow-x-hidden  overflow-y-hidden mr-2 font-abc">
      <header
        className={`flex flex-col sticky top-0 px-6 pt-6 bg-gradient-to-t z-20  `}
      >
        <PageHeader />
      </header>

      <main id={styles.playlistContainer} className=" h-[93%]">
        <div
          className="[grid-area:aside]   flex flex-col gap-8  h-full  rounded-t-3xl "
          style={{ backgroundColor: "#5B21B6" }}
        >
          <div className="absolute w-[35%] h-[93%] bg-gradient-to-t from-zinc-900 from-[5%]"></div>

          <div className="flex flex-col gap-8 p-6 z-10 sticky">
            <picture className="flex aspect-square w-full h-52 flex-none relative group">
              <img
                src={
                  type == "youtube"
                    ? playlistInfo?.thumbnails.high
                    : playlistInfo?.images[0].url
                }
                alt={`Playlist from ${
                  type == "youtube"
                    ? playlistInfo?.creator
                    : playlistInfo?.owner.display_name
                }`}
                className=" object-none w-full h-full rounded-xl shadow-md "
              />

              <PlayButton
                id={id ? id?.toString() : ""}
                type={type ? type : "youtube"}
                text="Reproduce playlist"
                style="flex place-content-center gap-2 items-center absolute w-full h-52 text-white bg-zinc-900/80 opacity-0 group-hover:opacity-100 z-10 transition duration-200"
              />
            </picture>

            <div className="flex flex-col justify-between gap-3 ">
              <div>
                <h1 className=" text-3xl font-bold block text-white ">
                  {type == "youtube" ? playlistInfo?.title : playlistInfo?.name}
                </h1>
              </div>

              <h2 className="flex flex-1 items-end text-sm font-light ">
                <span className=" font-bold text-white text-md">
                  {type == "youtube"
                    ? playlistInfo?.creator
                    : playlistInfo?.owner.display_name}
                </span>
              </h2>

              <div className="flex-1 flex pt-2 items-end">
                <div className="text-sm text-gray-300 font-normal flex flex-row">
                  <span className=" ml-1 text-xs">
                    {items?.length} songs, from
                    <span
                      className={
                        type == "youtube" ? `text-red-500` : `text-green-500`
                      }
                    >
                      {"  "}
                      {type}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

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

      <FrameMotion />
    </div>
  );
}

export default PlayList;
