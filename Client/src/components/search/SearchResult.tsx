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
    <div>
      <h2 className="text-xl font-semibold px-6 py-4">{title}</h2>
      {items.length > 0 && (
        <div className="px-2">
          <CarouselMotion items_length={items.length}>
            {items.map((item, index) => {
              switch (type) {
                case "song":
                  return <SongCart song={item} type="search" index={index} />;
                case "artist":
                  return <ArtistCard artist={item} />;
                case "playlist":
                  return <PlaylistCart playlist={item} />;
                default:
                  return null;
              }
            })}
          </CarouselMotion>
        </div>
      )}
    </div>
  );
}
