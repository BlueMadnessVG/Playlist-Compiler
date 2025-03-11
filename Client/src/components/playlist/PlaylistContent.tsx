import styles from "../../App.module.css";
import { MusicItem, PlaylistInfo } from "./";

interface PlaylistContentProps {
  data: any[] | null;
  playlistInfo: any;
  loading: boolean;
  type?: string;
}

export function PlaylistContent({
  data,
  playlistInfo,
  loading,
  type,
}: PlaylistContentProps) {
  return (
    <main id={styles.playlistContainer} className="h-[93%]">
      {!loading ? (
        <PlaylistInfo
          songs={data ? data.length : 0}
          playlistInfo={playlistInfo}
        />
      ) : (
        <div>Loading...</div>
      )}

      <section className="[grid-area:main] p-4 mb-8 w-full h-full overflow-x-hidden">
        <div className="flex flex-col text-left divide-gray-500/50">
          {data?.map((music, index) => (
            <MusicItem key={index} music={music} type={type} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
