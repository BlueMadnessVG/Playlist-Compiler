import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useYoutubeStore } from "../../global/youtubeStore";
import { fetchYoutubePlaylistsItems } from "../../services/YoutubeService";
import MusicItem from "./musicItem";
import PlayIcon from "../../assets/icons/play";
import { useSpotifyStore } from "../../global/spotifyStore";
import { fetchSpotifyPlaylistItems } from "../../services/SpotifyService";

const Playlist: any[] = [
  {
    id: 1,
    title: "Ado god",
    imageURL:
      "https://a.storyblok.com/f/178900/960x540/b13931671a/ado.jpg/m/filters:quality(95)format(webp)",
    total: 6,
    from: "Spotify",
  },
  {
    id: 2,
    title: "Try hard",
    imageURL:
      "https://www.callofduty.com/content/dam/atvi/callofduty/blog/archives/feature/featured-Image10737600.jpg",
    total: 6,
    from: "YouTube",
  },
];

function PlayList() {
  const { type, id } = useParams();
  const { youtubePlaylist } = useYoutubeStore((state: any) => state);
  const { spotifyPlaylist } = useSpotifyStore((state: any) => state);
  const [playlistInfo, setPlaylistInfo] = useState<any>();
  const [items, setItems] = useState<any>();
  const bgColor = useRef("#fffff");

  useEffect(() => {
    let item;
    if (type == "youtube") {
      item = youtubePlaylist.filter((val: any) => val.id === id)[0];
    } else {
      item = spotifyPlaylist.filter((val: any) => val.id === id)[0];
    }
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

    generateColor();
    getItems();
  }, []);

  const generateColor = () => {
    let randomColorString = "#";
    const arrayOfColorFunctions = "0123456789abcdef";
    for (let x = 0; x < 6; x++) {
      let index = Math.floor(Math.random() * 16);
      let value = arrayOfColorFunctions[index];

      randomColorString += value;
    }
    bgColor.current = randomColorString;
  };

  return (
    <motion.div
      id="playlist-container"
      className=" relative transition-all duration-1000 flex-1 flex-col h-full rounded-lg  bg-zinc-900 overflow-x-hidden mr-2 font-abc"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <header
        className={`flex flex-row sticky top-0 gap-8 px-6 pt-10 pb-6 bg-gradient-to-t z-20 from-zinc-900/80 from-5% via-zinc-900/60 via-50% `}
        style={{ backgroundColor: bgColor.current }}
      >
        <picture className=" aspect-square w-52 h-52 flex-none">
          <img
            src={
              type == "youtube"
                ? playlistInfo?.snippet.thumbnails.high.url
                : playlistInfo?.images[0].url
            }
            alt={`Playlist from ${
              type == "youtube"
                ? playlistInfo?.snippet.channelTitle
                : playlistInfo?.owner.display_name
            }`}
            className=" object-cover w-full h-full rounded-md shadow-lg"
          />
        </picture>

        <div className="flex flex-col justify-between">
          <h2 className="flex flex-1 items-end text-sm font-light">Playlist</h2>
          <div>
            <h1 className=" text-7xl font-bold block text-white mt-5">
              {type == "youtube"
                ? playlistInfo?.snippet.title
                : playlistInfo?.name}
            </h1>
          </div>

          <div className="flex-1 flex pt-2 items-end">
            <div className="text-sm text-gray-300 font-normal flex flex-row">
              <span className=" font-bold text-white text-xs">
                {type == "youtube"
                  ? playlistInfo?.snippet.channelTitle
                  : playlistInfo?.owner.display_name}
              </span>
              <span className=" ml-1 text-xs">
                &bull; {items?.items.length} songs, from
                <span
                  className={
                    type == "youtube" ? `text-red-500` : `text-green-500`
                  }
                >
                  {" "}
                  {type}
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="p-4 mb-8">
        <table className="table-auto text-left min-w-full divide-y-2 divide-gray-500/50">
          <thead className="">
            <tr className="text-gray-300 text-sm font-light">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Album</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {items?.items.map((music: any, index: number) => {
              return (
                <MusicItem
                  key={index}
                  music={music}
                  type={type}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
      </section>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-zinc-900 from-65% via-zinc-900/80 -z-10" />
    </motion.div>
  );
}

export default PlayList;
