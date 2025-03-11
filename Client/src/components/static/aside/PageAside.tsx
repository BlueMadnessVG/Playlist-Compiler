import SideMenuItem from "./sideMenuItem";
import SideMenuCard from "./sideMenuCard";

import { useEffect, useState } from "react";
import {
  fetchYoutubeChanel,
  fetchYoutubePlaylistId,
} from "../../../services/Youtube/Youtube.service";
import { usePlayerStore } from "../../../global/music.store";
import { obtainLocalStorage } from "../../../utils/localstorage/localStorage.utility";
import { motion } from "framer-motion";
import CloseAside from "./CloseAside";
import { useArtistStore } from "../../../global";
import { HomeIcon, ArrowLeftIcon } from "../../../assets/icons";

function PageAside() {
  const [open, setOpen] = useState(true);

  const { currentMusic } = usePlayerStore((state: any) => state);
  const { artistInfo } = useArtistStore((state: any) => state);
  const [history, setHistory] = useState<any>([]);
  const [artistHistory, setArtistHistory] = useState<any>([]);

  const getHistory = async (id: any) => {
    const result = await fetchYoutubePlaylistId(id);
    setHistory(result.items);
  };

  const getArtistHistory = async (id: any) => {
    const result = await fetchYoutubeChanel(id);
    setArtistHistory(result.items);
  };

  useEffect(() => {
    if (history.length !== obtainLocalStorage("playlist").length) {
      const playlistHistory = obtainLocalStorage("playlist")
        .map((item) => item.id)
        .join(",");

      if (playlistHistory) getHistory(playlistHistory);
      console.log(currentMusic);
    }
  }, [currentMusic?.playlist?.id]);

  useEffect(() => {
    if (artistHistory.length !== obtainLocalStorage("artist").length) {
      const artistSearchHistory = obtainLocalStorage("artist")
        .map((item) => item.id)
        .join(",");
      if (artistSearchHistory) getArtistHistory(artistSearchHistory);
      console.log(artistSearchHistory);
    }
    console.log(artistHistory);
  }, [artistInfo]);

  return (
    <motion.nav
      style={{ width: open ? "100%" : "fit-content" }}
      className="sticky top-0 h-screen grid grid-cols-1 grid-rows-[4rem_1fr_4rem] p-2"
    >
      <motion.div className="flex items-center justify-center p-2 gap-2 font-abc bg-zinc-900 mb-1 rounded-lg text-xl font-semibold ">
        <picture className="h-full w-10 flex-none ">
          <img
            src="https://avatars.githubusercontent.com/u/102503098?v=4"
            alt={`Playlist Collector`}
            className=" object-cover w-full h-full rounded-full"
          />
        </picture>
        {open && (
          <motion.h1
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-md"
          >
            Playlist Collector
          </motion.h1>
        )}
      </motion.div>

      <div className=" overflow-y-auto bg-zinc-900 rounded-t-lg">
        <div className="flex flex-col   p-2 ">
          <ul>
            <SideMenuItem
              href="/"
              open={open}
              Icon={HomeIcon}
              title="Home"
            ></SideMenuItem>
          </ul>
        </div>
        <div className="relative flex px-4 items-center bg-zinc-900 ">
          <div className="flex-grow border-t border-zinc-400"></div>
        </div>
        <div className="bg-zinc-900 rounded-b-lg p-2 flex-1">
          <ul>
            {/*           <SideMenuItem href="/#" open={open}>
            <PlaylistIcon />
            <span>Playlists</span>
          </SideMenuItem> */}

            <div className="flex flex-col pt-2 gap-2">
              {history &&
                history.map((item: any, index: number) => {
                  return (
                    <SideMenuCard
                      key={index}
                      item={item}
                      type="playlist"
                      open={open}
                    ></SideMenuCard>
                  );
                })}

              {artistHistory &&
                artistHistory.map((item: any, index: number) => {
                  return (
                    <SideMenuCard
                      key={index}
                      item={item}
                      type="artist"
                      open={open}
                    ></SideMenuCard>
                  );
                })}
            </div>
          </ul>
        </div>
      </div>

      <CloseAside open={open} setOpen={setOpen} Icon={ArrowLeftIcon} />
    </motion.nav>
  );
}

export default PageAside;
