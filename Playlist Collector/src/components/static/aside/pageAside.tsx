import HomeIcon from "../../../assets/icons/home";
import SideMenuItem from "./sideMenuItem";
import SearchIcon from "../../../assets/icons/search";
import PlaylistIcon from "../../../assets/icons/playlist";
import SideMenuCard from "./sideMenuCard";

import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../global/fireBase";
import { useYoutubeStore } from "../../../global/youtube.store";
import { fetchYoutubePlaylistId } from "../../../services/Youtube/Youtube.service";
import { usePlayerStore } from "../../../global/music.store";

function PageAside() {
  const { currentMusic } = usePlayerStore((state: any) => state);
  const { youtubeId } = useYoutubeStore((state: any) => state);
  const [history, setHistory] = useState<any>([]);

  const getHistory = async (id: any) => {
    try {
      const result = await fetchYoutubePlaylistId(id);
      setHistory(result.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (youtubeId?.id != null) {
    }
  }, [currentMusic]);

  return (
    <nav className="flex flex-col flex-1 p-2">
      <div className="flex items-center p-2 px-6 gap-2 font-abc bg-zinc-900 mb-1 rounded-lg text-xl font-semibold ">
        <picture className="h-10 w-10 flex-none ">
          <img
            src="https://avatars.githubusercontent.com/u/102503098?v=4"
            alt={`Playlist Collector`}
            className=" object-cover w-full h-full rounded-full"
          />
        </picture>
        <h1 className="text-md"> Playlist Collector </h1>
      </div>

      <div className="bg-zinc-900 rounded-t-lg p-2">
        <ul>
          <SideMenuItem href="/">
            <HomeIcon />
            Home
          </SideMenuItem>

          <SideMenuItem href="/#">
            <SearchIcon />
            Search
          </SideMenuItem>
        </ul>
      </div>
      <div className="relative flex px-4 items-center bg-zinc-900 ">
        <div className="flex-grow border-t border-zinc-400"></div>
      </div>
      <div className="bg-zinc-900 rounded-b-lg p-2 flex-1">
        <ul>
          <SideMenuItem href="/#">
            <PlaylistIcon />
            Playlists
          </SideMenuItem>

          <div className=" pt-2">
            {history &&
              history.map((playlist: any, index: number) => {
                return (
                  <SideMenuCard
                    key={index}
                    playlist={playlist}
                    type="youtube"
                  ></SideMenuCard>
                );
              })}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default PageAside;
