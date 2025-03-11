import { motion } from "framer-motion";
import FrameMotionUtility from "../../utils/Motion/frameMotion.utility";
import { useLoginUser } from "../../Hooks";
import { HomeHeader, HomeLoginButtons, HomePlaylists } from ".";

function Home() {
  const { data, loading } = useLoginUser();

  if (loading) {
    console.log("loading");
  }

  return (
    <motion.div
      id="playlist-container"
      className="relative transition-all duration-1000 bg-zinc-900 rounded-lg flex-1 m-2 ml-0 mt-0 overflow-y-auto"
    >
      <div className="relative z-10 px-6 pt-2">
        <HomeHeader showProfile={false} />
        <HomeLoginButtons
          youtubeToken={data?.youtubeToken}
          youtubeProfileThumb={data?.youtubeProfileThumb || ""}
        />
        <HomePlaylists playlists={data?.youtubePlaylist || []} />
      </div>
      <FrameMotionUtility />
    </motion.div>
  );
}

export default Home;
