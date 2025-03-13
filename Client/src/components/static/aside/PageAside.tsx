import { useEffect, useState } from "react";
import {
  fetchYoutubeChanel,
  fetchYoutubePlaylistId,
} from "../../../services/Youtube/Youtube.service";
import { usePlayerStore } from "../../../global/music.store";
import { obtainLocalStorage } from "../../../utils/localstorage/localStorage.utility";
import { motion } from "framer-motion";
import { useArtistStore } from "../../../global";
import { PageFooter } from "./PageFooter";
import { PageHeader } from "./PageHeader";
import { PageMenu } from "./PageMenu";

function PageAside() {
  const [open, setOpen] = useState(true);

  const { currentMusic } = usePlayerStore((state: any) => state);
  const { artistInfo } = useArtistStore((state: any) => state);
  const [history, setHistory] = useState<any>([]);
  const [artistHistory, setArtistHistory] = useState<any>([]);

  const getHistory = async (id: any) => {
    const result = await fetchYoutubePlaylistId(id);
    setHistory(result);
  };

  const getArtistHistory = async (id: any) => {
    const result = await fetchYoutubeChanel(id);
    setArtistHistory(result);
  };

  useEffect(() => {
    if (history.length !== obtainLocalStorage("playlist").length) {
      const playlistHistory = obtainLocalStorage("playlist")
        .map((item) => item.id)
        .join(",");

      if (playlistHistory) getHistory(playlistHistory);
    }
  }, [currentMusic?.playlist?.id]);

  useEffect(() => {
    if (artistHistory.length !== obtainLocalStorage("artist").length) {
      const artistSearchHistory = obtainLocalStorage("artist")
        .map((item) => item.id)
        .join(",");
      if (artistSearchHistory) getArtistHistory(artistSearchHistory);
    }
  }, [artistInfo]);

  return (
    <motion.nav
      style={{ width: open ? "100%" : "fit-content" }}
      className="sticky top-0 h-screen grid grid-cols-1 grid-rows-[4rem_1fr_4rem] p-2"
    >
      <PageHeader open={open} />
      <PageMenu open={open} history={history} artistHistory={artistHistory} />
      <PageFooter open={open} setOpen={setOpen} />
    </motion.nav>
  );
}

export default PageAside;
