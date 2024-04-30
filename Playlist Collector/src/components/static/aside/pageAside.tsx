import React from "react";
import HomeIcon from "../../../assets/icons/home";
import SideMenuItem from "./sideMenuItem";
import SearchIcon from "../../../assets/icons/search";
import PlaylistIcon from "../../../assets/icons/playlist";
import SideMenuCard from "./sideMenuCard";
import { useNavigate } from "react-router-dom";

const playlist: any[] = [
  {
    id: 1,
    title: "Ado god",
    imageURL:
      "https://a.storyblok.com/f/178900/960x540/b13931671a/ado.jpg/m/filters:quality(95)format(webp)",
    total: 6,
    from: "Spotify",
  },
  {
    id: 2,
    title: "Try hard",
    imageURL:
      "https://www.callofduty.com/content/dam/atvi/callofduty/blog/archives/feature/featured-Image10737600.jpg",
    total: 6,
    from: "YouTube",
  },
];

function PageAside() {
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
        Machapa
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
            {playlist.map((playlist: any, index) => {
              return (
                <SideMenuCard key={index} playlist={playlist}></SideMenuCard>
              );
            })}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default PageAside;
