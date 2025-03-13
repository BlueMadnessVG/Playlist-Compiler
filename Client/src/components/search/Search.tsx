import { motion } from "framer-motion";
import FrameMotionUtility from "../../utils/Motion/frameMotion.utility";
import { useParams } from "react-router-dom";
import { SearchResult } from "./";
import { useFetchSearch } from "../../Hooks";
import { SearchHeader } from "./SearchHeader";

function Search() {
  const { search_item } = useParams();
  const { data, loading } = useFetchSearch(search_item || "");

  if (loading) {
    console.log(loading);
  }

  return (
    <motion.div
      id="playlist-container"
      className="relative transition-all duration-1000 bg-zinc-900 rounded-lg flex-1 m-2 ml-0 mt-0 overflow-y-hidden font-abc"
    >
      <SearchHeader showProfile={true} />

      <div className="h-full overflow-y-auto">
        <SearchResult
          title="Songs"
          items={data.musicSearch || []}
          type="song"
        />
        <SearchResult
          title="Artists"
          items={data.artistsSearch || []}
          type="artist"
        />
        <SearchResult
          title="Playlists"
          items={data.playlistSearch || []}
          type="playlist"
        />
      </div>

      <FrameMotionUtility />
    </motion.div>
  );
}
export default Search;
