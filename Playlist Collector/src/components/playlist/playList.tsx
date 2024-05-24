import styles from "../../App.module.css";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useYoutubeStore } from "../../global/youtubeStore";
import { fetchYoutubePlaylistsItems } from "../../services/YoutubeService";
import MusicItem from "./musicItem";
import { useSpotifyStore } from "../../global/spotifyStore";
import { fetchSpotifyPlaylistItems } from "../../services/SpotifyService";
import PageHeader from "../home/pageHeader";
import { FastAverageColor } from "fast-average-color";
import CardPlayButton from "../home/cardPlayButton";

function PlayList() {
  const { type, id } = useParams();
  const { youtubePlaylist } = useYoutubeStore((state: any) => state);
  const { spotifyPlaylist } = useSpotifyStore((state: any) => state);
  const [playlistInfo, setPlaylistInfo] = useState<any>();
  const [items, setItems] = useState<any>();

  const bgColor = useRef<any>("#fffff");

  useEffect(() => {
    let item;
    if (type == "youtube") {
      item = youtubePlaylist.filter((val: any) => val.playlist_id === id)[0];
    } else {
      item = spotifyPlaylist.filter((val: any) => val.playlist_id === id)[0];
    }

    generateColor(item);
    setPlaylistInfo(item);

    async function getItems() {
      try {
        let result;
        if (type == "youtube") result = await fetchYoutubePlaylistsItems(id);
        else result = await fetchSpotifyPlaylistItems(id);
        setItems(result);
      } catch (error) {
        console.log(error);
      }
    }

    getItems();
  }, []);

  const generateColor = async (playlistInfo: any) => {
    const fac = new FastAverageColor();
    try {
      const color = await fac.getColorAsync(
        type == "youtube"
          ? playlistInfo?.thumbnails.high
          : playlistInfo?.images[0].url
      );
      bgColor.current = await color.hex;
    } catch (error) {
      console.log(error);
      bgColor.current = "#5B21B6";
    }
  };

  return (
    <motion.div
      className=" relative transition-all duration-1000 flex-1 flex-row h-full rounded-lg  bg-zinc-900 overflow-x-hidden  overflow-y-hidden mr-2 font-abc"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <header
        className={`flex flex-col sticky top-0 px-6 pt-6 bg-gradient-to-t z-20  `}
      >
        <PageHeader />
      </header>

      <main id={styles.playlistContainer} className=" h-[93%]">
        <div
          className="[grid-area:aside]   flex flex-col gap-8  h-full  rounded-t-3xl "
          style={{ backgroundColor: bgColor.current }}
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

              <CardPlayButton
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
    </motion.div>
  );
}

export default PlayList;
