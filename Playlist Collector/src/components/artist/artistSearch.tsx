import { useEffect, useState } from "react";
import PageHeader from "../header/pageHeader";
import { useParams } from "react-router-dom";
import {
  fetchYoutubeChanel,
  fetchYoutubeChanelPlaylists,
  fetchYoutubeChannelVideos,
} from "../../services/Youtube/Youtube.service";
import PopularSong from "./popularSong";
import SongCart from "./songCart";
import PlaylistCart from "./playlistCart";
import { useArtistStore } from "../../global/artist.store";
import FrameMotion from "../../utils/Motion/frameMotion.utility";
import { MusicModel } from "../../models";
import CarouselMotion from "../../utils/Motion/carouselMotion.utility";
import { saveLocalStorage } from "../../utils/localstorage/localStorage.utility";

const resultPerPage = 14;

function ArtistSearch() {
  const { id } = useParams();

  const {
    artistInfo,
    artistSongs,
    songsPager,
    artistPlaylist,
    setArtistInfo,
    setArtistSongs,
    setSongsPager,
    updateArtistSongs,
    setArtistPlaylist,
  } = useArtistStore((state: any) => state);

  const [verifier, setVerifier] = useState<boolean>(true);

  const fetchVideos = async () => {
    if (verifier || !artistSongs) {
      const response = await fetchYoutubeChannelVideos(id, resultPerPage);
      console.log(response.pageInfo);
      setSongsPager(response.pageInfo);
      setArtistSongs(response.items);
    }
  };

  const loadMoreVideos = async () => {
    if (songsPager && songsPager?.nextPageToken) {
      const response = await fetchYoutubeChannelVideos(
        id,
        resultPerPage,
        songsPager?.nextPageToken
      );

      console.log(response);
      setSongsPager(response.pageInfo);
      updateArtistSongs(response.items);
    }
  };

  const fetchPlaylists = async () => {
    if (verifier || !artistPlaylist) {
      const response = await fetchYoutubeChanelPlaylists(id);
      setArtistPlaylist(response);
    }
  };

  useEffect(() => {
    saveLocalStorage("artist", { id: id }, 5);
    const fetchChanel = async () => {
      if (!artistInfo || (artistInfo && artistInfo?.id != id)) {
        const response = await fetchYoutubeChanel(id);
        setArtistInfo(response?.items[0]);
      } else {
        setVerifier(false);
      }

      fetchVideos();
      fetchPlaylists();
    };
    if (id) fetchChanel();
  }, []);

  const handleOnScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      loadMoreVideos();
    }
  };

  return (
    artistInfo != undefined && (
      <div className="relative w-full rounded-lg overflow-y-hidden">
        <div
          id="playlist-container"
          className=" relative transition-all duration-1000 flex-1 flex-col h-full rounded-lg  bg-zinc-900 overflow-x-hidden mr-2 font-abc"
          onScroll={handleOnScroll}
        >
          <div className="flex">
            <picture className="aspect-square w-full h-96 flex-none absolute inset-0">
              <img
                src={artistInfo?.snippet.thumbnails.high.url}
                alt={`Playlist from ${artistInfo?.snippet.channelTitle}`}
                className=" object-cover w-full h-full  shadow-lg"
              />
            </picture>
            <div className="absolute w-full h-96 bg-gradient-to-t from-zinc-900 from-[5%]"></div>
          </div>

          <header
            className="flex flex-col top-0 px-4 pt-6 pb-6 justify-between h-96"
            style={{
              backgroundImage: `${artistInfo?.snippet.thumbnails.high.url}`,
            }}
          >
            <PageHeader showProfile={true} />

            <h1 className="z-10 text-7xl bg-gradient-to-r from-white from-10% via-indigo-600 via-90% to-violet-800 to-30% inline-block text-transparent bg-clip-text">
              {artistInfo?.snippet.title.split("-")[0]}
            </h1>
          </header>

          <main className="pt-2">
            <h2 className="text-xl px-4"> Popular Songs </h2>
            <table className="table-auto text-left min-w-full divide-y-2 divide-gray-500/50 ">
              <tbody>
                {artistSongs &&
                  artistSongs
                    ?.slice(0, 5)
                    .map((song: MusicModel, index: number) => {
                      return (
                        <PopularSong key={index} song={song} index={index} />
                      );
                    })}
              </tbody>
            </table>

            {artistPlaylist?.length > 0 && (
              <div className="mt-4 bg-zinc-950/40 drop-shadow-xl shadow-inner shadow-zinc-900/90">
                <div className="pt-4 pl-4">
                  <h2 className="text-xl"> Playlists </h2>
                </div>

                <div className="px-2">
                  <CarouselMotion items_length={artistPlaylist.length}>
                    {artistPlaylist?.map((playlist: any, index: number) => {
                      return <PlaylistCart key={index} playlist={playlist} />;
                    })}
                  </CarouselMotion>
                </div>
              </div>
            )}

            <div className="pt-10">
              <div className="flex justify-between pt-4 pl-4">
                <h2 className="text-xl">Publications</h2>
              </div>

              <div className="gap-[10px] p-2 flex flex-wrap">
                {artistSongs &&
                  artistSongs?.map((song: MusicModel, index: number) => {
                    return <SongCart key={index} song={song} type="artist" index={index} />;
                  })}
              </div>

              <div className="flex flex-col">
                {songsPager?.nextPageToken && <div> Load more </div>}
              </div>
            </div>
          </main>
        </div>
        <FrameMotion />
      </div>
    )
  );
}

export default ArtistSearch;
