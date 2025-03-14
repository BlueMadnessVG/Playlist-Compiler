
import { motion } from "framer-motion";

import { PlayerContent } from "./PlayerContent";
import { PlayerFooter } from "./PlayerFooter";
import { PlayerHeader } from "./PlayerHeader";
import { PlayerQueue } from "./PlayerQueue";
import { PlayerControls } from "./PlayerControls";
import { formatTime } from "../../../utils/controllers";
import { usePlayer } from "../../../Hooks/usePlayer";

function Player() {
  const {
    data,
    functions,
    loading
  } = usePlayer();

  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      exit={{ y: data.open ? 500 : 5000 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      style={{ height: data.open ? "100%" : "fit-content" }}
      className="absolute bottom-0 right-2 overflow-hidden z-50 cursor-pointer bg-zinc-800 shadow-md shadow-zinc-950 w-[28vw]"
    >
      <PlayerHeader
        onClose={functions.handleCloseClick}
        onToggleOpen={() => functions.setOpen(!data.open)}
        open={data.open}
        playedTime={formatTime(data.time.played)}
        maxTime={formatTime(data.time.MaxTime)}
      >
        <PlayerControls
          onPlay={functions.handlePlay}
          onNext={functions.handleNext}
          onPrev={functions.handlePre}
          isPlaying={data.isPlaying}
        />
      </PlayerHeader>

      <PlayerContent
      playerRef={data.playerRef}
        audioRef={data.audioRef.current}
        isPlaying={data.isPlaying}
        volume={data.volume}
        onProgress={functions.handleOnProgress}
        onDuration={functions.handleOnDuration}
        onEnded={functions.handleMusicEnded}
        playedTime={data.time.played}
        maxTime={data.time.MaxTime}
        onSeek={functions.handleSeek}
      />

      {data.currentMusic.songs[data.currentMusic.song] && (
        <PlayerFooter
          songTitle={data.currentMusic.songs[data.currentMusic.song]?.title}
          artistName={
            data.currentMusic.songs[data.currentMusic.song]?.artist.title.split("-")[0]
          }
          artistId={data.currentMusic.songs[data.currentMusic.song]?.artist.id}
          playlistType={data.playlistType}
        />
      )}

      {data.open && data.currentMusic?.songs.length > 0 && (
        <PlayerQueue
          songs={data.currentMusic.songs}
          onReorder={functions.updateCurrentMusicSongs}
        />
      )}
    </motion.div>
  );
}

export default Player;
