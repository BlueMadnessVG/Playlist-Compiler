interface PlaylistDetailsProps {
  title: string;
  creator: string;
  songs: number;
  type: string;
}

export function PlaylistDetails({
  title,
  creator,
  songs,
  type,
}: PlaylistDetailsProps) {
  return (
    <div className="flex flex-col justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold block text-white">{title}</h1>
      </div>

      <h2 className="flex flex-1 items-end text-sm font-light">
        <span className="font-bold text-white text-md">{creator}</span>
      </h2>

      <div className="flex-1 flex pt-2 items-end">
        <div className="text-sm text-gray-300 font-normal flex flex-row">
          <span className="ml-1 text-xs">
            {songs} songs, from{" "}
            <span
              className={type === "youtube" ? "text-red-500" : "text-green-500"}
            >
              {type}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
