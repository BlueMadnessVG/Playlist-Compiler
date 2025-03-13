import CarouselMotion from "../../utils/Motion/carouselMotion.utility";
import PlaylistCart from "../artist/playlistCart";
import SongCart from "../artist/songCart";
import { ArtistCard } from "./ArtistCard";

interface SearchResultProps {
  title: string;
  items: any[];
  type: "song" | "artist" | "playlist";
}

export function SearchResult({ title, items, type }: SearchResultProps) {
  return (
    <div className="mt-4 bg-zinc-950/40 drop-shadow-xl shadow-inner shadow-zinc-900/90 pb-2">
      <div className="pt-4 pl-4">
        <h2 className="text-xl font-semibold px-6 py-4">{title}</h2>
        {items.length > 0 && (
          <div className="px-2">
            <CarouselMotion items_length={items.length}>
              {items.map((item, index) => {
                switch (type) {
                  case "song":
                    return <SongCart key={index} song={item} type="search" index={index} />;
                  case "artist":
                    return <ArtistCard key={index} artist={item} />;
                  case "playlist":
                    return <PlaylistCart key={index} playlist={item} />;
                  default:
                    return null;
                }
              })}
            </CarouselMotion>
          </div>
        )}
      </div>
    </div>
  );
}
