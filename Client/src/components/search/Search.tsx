import { motion } from "framer-motion";
import FrameMotionUtility from "../../utils/Motion/frameMotion.utility";
import { useParams } from "react-router-dom";
import PageHeader from "../header/pageHeader";
import CarouselMotion from "../../utils/Motion/carouselMotion.utility";
import ArtistCard from "./ArtistCard";
import SearchResult from "./SearchResult";
import SongCart from "../artist/songCart";
import { MusicModel, PlaylistModel } from "../../models";
import PlaylistCart from "../artist/playlistCart";
import { useFetchSearch } from "../../Hooks";

function Search() {
  const { search_item } = useParams();
  const { data, loading } = useFetchSearch(search_item || "");

  if(loading){
    console.log(loading);
  }

  return (
    <motion.div
      id="playlist-container"
      className="relative transition-all duration-1000  bg-zinc-900 rounded-lg flex-1 m-2 ml-0 mt-0 overflow-y-auto font-abc"
    >
      <div className="z-10 px-6 pt-2">
        <PageHeader showProfile={true} />
      </div>

      <SearchResult title="Songs">
        {data.musicSearch && data.musicSearch?.length > 0 && (
          <div className="px-2">
            <CarouselMotion items_length={data.musicSearch.length}>
              {data.musicSearch.map((song: MusicModel, index: number) => {
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
        {data.artistsSearch && data.artistsSearch?.length > 0 && (
          <div className="px-2">
            <CarouselMotion items_length={data.artistsSearch.length}>
              {data.artistsSearch.map((item: any, index: number) => {
                return <ArtistCard key={index} artist={item} />;
              })}
            </CarouselMotion>
          </div>
        )}
      </SearchResult>

      <SearchResult title="Playlists">
        {data.playlistSearch && data.playlistSearch?.length > 0 && (
          <div className="px-2">
            <CarouselMotion items_length={data.playlistSearch.length}>
              {data.playlistSearch.map((playlist: PlaylistModel, index: number) => {
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
