import FrameMotion from "../../utils/Motion/frameMotion.utility";
import { useFetchArtist } from "../../Hooks/useFetchArtist";
import { PopularSongsTable } from "./PopularSongsTabel";
import { PlaylistSection } from "./PlaylistSection";
import { PublicationsSections } from "./PublicationsSection";
import { ArtistInfoLayout } from "./ArtistInfoLayout";
import { ArtistHeader } from "./ArtistHeader";

function ArtistSearch() {
  const { data, loadMoreVideos, loading } = useFetchArtist();

  const handleOnScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      loadMoreVideos();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    data.artistInfo != undefined && (
      <div className="relative w-full rounded-lg overflow-y-hidden">
        <div
          id="playlist-container"
          className=" relative transition-all duration-1000 flex-1 flex-col h-full rounded-lg  bg-zinc-900 overflow-x-hidden mr-2 font-abc"
          onScroll={handleOnScroll}
        >
          <ArtistInfoLayout artistInfo={data.artistInfo}>
            <ArtistHeader artistInfo={data.artistInfo} />
          </ArtistInfoLayout>

          <main className="pt-2">
            {data.artistSongs && <PopularSongsTable songs={data.artistSongs} />}
            {data.artistPlaylist && data.artistPlaylist.length > 0 && (
              <PlaylistSection playlists={data.artistPlaylist} />
            )}
            {data.artistSongs && (
              <PublicationsSections
                songs={data.artistSongs}
                hasMore={!!data.songsPager?.nextPageToken}
              />
            )}
          </main>
        </div>
        <FrameMotion />
      </div>
    )
  );
}

export default ArtistSearch;
