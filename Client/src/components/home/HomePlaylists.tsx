import { Filters, PlaylistItemCard } from ".";

interface HomePlaylistsProps {
  playlists: any[];
}

export function HomePlaylists({ playlists}: HomePlaylistsProps) {
  return (
    <div className="flex flex-col gap-2 font-abc">
      <h1 className="text-xl font-bold ml-2 pt-4">Your Playlists</h1>
      <Filters />
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 2xl:grid-cols-8 mt-1 gap-2">
        {playlists.map((playlist, index) => (
          <PlaylistItemCard key={index} playlist={playlist} type="youtube" />
        ))}
      </div>
    </div>
  );
}
