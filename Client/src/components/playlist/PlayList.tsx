import styles from "../../App.module.css";

import { useParams } from "react-router-dom";
import MusicItem from "./MusicItem";
import PageHeader from "../header/pageHeader";
import PlaylistInfo from "./PlaylistInfo";
import FrameMotionUtility from "../../utils/Motion/frameMotion.utility";
import { useFetchPlaylist } from "../../Hooks";

function PlayList() {
  const { type, from, id } = useParams();
  const { data, playlistInfo, loading } = useFetchPlaylist(from || "user", id || "");

  return (
    <div className=" relative transition-all duration-1000 flex-1 flex-row h-full rounded-lg  bg-zinc-900 overflow-x-hidden  overflow-y-hidden mr-2 font-abc">
      <header
        className={`flex flex-col sticky top-0 px-6 pt-6 bg-gradient-to-t z-20  `}
      >
        <PageHeader showProfile={true} />
      </header>

      <main id={styles.playlistContainer} className="h-[93%]">
        {!loading ? (
          <PlaylistInfo
            songs={data ? data.length : 0}
            playlistInfo={playlistInfo}
          />
        ) : (
          <div> loading... </div>
        )}

        <section className="[grid-area:main]  p-4 mb-8 w- h-full overflow-x-hidden">
          <div className="flex flex-col text-left divide-gray-500/50">
            {data?.map((music: any, index: number) => {
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
