import { useEffect, useState } from "react";
import PageHeader from "../home/pageHeader";
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
import ArrowLeftIcon from "../../assets/icons/arrowLeft";
import ArrowRightIcon from "../../assets/icons/arrowRight";
import FrameMotion from "../../utils/Page utils/frameMotion.utility";
import { MusicModel } from "../../models";

function ArtistSearch() {
  const { id } = useParams();

  const {
    artistInfo,
    artistSongs,
    artistPlaylist,
    setArtistInfo,
    setArtistSongs,
    setArtistPlaylist,
  } = useArtistStore((state: any) => state);

  const [curr, setCurr] = useState<number>(0);

  const [verifier, setVerifier] = useState<boolean>(true);
  const [showPublication, setShowPublication] = useState<boolean>(false);

  const handleClick = () => {
    setShowPublication(!showPublication);
  };

  const handlePlaylistPrev = () => {
    if (curr <= 0) return;
    setCurr(curr - 1);
  };

  const handlePlaylistNext = () => {
    if (curr + 5 >= artistPlaylist.length) return;
    setCurr(curr + 1);
  };

  const fetchVideos = async () => {
    try {
      if (verifier || !artistSongs) {
        const response = await fetchYoutubeChannelVideos(id);
        setArtistSongs(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      if (verifier || !artistPlaylist) {
        const response = await fetchYoutubeChanelPlaylists(id);
        setArtistPlaylist(response);
      } else {
        console.log(artistPlaylist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

  return (
    artistInfo != undefined && (
      <div
        id="playlist-container"
        className=" relative transition-all duration-1000 flex-1 flex-col h-full rounded-lg  bg-zinc-900 overflow-x-hidden mr-2 font-abc"
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
          className="flex flex-col top-0 px-6 pt-6 pb-6 justify-between h-96"
          style={{
            backgroundImage: `${artistInfo?.snippet.thumbnails.high.url}`,
          }}
        >
          <PageHeader />

          <h1 className="z-10 text-4xl">
            {artistInfo?.snippet.title.split("-")[0]}
          </h1>
        </header>

        <main className="px-6">
          <h2> Popular Songs </h2>
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
            <div className="pt-10">
              <div className="flex justify-between">
                <h2> Playlists </h2>

                <div className="flex gap-2">
                  <button
                    className=" border border-zinc-600 rounded-full p-2 hover:bg-zinc-600 transition-all duration-200"
                    onClick={handlePlaylistPrev}
                  >
                    <ArrowLeftIcon />
                  </button>
                  <button
                    className="text-xs border border-zinc-600 rounded-full p-2 hover:bg-zinc-600 transition-all duration-200"
                    onClick={handlePlaylistNext}
                  >
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>

              <div
                className="flex flex-shrink-0 gap-1 py-2 transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${0.19 * curr * 100}%)` }}
              >
                {artistPlaylist?.map((playlist: any, index: number) => {
                  return <PlaylistCart key={index} playlist={playlist} />;
                })}
              </div>
            </div>
          )}

          <div className="pt-10">
            <div className="flex justify-between">
              <h2>Publications</h2>
              <button
                className=" text-xs border border-zinc-600 rounded-xl p-2 hover:bg-zinc-600 transition-all duration-200"
                onClick={handleClick}
              >
                {!showPublication ? "Show All" : "Hide"}
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4 py-2">
              {artistSongs
                ?.map((song: MusicModel, index: number) => ({ song, index }))
                .slice(-5)
                .map(({ song, index }: { song: MusicModel; index: number }) => {
                  return <SongCart key={index} song={song} index={index} />;
                })}
            </div>
            <div
              className={
                showPublication ? "grid grid-cols-5 gap-4 py-2" : "hidden"
              }
            >
              {artistSongs
                ?.map((song: MusicModel, index: number) => ({ song, index })) // Create an array of objects with song and its index
                .slice(0, -5) // Get the last 5 items
                .reverse() // Reverse to get them in the desired order
                .map(
                  (
                    { song, index }: { song: MusicModel; index: number } // Destructure the object to get song and index
                  ) => (
                    <SongCart key={index} song={song} index={index} />
                  )
                )}
            </div>
          </div>
        </main>

        <FrameMotion />
      </div>
    )
  );
}

export default ArtistSearch;
