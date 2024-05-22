function PopularSong({ song }: { song: any }) {
  const date = new Date(song?.snippet.publishedAt);

  const day = date.getUTCDate().toString().padStart(2);
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  return (
    <tr className="text-gray-300 text-sm font-light border-b border-gray-500/20 group cursor-default">
      <td className="px-3 py-2 flex gap-3 items-center group-hover:bg-zinc-800">
        <picture className="aspect-square w-12 h-12">
          <img
            src={song?.snippet.thumbnails.default.url}
            alt={`Playlist from ${song?.snippet.title}`}
            className=" object-none w-full h-full rounded-md "
          />
        </picture>
        <h3 className=" max-w-96 truncate">{song?.snippet.title}</h3>
      </td>
      <td className="px-3 py-1 font-thin text-gray-500 max-w-72 truncate group-hover:bg-zinc-800">
        <a className="cursor-pointer hover:text-white">
          {song?.snippet.channelTitle.split("-")[0]}
        </a>
      </td>
      <td className="px-3 py-1 font-thin text-gray-500 max-w-72 truncate group-hover:bg-zinc-800">
        <p className="">{`${day} ${month} ${year}`}</p>
      </td>
    </tr>
  );
}

export default PopularSong;
