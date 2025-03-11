import { PlayButton } from "../../utils/Page utils";

interface PlaylistImageProps {
  imageUrl: string;
  altText: string;
  id: string;
  type: string;
}

export function PlaylistImage({
  imageUrl,
  altText,
  id,
  type,
}: PlaylistImageProps) {
  return (
    <div className="flex aspect-square w-full h-52 flex-none relative group">
      <img
        src={imageUrl}
        alt={altText}
        className="object-none w-full h-full rounded-xl shadow-md"
      />
      <PlayButton
        id={id}
        type={type}
        text="Reproduce playlist"
        style="flex place-content-center gap-2 items-center absolute w-full h-52 text-white bg-zinc-900/80 opacity-0 group-hover:opacity-100 z-10 transition duration-200 rounded-lg"
      />
    </div>
  );
}
