import { motion } from "framer-motion";
import FrameMotionUtility from "../../utils/Motion/frameMotion.utility";
import { useSearchStore } from "../../global";
import { useEffect } from "react";
import { fetchSearch } from "../../services/Youtube";
import { useParams } from "react-router-dom";
import PageHeader from "../header/pageHeader";
import CarouselMotion from "../../utils/Motion/carouselMotion.utility";
import ArtistCard from "./ArtistCard";
import SearchResult from "./SearchResult";
import SongCart from "../artist/songCart";
import { MusicModel, PlaylistModel } from "../../models";
import PlaylistCart from "../artist/playlistCart";

const maxResult = 15;

function Search() {
  const { search_item } = useParams();
  const {
    search,
    artistsSearch,
    musicSearch,
    playlistSearch,
    setSearch,
    setArtistsSearch,
    setMusicSearch,
    setPlaylistSearch,
  } = useSearchStore((state: any) => state);

  const getSearch = async (type: string) => {
    const result = await fetchSearch(
      search !== search_item ? search_item : search,
      maxResult,
      type
    );
    if (type === "channel") setArtistsSearch(result.items);
    else if (type === "video") setMusicSearch(result.items);
    else if (type === "playlist") setPlaylistSearch(result.items);
  };

  useEffect(() => {
    getSearch("channel");
    getSearch("video");
    getSearch("playlist");

    return () => {
      setSearch("");
    };
  }, [setSearch]);

  return (
    <motion.div
      id="playlist-container"
      className="relative transition-all duration-1000  bg-zinc-900 rounded-lg flex-1 m-2 ml-0 mt-0 overflow-y-auto font-abc"
    >
      <div className="z-10 px-6 pt-2">
        <PageHeader showProfile={true} />
      </div>

      <SearchResult title="Songs">
        {musicSearch?.length > 0 && (
          <div className="px-2">
            <CarouselMotion items_length={musicSearch.length}>
              {musicSearch.map((song: MusicModel, index: number) => {
                return (
                  <SongCart
                    key={index}
                    song={song}
                    type="search"
                    index={index}
                  />
                );
              })}
            </CarouselMotion>
          </div>
        )}
      </SearchResult>
      <SearchResult title="Artists">
        {artistsSearch?.length > 0 && (
          <div className="px-2">
            <CarouselMotion items_length={artistsSearch.length}>
              {artistsSearch.map((item: any, index: number) => {
                return <ArtistCard key={index} artist={item} />;
              })}
            </CarouselMotion>
          </div>
        )}
      </SearchResult>

      <SearchResult title="Playlists">
        {playlistSearch?.length > 0 && (
          <div className="px-2">
            <CarouselMotion items_length={playlistSearch.length}>
              {playlistSearch.map((playlist: PlaylistModel, index: number) => {
                return <PlaylistCart key={index} playlist={playlist} />;
              })}
            </CarouselMotion>
          </div>
        )}
      </SearchResult>

      <FrameMotionUtility />
    </motion.div>
  );
}
export default Search;
